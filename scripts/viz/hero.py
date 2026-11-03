"""Hero 'spectral stack' over Islamabad: individual bands, composites, NDVI and land cover."""
import sys
import numpy as np
from s2lib import Grid, tile_for, find_scenes, read_s2, read_scl, clear_mask, true_colour, tone, saturate, \
    to_img, ramp, palette_img, save, dump
import landcover as lc

grid = Grid(73.075, 33.708, 16.0, 12.0, res=10)
tile = tile_for(grid.lon, grid.lat)
months = sys.argv[1].split(",") if len(sys.argv) > 1 else ["2024-10", "2024-11", "2025-03", "2025-04"]
scenes = find_scenes(tile, months, max_cloud=5, max_nodata=1)

best, best_clear = None, -1
for s in scenes[:12]:
    scl = read_scl(s, grid.scaled(4))
    c = clear_mask(scl).mean()
    print(f"{s['id']} cloud={s['cloud']:.1f} aoi_clear={c:.3f}")
    if c > best_clear + 0.002:
        best, best_clear = s, c
print("using", best["id"], best_clear)

b = read_s2(best, lc.BANDS, grid)
valid = np.isfinite(b["B04"]) & np.isfinite(b["B11"])

tc = true_colour(b)
save(to_img(tc), "hero_true.webp", quality=82, max_side=1600)
fc = saturate(np.dstack([tone(b["B08"], 1.5), tone(b["B04"], 2.6), tone(b["B03"], 2.6)]), 1.05)
save(to_img(fc), "hero_false.webp", quality=82, max_side=1600)

ndvi = (b["B08"] - b["B04"]) / (b["B08"] + b["B04"] + 1e-6)
ndvi_stops = [(-0.2, (120, 150, 172)), (0.0, (200, 196, 176)), (0.15, (222, 206, 160)), (0.3, (214, 210, 128)),
              (0.45, (152, 184, 96)), (0.6, (82, 140, 70)), (0.8, (28, 84, 46))]
save(ramp(ndvi, ndvi_stops), "hero_ndvi.webp", quality=82, max_side=1600)

# Individual bands: monochrome, tinted so the stack reads as spectrum.
tints = {"B02": (64, 110, 190), "B03": (60, 150, 90), "B04": (196, 64, 48), "B08": (150, 40, 70),
         "B11": (176, 110, 40), "B12": (120, 82, 50)}
for k, tint in tints.items():
    a = b[k]
    lo, hi = np.nanpercentile(a[valid], [1, 99.5])
    g = np.clip((np.nan_to_num(a) - lo) / (hi - lo), 0, 1) ** 0.85
    t = np.array(tint) / 255.0
    # map dark -> deep tint, bright -> warm paper
    paper = np.array([250, 248, 242]) / 255.0
    rgb = (1 - g[..., None]) * (t * 0.55) + g[..., None] * (paper * 0.35 + t * 0.65 + 0.15)
    save(to_img(np.clip(rgb, 0, 1)), f"hero_{k}.webp", quality=78, max_side=1200)

# Land cover: RF trained on WorldCover 2021 labels.
labels = lc.worldcover(grid)
feat = lc.features(b)
rf, acc = lc.train(feat, labels, valid & (labels > 0), per_class=3000, trees=120)
cls = lc.majority(lc.predict(rf, feat, valid), 3)
pal = {k: v[1] for k, v in lc.SIMPLE.items()}
save(palette_img(cls, pal), "hero_landcover.png", max_side=1600)
save(palette_img(cls, pal), "hero_landcover.webp", quality=90, max_side=1600)
shares = {lc.CLASSES[k][0]: round(float((cls == k).sum() / valid.sum()), 4) for k in pal}
print("accuracy", round(acc["overall"], 3), "kappa", round(acc["kappa"], 3))
print("shares", shares)
dump({"scene": best["id"], "date": best["datetime"][:10], "grid": grid.meta(), "accuracy": acc,
      "shares": shares, "ndvi_mean": float(np.nanmean(ndvi))}, "hero_meta.json")
