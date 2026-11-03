"""SDG 15.3.1 sub-indicators on open data for a Cholistan desert-margin window (method demonstration).

Productivity: annual NDVI (mean of monthly clear-sky maxima) 2017-2024, Theil-Sen slope + Mann-Kendall.
Land cover: random forest (WorldCover labels) 2017 vs 2024, scored with a UNCCD-style transition matrix.
SOC: IPCC Tier-1 land-use change factors applied to the land-cover transitions.
Combined: one out, all out.
"""
import itertools
import numpy as np
from scipy import ndimage
from s2lib import Grid, tile_for, find_scenes, read_s2, read_scl, clear_mask, true_colour, to_img, ramp, \
    palette_img, save, dump, list_scenes, scene_info
import landcover as lc

grid = Grid(71.80, 29.05, 24.0, 15.0, res=30)
tile = tile_for(grid.lon, grid.lat)
YEARS = list(range(2017, 2025))

# ---------- productivity: annual NDVI ----------
annual = []
for y in YEARS:
    monthly = []
    for m in range(1, 13):
        try:
            prefixes = list_scenes(tile, y, m)
        except Exception:
            continue
        infos = [scene_info(p) for p in prefixes]
        infos = sorted([i for i in infos if i and i["cloud"] < 20 and i["nodata"] < 5], key=lambda i: i["cloud"])[:2]
        best = None
        for inf in infos:
            try:
                scl = read_scl(inf, grid)
            except Exception:
                continue
            ok = clear_mask(scl)
            if ok.mean() < 0.9:
                continue
            b = read_s2(inf, ["B04", "B08"], grid)
            nd = (b["B08"] - b["B04"]) / (b["B08"] + b["B04"] + 1e-6)
            nd[~ok] = np.nan
            best = nd if best is None else np.fmax(best, nd)
        if best is not None:
            monthly.append(best)
    a = np.nanmean(np.stack(monthly), axis=0)
    annual.append(a)
    print(y, "months", len(monthly), "mean NDVI", round(float(np.nanmean(a)), 3))
annual = np.stack(annual)  # (8, H, W)

# Theil-Sen slope and Mann-Kendall S
n = len(YEARS)
pairs = list(itertools.combinations(range(n), 2))
slopes = np.stack([(annual[j] - annual[i]) / (j - i) for i, j in pairs])
ts = np.nanmedian(slopes, axis=0)
S = np.sum(np.stack([np.sign(annual[j] - annual[i]) for i, j in pairs]), axis=0)
varS = n * (n - 1) * (2 * n + 5) / 18.0
Z = np.where(S > 0, (S - 1) / np.sqrt(varS), np.where(S < 0, (S + 1) / np.sqrt(varS), 0))
sig = np.abs(Z) > 1.96
prod = np.zeros(ts.shape, "int8")
prod[sig & (ts < 0)] = -1
prod[sig & (ts > 0)] = 1

# ---------- land cover 2017 vs 2024 ----------
def lc_year(y):
    sc = [s for s in find_scenes(tile, [f"{y}-10", f"{y}-11"], max_cloud=5, max_nodata=2)]
    best = None
    for s in sc[:6]:
        try:
            c = clear_mask(read_scl(s, grid)).mean()
        except Exception:
            continue
        if best is None or c > best[0]:
            best = (c, s)
    b = read_s2(best[1], lc.BANDS, grid)
    return b, best[1]["id"]

wc = lc.worldcover(grid)
lcs, rgbs, used = {}, {}, {}
for i, y in enumerate((2017, 2024)):
    b, used[y] = lc_year(y)
    rgbs[y] = b
    valid = np.isfinite(b["B04"]) & np.isfinite(b["B11"])
    feat = lc.features(b)
    rf, acc = lc.train(feat, wc, valid & (wc > 0), per_class=2000, seed=30 + i, trees=100)
    lcs[y] = lc.majority(lc.predict(rf, feat, valid), 3)
    print("LC", y, "OA", round(acc["overall"], 3))
    save(to_img(true_colour(b, gain=2.2, sat=1.08)), f"unccd_rgb_{y}.webp", quality=84, max_side=1600)

