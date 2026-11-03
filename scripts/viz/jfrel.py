"""JFREL-style activity-data workflow, demonstrated on open data over the Galiyat-Murree forest belt.

1. Cloud-masked Sentinel-2 median composites for three epochs.
2. Random-forest land cover per epoch (labels: ESA WorldCover at temporally stable pixels).
3. Canopy density inside forest from linear spectral unmixing (green-vegetation fraction).
4. Cross-year refinement: spatial majority, A-B-A flip removal, implausible transitions, minimum mapping unit.
5. Transition matrix (for the Sankey), raw vs refined change.
6. Accuracy and sample-based area estimates with 95% CIs (Olofsson et al. 2014).
"""
import json, os
import numpy as np
from scipy import ndimage
from rasterio.enums import Resampling
from s2lib import Grid, find_scenes, read_s2, read_scl, clear_mask, true_colour, to_img, ramp, palette_img, save, \
    dump, OUT, read_url
import landcover as lc

grid = Grid(73.405, 33.99, 15.0, 17.0, res=10)
TILE = "43SCT"
EPOCHS = {
    2018: ["2018-09"],
    2020: ["2020-09"],
    2024: ["2024-09"],
}
Y0, Y1, Y2 = EPOCHS
LC6 = {1: "Forest", 3: "Shrub & grass", 4: "Cropland", 5: "Built-up", 6: "Bare & rock", 7: "Water"}


def composite(year):
    scenes = find_scenes(TILE, EPOCHS[year], max_cloud=25, max_nodata=2)
    # Same seasonal window every epoch (1-25 Sep): matched phenology (grass still green) and sun angle.
    scenes = [s for s in scenes if s["datetime"][5:10] <= "09-25"]
    scored = []
    for s in scenes:
        try:
            c = clear_mask(read_scl(s, grid.scaled(5))).mean()
        except Exception:
            continue  # some early archive scenes ship without an SCL layer
        scored.append((c, s))
    scored.sort(key=lambda t: -t[0])
    pick = [s for c, s in scored if c > 0.75][:5] or [scored[0][1]]
    print(year, "scenes:", [(s["id"][10:18], round(c, 3)) for c, s in scored[:6]], "->", len(pick))
    stacks = {b: [] for b in lc.BANDS}
    for s in pick:
        b = read_s2(s, lc.BANDS, grid)
        ok = clear_mask(read_scl(s, grid))
        for k in lc.BANDS:
            a = b[k]
            a[~ok] = np.nan
            stacks[k].append(a)
    comp = {k: np.nanmedian(np.stack(v), axis=0).astype("float32") for k, v in stacks.items()}
    return comp, [s["id"] for s in pick]


comps, used = {}, {}
for y in EPOCHS:
    comps[y], used[y] = composite(y)

# Relative radiometric normalisation: fit each band of the earlier epochs to 2024 over pseudo-invariant pixels
# (small NDVI change), so that phenology/haze differences don't read as land-cover change.
REF = 2024
nd = {y: (c["B08"] - c["B04"]) / (c["B08"] + c["B04"] + 1e-6) for y, c in comps.items()}
norm_fit = {}
for y in comps:
    if y == REF:
        continue
    pif = np.isfinite(nd[y]) & np.isfinite(nd[REF]) & (np.abs(nd[y] - nd[REF]) < 0.05)
    idx = np.flatnonzero(pif.ravel())
    idx = np.random.default_rng(1).choice(idx, size=min(80000, len(idx)), replace=False)
    norm_fit[y] = {}
    for b in lc.BANDS:
        x_ = comps[y][b].ravel()[idx]
        r_ = comps[REF][b].ravel()[idx]
        ok = np.isfinite(x_) & np.isfinite(r_)
        a, c0 = np.polyfit(x_[ok], r_[ok], 1)
        comps[y][b] = (comps[y][b] * a + c0).astype("float32")
        norm_fit[y][b] = [round(float(a), 4), round(float(c0), 5)]
    print("normalised", y, "PIFs", int(pif.sum()))

for y in comps:
    save(to_img(true_colour(comps[y], gain=3.0, sat=1.18)), f"jfrel_rgb_{y}.webp", quality=84, max_side=1500)

valid = np.ones((grid.H, grid.W), bool)
for y in comps:
    valid &= np.isfinite(comps[y]["B04"]) & np.isfinite(comps[y]["B11"])
print("valid", valid.mean().round(4))

