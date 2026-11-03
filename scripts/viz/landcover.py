"""Random-forest land-cover classification trained on ESA WorldCover labels."""
import numpy as np
from rasterio.enums import Resampling
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, cohen_kappa_score

from s2lib import read_url

# Our legend (id -> name, colour). Colours tuned for the paper/ink site palette.
CLASSES = {
    1: ("Dense forest", (38, 92, 58)),
    2: ("Open forest", (110, 150, 84)),
    3: ("Shrub & grass", (196, 196, 128)),
    4: ("Cropland", (226, 190, 92)),
    5: ("Built-up", (184, 69, 42)),
    6: ("Bare & rock", (214, 202, 182)),
    7: ("Water", (88, 140, 170)),
}
SIMPLE = {k: v for k, v in CLASSES.items() if k != 2}  # when forest is not split by density

WC_MAP = {10: 1, 20: 3, 30: 3, 40: 4, 50: 5, 60: 6, 70: 6, 100: 6, 80: 7, 90: 7, 95: 1}

BANDS = ["B02", "B03", "B04", "B05", "B06", "B07", "B08", "B8A", "B11", "B12"]


def worldcover_tile(lon, lat):
    la = int(np.floor(lat / 3) * 3)
    lo = int(np.floor(lon / 3) * 3)
    ns = "N" if la >= 0 else "S"
    ew = "E" if lo >= 0 else "W"
    return (f"https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/"
            f"ESA_WorldCover_10m_2021_v200_{ns}{abs(la):02d}{ew}{abs(lo):03d}_Map.tif")


def worldcover(grid):
    wc = read_url(worldcover_tile(grid.lon, grid.lat), grid, resampling=Resampling.nearest, dtype="uint8")
    out = np.zeros_like(wc)
    for k, v in WC_MAP.items():
        out[wc == k] = v
    return out


def features(b):
    eps = 1e-6
    nd = lambda a, c: (a - c) / (a + c + eps)
    stack = [b[k] for k in BANDS]
    stack += [nd(b["B08"], b["B04"]),   # NDVI
              nd(b["B03"], b["B08"]),   # NDWI
              nd(b["B11"], b["B08"]),   # NDBI
              nd(b["B03"], b["B11"]),   # MNDWI
              nd(b["B8A"], b["B05"])]   # red-edge NDVI
    return np.dstack(stack).astype("float32")


def sample(labels, valid, per_class=2500, seed=0, exclude=None):
    rng = np.random.default_rng(seed)
    idx = []
    for k in np.unique(labels[valid]):
        if k == 0:
            continue
        cand = np.flatnonzero((labels == k) & valid & (True if exclude is None else ~exclude))
        if len(cand) == 0:
            continue
        idx.append(rng.choice(cand, size=min(per_class, len(cand)), replace=False))
    return np.concatenate(idx)


def train(feat, labels, valid, per_class=2500, seed=0, trees=150):
    H, W, F = feat.shape
    X = feat.reshape(-1, F)
    y = labels.reshape(-1)
    idx = sample(labels, valid, per_class, seed)
    rng = np.random.default_rng(seed + 1)
    rng.shuffle(idx)
    cut = int(len(idx) * 0.7)
    tr, te = idx[:cut], idx[cut:]
    rf = RandomForestClassifier(n_estimators=trees, min_samples_leaf=2, n_jobs=-1, random_state=seed)
    rf.fit(X[tr], y[tr])
    pred = rf.predict(X[te])
    labs = sorted(np.unique(y[idx]))
    cm = confusion_matrix(y[te], pred, labels=labs)
    acc = {
        "labels": [int(l) for l in labs],
        "matrix": cm.tolist(),
        "overall": float(np.trace(cm) / cm.sum()),
        "kappa": float(cohen_kappa_score(y[te], pred)),
        "n_train": int(len(tr)),
        "n_test": int(len(te)),
    }
    return rf, acc


def predict(rf, feat, valid, chunk=400_000):
    H, W, F = feat.shape
    X = feat.reshape(-1, F)
    out = np.zeros(H * W, dtype="uint8")
    v = valid.reshape(-1)
    ids = np.flatnonzero(v)
    for i in range(0, len(ids), chunk):
        sl = ids[i:i + chunk]
        out[sl] = rf.predict(X[sl])
    return out.reshape(H, W)


def majority(classes, size=3):
    """Light majority filter to remove salt-and-pepper noise."""
    from scipy import ndimage
    best = classes.copy()
    bestcount = np.zeros(classes.shape, dtype="float32")
    for k in np.unique(classes):
        if k == 0:
            continue
        c = ndimage.uniform_filter((classes == k).astype("float32"), size=size)
        m = c > bestcount
        best[m] = k
        bestcount = np.maximum(bestcount, c)
    best[classes == 0] = 0
    return best
