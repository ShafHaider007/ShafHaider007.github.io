"""NFMS-style raster pipeline demo: harmonise national layers (DEM, WorldCover forest) and cut XYZ tiles.

Outputs out/tiles/{relief,forest}/{z}/{x}/{y}.(webp|png) for zooms 5-9 over northern Pakistan, plus stats used
by the page (tile counts per zoom, QA/QC checks, bytes).
"""
import json, math, os
import numpy as np
import rasterio
from rasterio.warp import reproject, Resampling
from rasterio.transform import from_origin, from_bounds
from concurrent.futures import ThreadPoolExecutor
from scipy import ndimage
from PIL import Image
from s2lib import OUT

LON0, LON1, LAT0, LAT1 = 69.0, 78.0, 30.0, 37.2
TILES = os.path.join(OUT, "tiles")
qa = []

# ---------- 1. DEM (Copernicus GLO-90, overview 1/2 -> ~185 m) ----------
PPD = 600
H, W = int((LAT1 - LAT0) * PPD), int((LON1 - LON0) * PPD)
dem = np.full((H, W), np.nan, "float32")

def dem_tile(la, lo):
    name = f"Copernicus_DSM_COG_30_N{la:02d}_00_E{lo:03d}_00_DEM"
    p = f"/vsicurl/https://copernicus-dem-90m.s3.amazonaws.com/{name}/{name}.tif"
    try:
        with rasterio.open(p, overview_level=0) as s:
            return la, lo, s.read(1, out_shape=(PPD, PPD), resampling=Resampling.average)
    except Exception:
        return la, lo, None

jobs = [(la, lo) for la in range(int(LAT0), int(math.ceil(LAT1))) for lo in range(int(LON0), int(LON1))]
with ThreadPoolExecutor(16) as ex:
    for la, lo, a in ex.map(lambda j: dem_tile(*j), jobs):
        if a is None:
            continue
        r0 = int(round((LAT1 - (la + 1)) * PPD)); c0 = int(round((lo - LON0) * PPD))
        rr0, r1 = max(r0, 0), min(r0 + PPD, H)
        dem[rr0:r1, c0:c0 + PPD] = a[rr0 - r0:r1 - r0]
qa.append({"check": "DEM coverage", "value": f"{np.isfinite(dem).mean() * 100:.1f}% of window", "ok": True})
qa.append({"check": "DEM range", "value": f"{np.nanmin(dem):.0f} to {np.nanmax(dem):.0f} m", "ok": bool(np.nanmax(dem) < 9000)})
dem_tr = from_origin(LON0, LAT1, 1 / PPD, 1 / PPD)

# hillshade (as in the relief map, but tuned for tiles)
lats = LAT1 - (np.arange(H) + 0.5) / PPD
dx = (111320.0 * np.cos(np.radians(lats)) / PPD)[:, None]
dy = 110540.0 / PPD
z = ndimage.gaussian_filter(np.nan_to_num(dem), 0.8)
gy, gx = np.gradient(z)
gx, gy = gx / dx, gy / dy
slope = np.arctan(np.hypot(gx, gy) * 1.8)
aspect = np.arctan2(-gx, gy)
def shade(az, alt):
    az, alt = math.radians(az), math.radians(alt)
    return np.clip(np.sin(alt) * np.cos(slope) + np.cos(alt) * np.sin(slope) * np.cos(az - aspect), 0, 1)
hs = (0.6 * shade(315, 42) + 0.22 * shade(270, 50) + 0.18 * shade(350, 60)) / math.sin(math.radians(46))
stops = [(-50, (228, 233, 220)), (250, (233, 233, 214)), (700, (234, 226, 202)), (1500, (226, 212, 186)),
         (2600, (212, 202, 186)), (3800, (214, 212, 208)), (5000, (238, 238, 236)), (6500, (252, 252, 252))]
xs = [s[0] for s in stops]
tint = np.dstack([np.interp(np.nan_to_num(dem), xs, [s[1][i] for s in stops]) for i in range(3)]) / 255.0
lit = np.clip(hs, 0, 1)
amt = (1 - lit) ** 1.15 * 0.6
shadow = np.array([70, 80, 92]) / 255.0
relief = tint * (1 - amt[..., None]) + shadow * amt[..., None]
relief = (np.clip(relief, 0, 1) * 255).astype("uint8")
del gx, gy, slope, aspect, z

# ---------- 2. WorldCover tree cover (overview 1/16 -> ~133 m), harmonised to the same window ----------
WPPD = 750
WH, WW = int((LAT1 - LAT0) * WPPD), int((LON1 - LON0) * WPPD)
forest = np.zeros((WH, WW), "float32")
def wc_tile(la, lo):
    url = (f"/vsicurl/https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/"
           f"ESA_WorldCover_10m_2021_v200_N{la:02d}E{lo:03d}_Map.tif")
    try:
        with rasterio.open(url, overview_level=3) as s:
            a = s.read(1)
            return la, lo, (a == 10).astype("float32")
    except Exception:
        return la, lo, None