# ---- labels ----
wc = lc.worldcover(grid)
ndvis = {y: (c["B08"] - c["B04"]) / (c["B08"] + c["B04"] + 1e-6) for y, c in comps.items()}
nd_stack = np.stack(list(ndvis.values()))
stable = (np.nanmax(nd_stack, 0) - np.nanmin(nd_stack, 0)) < 0.12

classes, accs = {}, {}
for i, y in enumerate(comps):
    feat = lc.features(comps[y])
    rf, acc = lc.train(feat, wc, valid & (wc > 0), per_class=2500, seed=10 + i, trees=120)
    accs[y] = acc
    classes[y] = lc.predict(rf, feat, valid)
    print(y, "OA", round(acc["overall"], 3), "kappa", round(acc["kappa"], 3))

# ---- canopy density by linear spectral unmixing (GV / soil / shade) ----
UNMIX_BANDS = ["B02", "B03", "B04", "B08", "B11", "B12"]


def endmembers(c, cls):
    X = np.dstack([c[b] for b in UNMIX_BANDS])
    nd = ndvis_y = (c["B08"] - c["B04"]) / (c["B08"] + c["B04"] + 1e-6)
    gv_mask = (cls == 1) & (nd > np.nanpercentile(nd[cls == 1], 90))
    soil_mask = (np.isin(cls, [6, 4])) & (nd < np.nanpercentile(nd[valid], 8))
    gv = np.nanmedian(X[gv_mask], axis=0)
    soil = np.nanmedian(X[soil_mask], axis=0)
    shade = np.full(len(UNMIX_BANDS), 0.005, dtype="float32")
    return np.stack([gv, soil, shade], axis=1), X


def unmix(c, E, X):
    # Fully constrained-ish: least squares with sum-to-one via augmented row, then clip/renormalise.
    w = 10.0
    A = np.vstack([E, w * np.ones((1, E.shape[1]))])
    H_, W_, B = X.shape
    Y = np.concatenate([X.reshape(-1, B), w * np.ones((H_ * W_, 1), dtype="float32")], axis=1)
    F, *_ = np.linalg.lstsq(A, np.nan_to_num(Y).T, rcond=None)
    F = np.clip(F.T, 0, None)
    F = F / np.maximum(F.sum(1, keepdims=True), 1e-6)
    return F.reshape(H_, W_, -1)


# One set of endmembers (from the latest epoch) applied to all epochs keeps fractions comparable.
E, _ = endmembers(comps[2024], classes[2024])
canopy = {}
for y, c in comps.items():
    X = np.dstack([c[b] for b in UNMIX_BANDS])
    F = unmix(c, E, X)
    gv_norm = F[..., 0] / np.maximum(F[..., 0] + F[..., 1], 1e-3)  # shade-normalised GV fraction
    canopy[y] = np.where(valid, gv_norm, np.nan).astype("float32")

# Shade-normalised GV saturates inside closed canopy; rescale with pooled forest percentiles (all epochs
# together, so the same stretch applies to every year) to get a 0-1 canopy-density index.
pool = np.concatenate([canopy[y][(classes[y] == 1) & valid] for y in canopy])
lo_, hi_ = np.nanpercentile(pool, [2, 98])
for y in canopy:
    canopy[y] = np.clip((canopy[y] - lo_) / (hi_ - lo_), 0, 1).astype("float32")
print("canopy stretch", round(float(lo_), 3), round(float(hi_), 3))

# Forest split: dense vs open forest. Threshold fixed across epochs at the 30th percentile of
# 2024 forest canopy (rounded), so 'open forest' is a meaningful share of the forest estate.
q = np.nanpercentile(canopy[REF][(classes[REF] == 1) & valid], 30)
DENSE_T = float(np.round(q * 20) / 20)
print("canopy percentiles 2024 forest", np.nanpercentile(canopy[REF][(classes[REF] == 1) & valid], [10, 30, 50, 70, 90]).round(3), "-> threshold", DENSE_T)
def split(cls, can):
    out = cls.copy()
    out[(cls == 1) & (can < DENSE_T)] = 2
    return out

raw = {y: split(classes[y], canopy[y]) for y in classes}

# ---- cross-year refinement ----
# (a) land cover: spatial majority, A-B-A flips, implausible reversals, minimum mapping unit
lcr = {y: lc.majority(classes[y], 5) for y in classes}
years = list(lcr)
a, b, c = (lcr[y] for y in years)
aba = (a == c) & (b != a)               # A-B-A flips are classifier noise
b[aba] = a[aba]
for x, y in ((a, b), (b, c)):
    rev = (x == 5) & np.isin(y, [1, 3, 4])  # built-up does not revert within the period
    y[rev] = x[rev]
