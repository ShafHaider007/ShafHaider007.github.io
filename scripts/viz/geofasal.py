"""Rabi-season time-lapse for fields near Sahiwal: true colour + NDVI frames, field segmentation, crop calendars."""
import numpy as np
from scipy import ndimage
from skimage.segmentation import felzenszwalb
from skimage.measure import find_contours, regionprops
from sklearn.cluster import KMeans
from s2lib import Grid, tile_for, find_scenes, read_s2, read_scl, clear_mask, true_colour, to_img, ramp, save, dump

grid = Grid(73.095, 30.795, 4.2, 2.8, res=10)
tile = tile_for(grid.lon, grid.lat)
months = ["2024-10", "2024-11", "2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05"]
scenes = find_scenes(tile, months, max_cloud=40, max_nodata=5)
frames = []
last_date = None
for s in scenes:
    try:
        scl = read_scl(s, grid)
    except Exception:
        continue
    c = clear_mask(scl).mean()
    d = s["datetime"][:10]
    if c < 0.985:
        continue
    if last_date and d == last_date:
        continue
    b = read_s2(s, ["B02", "B03", "B04", "B08", "B11"], grid)
    frames.append((d, s, b))
    last_date = d
    print(d, s["id"], round(c, 3))

# Winter fog/smog over Punjab often escapes the scene classification: drop frames whose field NDVI
# collapses relative to the season (or whose blue reflectance is fog-bright).
def fieldstats(b):
    nd = (b["B08"] - b["B04"]) / (b["B08"] + b["B04"] + 1e-6)
    return float(np.nanmean(nd)), float(np.nanmean(b["B02"]))
stats = [fieldstats(f[2]) for f in frames]
med = np.median([x[0] for x in stats])
clean = []
for i, f in enumerate(frames):
    nd_, blue = stats[i]
    nb = [stats[j][0] for j in (i - 1, i + 1) if 0 <= j < len(frames)]
    if blue > 0.11 or nd_ < 0.75 * min(nb + [med]):
        print("drop hazy frame", f[0], round(nd_, 3), round(blue, 3))
        continue
    clean.append(f)
frames = clean

# keep at most one frame every ~8 days
keep, prev = [], None
import datetime as dt
for f in frames:
    day = dt.date.fromisoformat(f[0])
    if prev is None or (day - prev).days >= 8:
        keep.append(f)
        prev = day
frames = keep
print("frames", len(frames))

ndvi_stops = [(-0.1, (190, 182, 160)), (0.12, (214, 198, 160)), (0.25, (222, 214, 150)), (0.4, (178, 196, 104)),
              (0.55, (110, 160, 76)), (0.7, (52, 120, 58)), (0.85, (22, 78, 42))]
ndvi_stack, ndwi_stack, dates = [], [], []
for i, (d, s, b) in enumerate(frames):
    save(to_img(true_colour(b, gain=2.4, sat=1.15)), f"gf_rgb_{i:02d}.webp", quality=82)
    nd = (b["B08"] - b["B04"]) / (b["B08"] + b["B04"] + 1e-6)
    nw = (b["B08"] - b["B11"]) / (b["B08"] + b["B11"] + 1e-6)  # NDWI (Gao): canopy water content
    save(ramp(nd, ndvi_stops), f"gf_ndvi_{i:02d}.webp", quality=84)
    ndvi_stack.append(nd)
    ndwi_stack.append(nw)
    dates.append(d)
ndvi_stack = np.stack(ndvi_stack)
ndwi_stack = np.stack(ndwi_stack)

# ---- field segmentation on a multi-date NDVI composite (early, peak, late) ----
T = len(dates)
pick = [int(T * 0.2), int(T * 0.55), int(T * 0.9)]
comp = np.dstack([np.clip((ndvi_stack[k] + 0.1) / 1.0, 0, 1) for k in pick])
seg = felzenszwalb(comp, scale=60, sigma=0.6, min_size=60)
print("segments", seg.max() + 1)

