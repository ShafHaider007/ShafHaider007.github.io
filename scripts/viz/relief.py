"""Light shaded-relief map of Pakistan from Copernicus GLO-90, plus rivers/lakes/boundaries as SVG paths."""
import json, math, os, urllib.request
import numpy as np
import rasterio
from concurrent.futures import ThreadPoolExecutor
from scipy import ndimage
from shapely.geometry import shape, box, mapping
from shapely.ops import unary_union
from PIL import Image
from s2lib import OUT, save, get

LON0, LON1, LAT0, LAT1 = 60.0, 78.5, 23.0, 37.5
PPD = 150  # pixels per degree (overview level 3 of the 1200 px tiles)
K = math.cos(math.radians(30))
UNITS_W = 1000.0
S = UNITS_W / ((LON1 - LON0) * K)
UNITS_H = (LAT1 - LAT0) * S


def proj(lon, lat):
    return ((lon - LON0) * K * S, (LAT1 - lat) * S)


def dem_tile(lat, lon):
    ns = "N" if lat >= 0 else "S"
    ew = "E" if lon >= 0 else "W"
    name = f"Copernicus_DSM_COG_30_{ns}{abs(lat):02d}_00_{ew}{abs(lon):03d}_00_DEM"
    return f"/vsicurl/https://copernicus-dem-90m.s3.amazonaws.com/{name}/{name}.tif"


def read_tile(args):
    lat, lon = args
    try:
        with rasterio.open(dem_tile(lat, lon), overview_level=1) as src:
            a = src.read(1, out_shape=(PPD, PPD), resampling=rasterio.enums.Resampling.average)
            return lat, lon, a.astype("float32")
    except Exception:
        return lat, lon, None


H = int((LAT1 - LAT0) * PPD)
W = int((LON1 - LON0) * PPD)
dem = np.zeros((H, W), dtype="float32")
seen = np.zeros((H, W), dtype=bool)
jobs = [(la, lo) for la in range(int(LAT0), int(math.ceil(LAT1))) for lo in range(int(LON0), int(math.ceil(LON1)))]
with ThreadPoolExecutor(16) as ex:
    for la, lo, a in ex.map(read_tile, jobs):
        if a is None:
            continue
        r0 = int(round((LAT1 - (la + 1)) * PPD))
        c0 = int(round((lo - LON0) * PPD))
        r1, c1 = min(H, r0 + PPD), min(W, c0 + PPD)
        rr0, cc0 = max(0, r0), max(0, c0)
        dem[rr0:r1, cc0:c1] = a[rr0 - r0:r1 - r0, cc0 - c0:c1 - c0]
        seen[rr0:r1, cc0:c1] = True
print("tiles read; land fraction", seen.mean().round(3), "max elev", dem.max())

# --- hillshade in metres (per-row longitude scale) ---
lats = LAT1 - (np.arange(H) + 0.5) / PPD
dy = 110540.0 / PPD
dx = (111320.0 * np.cos(np.radians(lats)) / PPD)[:, None]
z = ndimage.gaussian_filter(dem, 0.6)
gy, gx = np.gradient(z)
gx = gx / dx
gy = gy / dy
slope = np.arctan(np.hypot(gx, gy) * 3.2)
aspect = np.arctan2(-gx, gy)


def shade(az, alt):
    az, alt = math.radians(az), math.radians(alt)
    return np.clip(np.sin(alt) * np.cos(slope) + np.cos(alt) * np.sin(slope) * np.cos(az - aspect), 0, 1)

hs = 0.6 * shade(315, 42) + 0.22 * shade(270, 50) + 0.18 * shade(350, 60)
hs = np.clip(hs / np.sin(math.radians(46)), 0, 1.3)

# --- hypsometric tint (Swiss style): pale sage plains -> warm beige -> stone -> snow ---
stops = [(-50, (226, 233, 226)), (0, (228, 233, 220)), (250, (233, 233, 214)), (700, (234, 226, 202)),
         (1500, (226, 212, 186)), (2600, (212, 202, 186)), (3800, (214, 212, 208)), (5000, (238, 238, 236)),
         (6500, (252, 252, 252))]