for x, y in ((a, b), (b, c)):
    ch = x != y
    lab, n = ndimage.label(ch)
    sizes = ndimage.sum(ch, lab, index=np.arange(1, n + 1))
    small = np.isin(lab, np.flatnonzero(sizes < 50) + 1)   # 0.5 ha
    y[small] = x[small]
lcr = dict(zip(years, (a, b, c)))

# (b) canopy density with hysteresis: density class follows the multi-year mean canopy, and changes only
#     when canopy moves by more than 0.15 relative to the first epoch (degradation / recovery).
can_s = {y: ndimage.median_filter(np.nan_to_num(canopy[y]), size=3) for y in canopy}
base = np.mean(np.stack([can_s[y] for y in years]), axis=0)
first = can_s[years[0]]
ref = {}
for y in years:
    out = lcr[y].copy()
    dense = base >= DENSE_T
    d = can_s[y] - first
    dense = np.where((d < -0.15) & (can_s[y] < DENSE_T), False, dense)
    dense = np.where((d > 0.15) & (can_s[y] >= DENSE_T), True, dense)
    out[(out == 1) & ~dense] = 2
    ref[y] = out
# regrowth is gradual: non-forest cannot become dense forest between consecutive epochs
for i in range(1, len(years)):
    x, y = ref[years[i - 1]], ref[years[i]]
    jump = ~np.isin(x, [1, 2]) & (y == 1)
    y[jump] = 2
# MMU on density changes too
for i in range(1, len(years)):
    x, y = ref[years[i - 1]], ref[years[i]]
    ch = (x != y) & np.isin(x, [1, 2]) & np.isin(y, [1, 2])
    lab, n = ndimage.label(ch)
    sizes = ndimage.sum(ch, lab, index=np.arange(1, n + 1))
    small = np.isin(lab, np.flatnonzero(sizes < 50) + 1)
    y[small] = x[small]

raw_change = float(((raw[Y0] != raw[Y1]) | (raw[Y1] != raw[Y2]))[valid].mean())
ref_change = float(((ref[Y0] != ref[Y1]) | (ref[Y1] != ref[Y2]))[valid].mean())
print("changed pixels raw", round(raw_change, 4), "refined", round(ref_change, 4))

# ---- outputs: maps ----
pal7 = {k: v[1] for k, v in lc.CLASSES.items()}
for y in ref:
    save(palette_img(ref[y], pal7), f"jfrel_lc_{y}.png", max_side=1500)
    save(palette_img(raw[y], pal7), f"jfrel_raw_{y}.png", max_side=1500)

can_stops = [(0.0, (236, 230, 214)), (0.3, (214, 210, 160)), (0.5, (150, 178, 104)), (0.7, (72, 128, 72)),
             (0.9, (26, 74, 44))]
for y in canopy:
    img = ramp(np.where(np.isin(ref[y], [1, 2]), canopy[y], np.nan), can_stops)
    img[~np.isin(ref[y], [1, 2])] = (244, 241, 234)
    save(img, f"jfrel_canopy_{y}.webp", quality=86, max_side=1500)


def change_map(x, y):
    """Highlight transitions of interest on a pale base."""
    out = np.zeros(x.shape + (3,), "uint8")
    out[:] = (241, 238, 230)
    out[np.isin(y, [1, 2])] = (205, 214, 196)  # stable forest, pale
    defo = np.isin(x, [1, 2]) & ~np.isin(y, [1, 2])
    degr = (x == 1) & (y == 2)
    gain = ~np.isin(x, [1, 2]) & np.isin(y, [1, 2])
    urb = (y == 5) & (x != 5)
    out[degr] = (226, 168, 64)
    out[defo] = (184, 69, 42)
    out[gain] = (60, 120, 160)
    out[urb] = (120, 40, 30)
    return out, {"deforestation": int(defo.sum()), "degradation": int(degr.sum()),
                 "gain": int(gain.sum()), "new_built": int(urb.sum())}

cm_raw, cnt_raw = change_map(raw[Y0], raw[Y2])
cm_ref, cnt_ref = change_map(ref[Y0], ref[Y2])
save(cm_raw, "jfrel_change_raw.png", max_side=1500)
save(cm_ref, "jfrel_change_refined.png", max_side=1500)

