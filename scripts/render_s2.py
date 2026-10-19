"""Render Sentinel-2 L2A crops from the AWS sentinel-cogs open bucket.

usage: python render.py name lon lat width_km height_km months [--ndvi] [--out-w 1800]
months: comma list like 2024-10,2024-11,2025-03
"""
import json, os, re, sys, argparse, urllib.request
import numpy as np
import mgrs
import rasterio
from rasterio.windows import from_bounds
from rasterio.warp import transform as warp_transform
from PIL import Image

os.environ.setdefault("CURL_CA_BUNDLE", "/root/.ccr/ca-bundle.crt")
os.environ.setdefault("GDAL_DISABLE_READDIR_ON_OPEN", "EMPTY_DIR")
os.environ.setdefault("GDAL_HTTP_MULTIRANGE", "YES")
os.environ.setdefault("GDAL_HTTP_MERGE_CONSECUTIVE_RANGES", "YES")

BUCKET = "https://sentinel-cogs.s3.us-west-2.amazonaws.com"
OUT = os.environ.get("OUT_DIR", "s2_out")
os.makedirs(OUT, exist_ok=True)


def get(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read()


def list_scenes(tile, month):
    zone, band, sq = tile[:2].lstrip("0"), tile[2], tile[3:5]
    y, m = month.split("-")
    prefix = f"sentinel-s2-l2a-cogs/{zone}/{band}/{sq}/{y}/{int(m)}/"
    xml = get(f"{BUCKET}/?list-type=2&prefix={prefix}&delimiter=/").decode()
    return re.findall(r"<Prefix>(sentinel-s2-l2a-cogs/[^<]+_L2A/)</Prefix>", xml)


def cloud(prefix):
    sid = prefix.rstrip("/").split("/")[-1]
    try:
        item = json.loads(get(f"{BUCKET}/{prefix}{sid}.json"))
        p = item["properties"]
        return p.get("eo:cloud_cover", 100), p.get("s2:nodata_pixel_percentage", 0), p.get("datetime")
    except Exception:
        return 100, 100, None


def read_band(prefix, band, bounds_ll, shape=None):
    url = f"/vsicurl/{BUCKET}/{prefix}{band}.tif"
    with rasterio.open(url) as ds:
        xs, ys = warp_transform("EPSG:4326", ds.crs, [bounds_ll[0], bounds_ll[2]], [bounds_ll[1], bounds_ll[3]])
        win = from_bounds(min(xs), min(ys), max(xs), max(ys), ds.transform)
        kw = {"window": win, "boundless": True, "fill_value": 0}
        if shape:
            kw["out_shape"] = shape
        return ds.read(1, **kw).astype("float32")


def stretch(a, lo, hi, gamma=1.0):
    a = np.clip((a - lo) / (hi - lo), 0, 1)
    return a ** (1 / gamma)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("name"); ap.add_argument("lon", type=float); ap.add_argument("lat", type=float)
    ap.add_argument("w", type=float); ap.add_argument("h", type=float); ap.add_argument("months")
    ap.add_argument("--ndvi", action="store_true"); ap.add_argument("--scene")
    ap.add_argument("--gamma", type=float, default=1.15); ap.add_argument("--pct", default="1,99.3")
    ap.add_argument("--max", type=int, default=2400)
    a = ap.parse_args()

    tile = mgrs.MGRS().toMGRS(a.lat, a.lon, MGRSPrecision=0)
    dlat = a.h / 2 / 111.0
    dlon = a.w / 2 / (111.0 * np.cos(np.radians(a.lat)))
    bounds = (a.lon - dlon, a.lat - dlat, a.lon + dlon, a.lat + dlat)

    if a.scene:
        best = a.scene
    else:
        cands = []
        for m in a.months.split(","):
            for p in list_scenes(tile, m):
                cc, nd, dt = cloud(p)
                cands.append((cc + nd * 3, cc, nd, dt, p))
        cands.sort()
        for c in cands[:6]:
            print(f"  {c[1]:5.1f}% cloud {c[2]:5.1f}% nodata {c[3]} {c[4]}")
        best = cands[0][4]
    print("tile", tile, "scene", best)

    r = read_band(best, "B04", bounds)
    g = read_band(best, "B03", bounds, r.shape)
    b = read_band(best, "B02", bounds, r.shape)
    rgb = np.dstack([r, g, b])
    valid = rgb.sum(2) > 0
    lo, hi = np.percentile(rgb[valid], [float(x) for x in a.pct.split(",")])
    img = (stretch(rgb, lo, hi, a.gamma) * 255).astype("uint8")
    im = Image.fromarray(img)
    if max(im.size) > a.max:
        im.thumbnail((a.max, a.max), Image.LANCZOS)
    im.save(f"{OUT}/{a.name}.jpg", quality=86, optimize=True, progressive=True)
    print("saved", a.name, im.size, "valid", valid.mean().round(3))

    if a.ndvi:
        nir = read_band(best, "B08", bounds, r.shape)
        ndvi = (nir - r) / np.maximum(nir + r, 1)
        np.save(f"{OUT}/{a.name}_ndvi.npy", ndvi)
    with open(f"{OUT}/{a.name}.meta.json", "w") as f:
        json.dump({"scene": best.rstrip('/').split('/')[-1], "bounds": bounds, "tile": tile}, f)


if __name__ == "__main__":
    main()