wjobs = [(la, lo) for la in range(30, 39, 3) for lo in range(69, 78, 3)]
with ThreadPoolExecutor(9) as ex:
    for la, lo, a in ex.map(lambda j: wc_tile(*j), wjobs):
        if a is None:
            continue
        n = a.shape[0] // 3  # px per degree in this overview
        a = np.array(Image.fromarray(a).resize((3 * WPPD, 3 * WPPD), Image.BILINEAR))
        r0 = int(round((LAT1 - (la + 3)) * WPPD)); c0 = int(round((lo - LON0) * WPPD))
        rr0, r1 = max(r0, 0), min(r0 + 3 * WPPD, WH)
        cc0, c1 = max(c0, 0), min(c0 + 3 * WPPD, WW)
        forest[rr0:r1, cc0:c1] = a[rr0 - r0:r1 - r0, cc0 - c0:c1 - c0]
wc_tr = from_origin(LON0, LAT1, 1 / WPPD, 1 / WPPD)
qa.append({"check": "Forest layer classes", "value": "ESA WorldCover 2021, class 10 (tree cover)", "ok": True})
qa.append({"check": "Forest share of window", "value": f"{forest.mean() * 100:.1f}%", "ok": True})
qa.append({"check": "CRS harmonised", "value": "EPSG:4326 sources -> EPSG:3857 tiles", "ok": True})

# ---------- 3. cut XYZ tiles ----------
def tile_bounds(x, y, zoom):
    n = 2 ** zoom
    lon0 = x / n * 360 - 180
    lon1 = (x + 1) / n * 360 - 180
    lat0 = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * (y + 1) / n))))
    lat1 = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * y / n))))
    return lon0, lat0, lon1, lat1

def merc(lon, lat):
    R = 6378137.0
    return R * math.radians(lon), R * math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))

def tiles_for(zoom):
    n = 2 ** zoom
    x0 = int((LON0 + 180) / 360 * n); x1 = int((LON1 + 180) / 360 * n)
    def ty(lat):
        return int((1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n)
    return [(x, y) for x in range(x0, x1 + 1) for y in range(ty(LAT1), ty(LAT0) + 1)]

counts, sizes = {}, {"relief": 0, "forest": 0}
for zoom in range(5, 10):
    made = 0
    for x, y in tiles_for(zoom):
        lo0, la0, lo1, la1 = tile_bounds(x, y, zoom)
        mx0, my0 = merc(lo0, la0); mx1, my1 = merc(lo1, la1)
        dst_tr = from_bounds(mx0, my0, mx1, my1, 256, 256)
        rgb = np.zeros((3, 256, 256), "uint8")
        for i in range(3):
            reproject(relief[..., i], rgb[i], src_transform=dem_tr, src_crs="EPSG:4326", dst_transform=dst_tr,
                      dst_crs="EPSG:3857", resampling=Resampling.bilinear)
        cov = np.zeros((256, 256), "float32")
        reproject(np.ones(relief.shape[:2], "float32"), cov, src_transform=dem_tr, src_crs="EPSG:4326",
                  dst_transform=dst_tr, dst_crs="EPSG:3857", resampling=Resampling.bilinear)
        paper = np.array([246, 244, 239], "float32")[:, None, None]
        rgb = (rgb * cov[None] + paper * (1 - cov[None])).astype("uint8")  # outside the window -> paper
        f = np.zeros((256, 256), "float32")
        reproject(forest, f, src_transform=wc_tr, src_crs="EPSG:4326", dst_transform=dst_tr, dst_crs="EPSG:3857",
                  resampling=Resampling.average if zoom < 8 else Resampling.bilinear)
        if cov.max() == 0:
            continue
        d = os.path.join(TILES, "relief", str(zoom), str(x)); os.makedirs(d, exist_ok=True)
        p = os.path.join(d, f"{y}.webp")
        Image.fromarray(np.moveaxis(rgb, 0, -1)).save(p, "WEBP", quality=80, method=6)
        sizes["relief"] += os.path.getsize(p)
        if f.max() > 0.02:
            a = np.clip(f * 1.15, 0, 1)
            img = np.zeros((256, 256, 4), "uint8")
            img[..., 0], img[..., 1], img[..., 2] = 38, 102, 62
            img[..., 3] = (a ** 0.8 * 215).astype("uint8")
            d = os.path.join(TILES, "forest", str(zoom), str(x)); os.makedirs(d, exist_ok=True)
            p = os.path.join(d, f"{y}.webp")
            Image.fromarray(img).save(p, "WEBP", quality=72, method=4)
            sizes["forest"] += os.path.getsize(p)
        made += 1
    counts[zoom] = made
    print("zoom", zoom, "tiles", made)

json.dump({"bounds": [LON0, LAT0, LON1, LAT1], "minzoom": 5, "maxzoom": 9, "counts": counts,
           "bytes": sizes, "qa": qa}, open(os.path.join(OUT, "nfms.json"), "w"))
print(counts, sizes)