# ---- transition matrix (Sankey) ----
ha = (grid.res ** 2) / 10000.0
ids = list(lc.CLASSES)
def matrix(x, y):
    m = np.zeros((len(ids), len(ids)))
    for i, p in enumerate(ids):
        sel = (x == p) & valid
        if not sel.any():
            continue
        yy = y[sel]
        for j, q in enumerate(ids):
            m[i, j] = (yy == q).sum() * ha
    return m.round(1).tolist()

areas = {y: {lc.CLASSES[k][0]: round(float(((ref[y] == k) & valid).sum() * ha), 1) for k in ids} for y in ref}

# ---- sample-based area estimation (Olofsson et al. 2014) ----
# Stratified random sample from the middle-epoch map (forest merged); reference labels from ESA WorldCover 2021
# stand in for the visual interpretation of sample units used in the study.
m20 = ref[Y1].copy()
m20[m20 == 2] = 1
rng = np.random.default_rng(42)
K = [k for k in [1, 3, 4, 5, 6] if ((m20 == k) & valid).sum() > 200]
n_per = {k: 150 for k in K}
samples = []
for k in K:
    cand = np.flatnonzero(((m20 == k) & valid & (wc > 0)).ravel())
    pick = rng.choice(cand, size=min(n_per[k], len(cand)), replace=False)
    samples += [(k, int(wc.ravel()[p])) for p in pick]
samples = np.array(samples)
Nh = {k: int(((m20 == k) & valid).sum()) for k in K}
Ntot = sum(Nh.values())
Wh = {k: Nh[k] / Ntot for k in K}
err = np.zeros((len(K), len(K)))
for i, h in enumerate(K):
    for j, k in enumerate(K):
        err[i, j] = ((samples[:, 0] == h) & (samples[:, 1] == k)).sum()
area_est = {}
for j, k in enumerate(K):
    p_hat, var = 0.0, 0.0
    for i, h in enumerate(K):
        nh = err[i].sum()
        pk = err[i, j] / nh
        p_hat += Wh[h] * pk
        var += Wh[h] ** 2 * pk * (1 - pk) / (nh - 1)
    area_est[LC6[k]] = {"map_ha": round(Nh[k] * ha, 1), "est_ha": round(float(p_hat * Ntot * ha), 1),
                        "ci95_ha": round(float(1.96 * np.sqrt(var) * Ntot * ha), 1),
                        "users": round(float(err[j, j] / err[j].sum()), 3),
                        "producers": round(float(err[j, j] / max(err[:, j].sum(), 1)), 3)}
overall_sample = float(np.trace(err) / err.sum())
print("area estimates", area_est, "OA(sample)", round(overall_sample, 3))

# Canopy distributions for the histogram (forest pixels only)
hist = {}
bins = np.linspace(0, 1, 41)
for y in canopy:
    m = np.isin(ref[y], [1, 2]) & valid
    h, _ = np.histogram(canopy[y][m], bins=bins)
    hist[y] = (h / h.sum()).round(5).tolist()

# Hansen GFC cross-check: stand-replacing loss 2018-2024 inside the AOI
hansen = read_url("https://storage.googleapis.com/earthenginepartners-hansen/GFC-2024-v1.12/"
                  "Hansen_GFC-2024-v1.12_lossyear_40N_070E.tif", grid, resampling=Resampling.nearest, dtype="uint8")
hansen_loss_ha = float(((hansen >= 19) & (hansen <= 24) & valid).sum() * ha)

dump({
    "grid": grid.meta(), "scenes": used, "epochs": list(EPOCHS),
    "classes": {str(k): {"name": v[0], "rgb": v[1]} for k, v in lc.CLASSES.items()},
    "accuracy": {str(y): accs[y] for y in accs},
    "areas_ha": {str(y): areas[y] for y in areas},
    "transitions": {"ids": ids, "a": matrix(ref[Y0], ref[Y1]), "b": matrix(ref[Y1], ref[Y2])},
    "change_counts_px": {"raw": cnt_raw, "refined": cnt_ref},
    "changed_share": {"raw": raw_change, "refined": ref_change},
    "area_estimates": area_est, "sample_overall": overall_sample, "sample_matrix": err.tolist(),
    "sample_classes": [LC6[k] for k in K], "normalisation": norm_fit,
    "canopy_hist": {str(y): hist[y] for y in hist}, "canopy_bins": bins.round(3).tolist(),
    "dense_threshold": DENSE_T, "hansen_loss_ha": hansen_loss_ha,
    "pixel_ha": ha,
}, "jfrel.json")
print("done")