# per-field mean curves
labels = np.unique(seg)
curves = np.array([ndvi_stack[:, seg == l].mean(axis=1) for l in labels])
wcurves = np.array([ndwi_stack[:, seg == l].mean(axis=1) for l in labels])
sizes = np.array([(seg == l).sum() for l in labels])

# cluster field calendars (exclude tiny segments)
big = sizes >= 80
km = KMeans(n_clusters=4, n_init=20, random_state=0).fit(curves[big])
cl = np.full(len(labels), -1)
cl[big] = km.labels_
centres = km.cluster_centers_

def describe(c):
    peak = int(np.argmax(c))
    return {"peak_idx": peak, "peak_date": dates[peak], "max": float(c.max()), "min": float(c.min()),
            "end": float(c[-1]), "start": float(c[0])}

info = [describe(c) for c in centres]
# name clusters by calendar shape (explicit agronomic rules)
def month_of(i):
    return dt.date.fromisoformat(dates[i]).month
order = []
for k, inf in enumerate(info):
    c = centres[k]
    winter = [i for i, d in enumerate(dates) if d[5:7] in ("12", "01")]
    spring = [i for i, d in enumerate(dates) if d[5:7] in ("04", "05")]
    febmar = [i for i, d in enumerate(dates) if d[5:7] in ("02", "03")]
    if inf["max"] < 0.45:
        name = "Villages, roads & fallow"
    elif min(c[winter + febmar]) > 0.5:
        name = "Perennial (sugarcane, orchards)"
    elif max(c[febmar]) >= 0.65 and c[spring].mean() < max(c[febmar]) - 0.2:
        name = "Wheat"
    elif max(c[spring]) >= 0.6 and max(c[febmar]) < 0.5 and max(c[winter]) < 0.5:
        name = "Spring crop (maize)"
    else:
        name = "Winter vegetables, then spring crop"
    order.append(name)
print(list(zip(order, [round(i["max"], 2) for i in info], [i["peak_date"] for i in info])))

# choose one representative field per cluster (largest compact segment closest to the centre curve)
reps = []
for k in range(4):
    idx = np.flatnonzero(cl == k)
    if len(idx) == 0:
        continue
    dist = ((curves[idx] - centres[k]) ** 2).sum(1)
    score = dist / np.log(sizes[idx] + 1)
    j = idx[np.argmin(score)]
    mask = seg == labels[j]
    mask = ndimage.binary_opening(mask, iterations=1)
    cs = find_contours(mask.astype(float), 0.5)
    if not cs:
        continue
    c = max(cs, key=len)
    step = max(1, len(c) // 60)
    poly = [[round(float(p[1]), 1), round(float(p[0]), 1)] for p in c[::step]]
    reps.append({"cluster": k, "name": order[k], "poly": poly, "ndvi": np.round(curves[j], 3).tolist(),
                 "ndwi": np.round(wcurves[j], 3).tolist(), "area_ha": float(sizes[j] * 0.01)})

# field boundary overlay as SVG path (all segments >= 0.6 ha)
bounds = np.zeros(seg.shape, bool)
bounds[:-1] |= seg[:-1] != seg[1:]
bounds[:, :-1] |= seg[:, :-1] != seg[:, 1:]
from PIL import Image
bimg = np.zeros(seg.shape + (4,), "uint8")
bimg[bounds] = (255, 255, 255, 150)
Image.fromarray(bimg).save(__import__("os").path.join(__import__("s2lib").OUT, "gf_fields.png"), optimize=True)

tot = sizes[big].sum()
share = {k: round(float(sizes[cl == k].sum() / tot), 3) for k in range(4)}
dump({
    "grid": grid.meta(), "dates": dates, "scenes": [f[1]["id"] for f in frames],
    "clusters": [{"name": order[k], "ndvi": np.round(centres[k], 3).tolist(),
                  "ndwi": np.round(wcurves[cl == k].mean(0), 3).tolist(), "share": share[k]} for k in range(4)],
    "fields": reps, "n_fields": int(big.sum()),
    "mean_ndvi": np.round(np.nanmean(ndvi_stack, axis=(1, 2)), 3).tolist(),
}, "geofasal.json")
print("done", [(order[k], share[k]) for k in range(4)])