xs = [s[0] for s in stops]
tint = np.dstack([np.interp(dem, xs, [s[1][i] for s in stops]) for i in range(3)]) / 255.0
lit = np.clip(hs, 0, 1)
hi = np.clip(hs - 1, 0, 0.3) / 0.3
shadow = np.array([70, 80, 92]) / 255.0
amt = (1 - lit) ** 1.15 * 0.62
rgb = tint * (1 - amt[..., None]) + shadow * amt[..., None]
rgb = rgb + (1 - rgb) * (hi * 0.35)[..., None]
sea = np.array([212, 225, 230]) / 255.0
rgb[~seen | (dem <= 0) & (lats[:, None] < 26)] = sea  # Arabian Sea (and missing ocean tiles)

# --- country mask: neighbours fade toward paper ---
ADM1 = os.path.join(os.path.dirname(OUT), "pak_adm1.geojson")
if not os.path.exists(ADM1):
    url = ("https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/PAK/ADM1/"
           "geoBoundaries-PAK-ADM1_simplified.geojson")
    open(ADM1, "wb").write(get(url))
pak = json.load(open(ADM1))
provs = [(f["properties"]["shapeName"], shape(f["geometry"])) for f in pak["features"]]
country = unary_union([g for _, g in provs]).buffer(0)
from rasterio.features import rasterize
from rasterio.transform import from_origin
tr = from_origin(LON0, LAT1, 1 / PPD, 1 / PPD)
inside = rasterize([(country, 1)], out_shape=(H, W), transform=tr).astype(bool)
paper = np.array([246, 244, 239]) / 255.0
fade = ndimage.gaussian_filter(inside.astype("float32"), 2.0)
outside_rgb = rgb * 0.30 + paper * 0.70
rgb = rgb * fade[..., None] + outside_rgb * (1 - fade[..., None])

img = Image.fromarray((np.clip(rgb, 0, 1) * 255).astype("uint8"))
# stretch horizontally to the cos(30°) projection used by the vector layers
out_w = int(round(UNITS_W * 2))
out_h = int(round(UNITS_H * 2))
img = img.resize((out_w, out_h), Image.LANCZOS)
save(img, "relief_pakistan.webp", quality=86)
save(img, "relief_pakistan.jpg", quality=88)
print("relief", img.size)

# --- vectors ---
def path_of(geom, tol=0.0):
    def ring(coords):
        pts = [proj(x, y) for x, y in coords]
        return "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    g = geom.simplify(tol) if tol else geom
    parts = []
    if g.geom_type in ("Polygon",):
        parts = [g]
    elif g.geom_type == "MultiPolygon":
        parts = list(g.geoms)
    if parts:
        return "".join(ring(p.exterior.coords) + "Z" for p in parts if p.area > 0.002)
    lines = [g] if g.geom_type == "LineString" else list(getattr(g, "geoms", []))
    return "".join(ring(l.coords) for l in lines if len(l.coords) > 1)

frame = box(LON0, LAT0, LON1, LAT1)
provinces = [{"name": n, "d": path_of(g, 0.02)} for n, g in provs]
outline = path_of(country, 0.015)

ne = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/"
rivers = json.loads(get(ne + "ne_10m_rivers_lake_centerlines.geojson"))
lakes = json.loads(get(ne + "ne_10m_lakes.geojson"))
river_out = []
for f in rivers["features"]:
    g = shape(f["geometry"])
    if not g.intersects(frame):
        continue
    g = g.intersection(frame)
    p = f["properties"]
    sr = p.get("scalerank", 10)
    if sr > 9:
        continue
    river_out.append({"name": p.get("name") or "", "rank": sr, "w": float(p.get("strokeweig") or 0.5),
                      "inside": bool(g.intersects(country)), "d": path_of(g.simplify(0.01))})
lake_out = []
for f in lakes["features"]:
    g = shape(f["geometry"])
    if g.intersects(frame) and g.area > 0.002:
        lake_out.append({"name": f["properties"].get("name") or "", "d": path_of(g.intersection(frame), 0.01)})
print("rivers", len(river_out), "lakes", len(lake_out))

json.dump({
    "frame": {"lon0": LON0, "lon1": LON1, "lat0": LAT0, "lat1": LAT1, "k": K, "s": S,
              "width": UNITS_W, "height": round(UNITS_H, 2)},
    "outline": outline, "provinces": provinces, "rivers": river_out, "lakes": lake_out,
}, open(os.path.join(OUT, "pakistan_map.json"), "w"), separators=(",", ":"))
print("json size", os.path.getsize(os.path.join(OUT, "pakistan_map.json")))