# UNCCD-style matrix on our classes: 1 tree, 3 grass/shrub, 4 crop, 5 artificial, 6 bare, 7 water
#   -1 degradation, 0 stable, +1 improvement (adapted from the Trends.Earth defaults)
M = {
    1: {1: 0, 3: -1, 4: -1, 5: -1, 6: -1, 7: 0},
    3: {1: 1, 3: 0, 4: 1, 5: -1, 6: -1, 7: 0},
    4: {1: 1, 3: -1, 4: 0, 5: -1, 6: -1, 7: 0},
    5: {1: 1, 3: 1, 4: 1, 5: 0, 6: 1, 7: 0},
    6: {1: 1, 3: 1, 4: 1, 5: -1, 6: 0, 7: 0},
    7: {1: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0},
}
a, b = lcs[2017], lcs[2024]
lcch = np.zeros(a.shape, "int8")
for p, row in M.items():
    for q, v in row.items():
        lcch[(a == p) & (b == q)] = v
# minimum mapping unit (3x3 px ~ 0.8 ha) to suppress edge noise
for v in (-1, 1):
    lab, nlab = ndimage.label(lcch == v)
    sizes = ndimage.sum(lcch == v, lab, index=np.arange(1, nlab + 1))
    lcch[np.isin(lab, np.flatnonzero(sizes < 9) + 1)] = 0

# ---------- SOC: IPCC Tier-1 land-use factors (warm-temperate dry) ----------
F = {1: 1.0, 3: 1.0, 4: 0.80, 5: 0.10, 6: 1.0, 7: 1.0}   # relative SOC stock vs natural reference
fa = np.vectorize(lambda k: F.get(int(k), 1.0))(a)
fb = np.vectorize(lambda k: F.get(int(k), 1.0))(b)
soc_change = fb / np.maximum(fa, 1e-3) - 1
soc = np.zeros(a.shape, "int8")
soc[soc_change < -0.10] = -1
soc[soc_change > 0.10] = 1

# ---------- one out, all out ----------
valid = np.isfinite(annual).all(0) & (a > 0) & (b > 0)
comb = np.zeros(a.shape, "int8")
deg = (prod == -1) | (lcch == -1) | (soc == -1)
imp = ((prod == 1) | (lcch == 1) | (soc == 1)) & ~deg
comb[deg] = -1
comb[imp] = 1
comb[~valid] = 0

PAL = {-1: (184, 69, 42), 0: (236, 232, 222), 1: (52, 118, 132)}
def tri(x, name):
    img = np.zeros(x.shape + (3,), "uint8")
    for k, c in PAL.items():
        img[x == k] = c
    img[~valid] = (246, 244, 239)
    save(img, name, max_side=1600)

tri(prod, "unccd_prod.png")
tri(lcch, "unccd_lc.png")
tri(soc, "unccd_soc.png")
tri(comb, "unccd_combined.png")
# continuous trend layer for the explainer
trend_img = ramp(ts, [(-0.03, (160, 52, 34)), (-0.01, (226, 170, 120)), (0, (240, 236, 226)),
                      (0.01, (130, 186, 176)), (0.03, (34, 110, 120))])
save(trend_img, "unccd_trend.webp", quality=86, max_side=1600)

def shares(x):
    v = x[valid]
    return {"degraded": round(float((v == -1).mean()), 4), "stable": round(float((v == 0).mean()), 4),
            "improved": round(float((v == 1).mean()), 4)}

ha = grid.res ** 2 / 1e4
# a few example pixels for the logic table (one per interesting combination)
examples = []
rng = np.random.default_rng(5)
for combo in [(-1, 0, 0), (0, -1, -1), (1, 0, 0), (0, 1, 0), (1, -1, 0), (0, 0, 0)]:
    m = valid & (prod == combo[0]) & (lcch == combo[1]) & (soc == combo[2])
    idx = np.flatnonzero(m.ravel())
    if len(idx):
        p = int(rng.choice(idx))
        r_, c_ = divmod(p, grid.W)
        examples.append({"prod": combo[0], "lc": combo[1], "soc": combo[2], "result": int(comb.ravel()[p]),
                         "px": [c_, r_], "from": int(a.ravel()[p]), "to": int(b.ravel()[p])})

dump({
    "grid": grid.meta(), "years": YEARS, "lc_scenes": used,
    "annual_mean_ndvi": [round(float(np.nanmean(x[valid])), 4) for x in annual],
    "shares": {"productivity": shares(prod), "land_cover": shares(lcch), "soc": shares(soc), "combined": shares(comb)},
    "area_ha": round(float(valid.sum() * ha), 1),
    "degraded_ha": round(float(((comb == -1) & valid).sum() * ha), 1),
    "sdg_15_3_1": round(float(((comb == -1) & valid).sum() / valid.sum()), 4),
    "examples": examples,
    "classes": {str(k): lc.CLASSES[k][0] for k in (1, 3, 4, 5, 6, 7)},
}, "unccd.json")
print("shares", shares(prod), shares(lcch), shares(soc), shares(comb))
