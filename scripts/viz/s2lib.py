"""Shared helpers: read Sentinel-2 L2A (AWS sentinel-cogs) and other COGs onto a common grid."""
import json, os, re, urllib.request
from functools import lru_cache

import numpy as np
import mgrs
import rasterio
from rasterio.vrt import WarpedVRT
from rasterio.enums import Resampling
from rasterio.transform import from_origin
from pyproj import Transformer
from PIL import Image

os.environ.setdefault("CURL_CA_BUNDLE", "/root/.ccr/ca-bundle.crt")
os.environ.setdefault("GDAL_DISABLE_READDIR_ON_OPEN", "EMPTY_DIR")
os.environ.setdefault("GDAL_HTTP_MULTIRANGE", "YES")
os.environ.setdefault("GDAL_HTTP_MERGE_CONSECUTIVE_RANGES", "YES")
os.environ.setdefault("VSI_CACHE", "TRUE")
os.environ.setdefault("GDAL_CACHEMAX", "512")

BUCKET = "https://sentinel-cogs.s3.us-west-2.amazonaws.com"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)


def get(url, timeout=90):
    with urllib.request.urlopen(url, timeout=timeout) as r:
        return r.read()


class Grid:
    """A north-up grid in a UTM CRS, defined from a lon/lat centre and size in km."""

    def __init__(self, lon, lat, w_km, h_km, res=10.0, epsg=None):
        zone = int((lon + 180) // 6) + 1
        self.epsg = epsg or (32600 + zone if lat >= 0 else 32700 + zone)
        self.crs = f"EPSG:{self.epsg}"
        tf = Transformer.from_crs("EPSG:4326", self.crs, always_xy=True)
        cx, cy = tf.transform(lon, lat)
        self.res = res
        self.W = int(round(w_km * 1000 / res))
        self.H = int(round(h_km * 1000 / res))
        self.x0 = cx - self.W * res / 2
        self.y0 = cy + self.H * res / 2
        self.transform = from_origin(self.x0, self.y0, res, res)
        inv = Transformer.from_crs(self.crs, "EPSG:4326", always_xy=True)
        xs = [self.x0, self.x0 + self.W * res]
        ys = [self.y0 - self.H * res, self.y0]
        lons, lats = zip(*[inv.transform(x, y) for x in xs for y in ys])
        self.bounds_ll = (min(lons), min(lats), max(lons), max(lats))
        self.lon, self.lat = lon, lat

    def scaled(self, factor):
        g = object.__new__(Grid)
        g.__dict__.update(self.__dict__)
        g.res = self.res * factor
        g.W = int(round(self.W / factor))
        g.H = int(round(self.H / factor))
        g.transform = from_origin(self.x0, self.y0, g.res, g.res)
        return g

    def to_pixel(self, lon, lat):
        tf = Transformer.from_crs("EPSG:4326", self.crs, always_xy=True)
        x, y = tf.transform(lon, lat)
        return (x - self.x0) / self.res, (self.y0 - y) / self.res

    def pixel_to_lonlat(self, col, row):
        inv = Transformer.from_crs(self.crs, "EPSG:4326", always_xy=True)
        return inv.transform(self.x0 + col * self.res, self.y0 - row * self.res)

    def meta(self):
        return {"epsg": self.epsg, "res": self.res, "width": self.W, "height": self.H,
                "bounds": [round(v, 5) for v in self.bounds_ll], "x0": self.x0, "y0": self.y0}


def read_url(url, grid, resampling=Resampling.bilinear, band=1, dtype="float32", nodata=None):
    path = url if url.startswith("/vsi") else f"/vsicurl/{url}"
    with rasterio.open(path) as src:
        kw = dict(crs=grid.crs, transform=grid.transform, width=grid.W, height=grid.H, resampling=resampling)
        if nodata is not None:
            kw["src_nodata"] = nodata
            kw["nodata"] = nodata
        with WarpedVRT(src, **kw) as vrt:
            return vrt.read(band).astype(dtype)


# ---------------- Sentinel-2 ----------------

def tile_for(lon, lat):
    return mgrs.MGRS().toMGRS(lat, lon, MGRSPrecision=0)


def list_scenes(tile, year, month):
    zone, band, sq = tile[:2].lstrip("0"), tile[2], tile[3:5]
    prefix = f"sentinel-s2-l2a-cogs/{zone}/{band}/{sq}/{year}/{int(month)}/"
    xml = get(f"{BUCKET}/?list-type=2&prefix={prefix}&delimiter=/").decode()
    return re.findall(r"<Prefix>(sentinel-s2-l2a-cogs/[^<]+_L2A/)</Prefix>", xml)


@lru_cache(maxsize=4096)
def scene_item(prefix):
    sid = prefix.rstrip("/").split("/")[-1]
    try:
        return json.loads(get(f"{BUCKET}/{prefix}{sid}.json"))
    except Exception:
        return None


def scene_info(prefix):
    it = scene_item(prefix)
    if not it:
        return None
    p = it["properties"]
    baseline = p.get("s2:processing_baseline", "00.00")
    return {
        "prefix": prefix,
        "id": prefix.rstrip("/").split("/")[-1],
        "datetime": p.get("datetime"),
        "cloud": p.get("eo:cloud_cover", 100),
        "nodata": p.get("s2:nodata_pixel_percentage", 0),
        # Processing baseline 04.00 (Jan 2022) added a +1000 DN offset to L2A reflectance.
        "offset": 1000 if baseline >= "04.00" else 0,
    }


def find_scenes(tile, months, max_cloud=30, max_nodata=5):
    out = []
    for ym in months:
        y, m = ym.split("-")
        for p in list_scenes(tile, y, m):
            info = scene_info(p)
            if info and info["cloud"] <= max_cloud and info["nodata"] <= max_nodata:
                out.append(info)
    return sorted(out, key=lambda s: s["datetime"])


_offsets = {}


def detect_offset(info, grid):
    """Some archive scenes keep the +1000 DN offset, others were harmonised upstream even though the
    STAC metadata still advertises it. Decide from the data: dark targets in B02 sit near 100-500 DN
    without the offset and above ~1000 with it."""
    if info["id"] in _offsets:
        return _offsets[info["id"]]
    if info["offset"] == 0:
        _offsets[info["id"]] = 0
        return 0
    dn = read_url(f"{BUCKET}/{info['prefix']}B02.tif", grid.scaled(max(1, grid.W // 300)))
    dn = dn[dn > 0]
    off = 1000 if dn.size and np.percentile(dn, 0.5) > 900 else 0
    _offsets[info["id"]] = off
    return off


def read_s2(info, bands, grid, resampling=Resampling.bilinear):
    """Return dict band -> surface reflectance (0..1) on grid."""
    off = detect_offset(info, grid)
    out = {}
    for b in bands:
        dn = read_url(f"{BUCKET}/{info['prefix']}{b}.tif", grid, resampling=resampling)
        valid = dn > 0
        refl = (dn - off) / 10000.0
        refl[~valid] = np.nan
        out[b] = refl
    return out


def read_scl(info, grid):
    return read_url(f"{BUCKET}/{info['prefix']}SCL.tif", grid, resampling=Resampling.nearest, dtype="uint8")


def clear_mask(scl):
    # 4 vegetation, 5 bare, 6 water, 7 unclassified, 11 snow (kept), drop 0,1,2,3,8,9,10
    return np.isin(scl, [4, 5, 6, 7, 11])


# ---------------- rendering ----------------

def tone(refl, gain=2.6, gamma=1 / 2.0, knee=0.82):
    """Natural-colour tone curve with soft highlight roll-off."""
    v = np.clip(np.nan_to_num(refl) * gain, 0, None)
    v = np.where(v < knee, v, knee + (1 - knee) * (1 - np.exp(-(v - knee) / (1 - knee))))
    return np.clip(v, 0, 1) ** gamma


def saturate(rgb, s=1.12):
    grey = rgb.mean(axis=2, keepdims=True)
    return np.clip(grey + (rgb - grey) * s, 0, 1)


def true_colour(b, gain=2.6, gamma=1 / 2.0, sat=1.12):
    rgb = np.dstack([tone(b["B04"], gain, gamma), tone(b["B03"], gain, gamma), tone(b["B02"], gain, gamma)])
    return saturate(rgb, sat)


def to_img(rgb01):
    return Image.fromarray((np.clip(rgb01, 0, 1) * 255).round().astype("uint8"))


def ramp(values, stops):
    """stops: list of (value, (r,g,b)) -> uint8 rgb image."""
    v = np.nan_to_num(values, nan=stops[0][0])
    xs = [s[0] for s in stops]
    out = np.dstack([np.interp(v, xs, [s[1][i] for s in stops]) for i in range(3)])
    return out.astype("uint8")


def palette_img(classes, palette, nodata_rgb=(246, 244, 239)):
    """classes: int array; palette: dict class -> (r,g,b)."""
    out = np.zeros(classes.shape + (3,), dtype="uint8")
    out[:] = nodata_rgb
    for k, c in palette.items():
        out[classes == k] = c
    return out


def save(img, name, quality=84, max_side=None, fmt=None):
    if isinstance(img, np.ndarray):
        img = Image.fromarray(img)
    if max_side and max(img.size) > max_side:
        img = img.copy()
        img.thumbnail((max_side, max_side), Image.LANCZOS)
    path = os.path.join(OUT, name)
    ext = (fmt or name.rsplit(".", 1)[-1]).lower()
    if ext == "webp":
        img.save(path, "WEBP", quality=quality, method=6)
    elif ext in ("jpg", "jpeg"):
        img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    else:
        img.save(path, optimize=True)
    return path


def dump(obj, name):
    with open(os.path.join(OUT, name), "w") as f:
        json.dump(obj, f, separators=(",", ":"))
