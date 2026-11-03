"""Copy processed layers into the site's public/viz folder, compact the JSON, and render home-page posters."""
import json, math, os, re, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "viz")
os.makedirs(DST, exist_ok=True)


def d(*p):
    path = os.path.join(DST, *p)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path


def webp(src, dst, quality=84, lossless=False, max_side=None):
    im = Image.open(os.path.join(SRC, src))
    if im.mode == "P":
        im = im.convert("RGB")
    if max_side and max(im.size) > max_side:
        im.thumbnail((max_side, max_side), Image.LANCZOS)
    im.save(d(dst), "WEBP", quality=quality, lossless=lossless, method=6)
    return im


def load(name):
    return json.load(open(os.path.join(SRC, name)))


def dump(obj, *p):
    with open(d(*p), "w") as f:
        json.dump(obj, f, separators=(",", ":"))


# ---------------- hero ----------------
for n in ["true", "false", "ndvi", "B02", "B03", "B04", "B08", "B11", "B12"]:
    webp(f"hero_{n}.webp", f"hero/{n}.webp", quality=80, max_side=1200)
webp("hero_landcover.png", "hero/landcover.webp", quality=90, max_side=1000)
h = load("hero_meta.json")
dump({"date": h["date"], "scene": h["scene"], "shares": h["shares"], "oa": h["accuracy"]["overall"],
      "kappa": h["accuracy"]["kappa"], "bounds": h["grid"]["bounds"]}, "hero", "hero.json")

# ---------------- relief map ----------------
webp("relief_pakistan.webp", "map/relief.webp", quality=84)
shutil.copy(os.path.join(SRC, "pakistan_map.json"), d("map", "pakistan.json"))

# ---------------- JFREL ----------------
J = load("jfrel.json")
ys = [str(y) for y in J["epochs"]]
for y in ys:
    webp(f"jfrel_rgb_{y}.webp", f"jfrel/rgb_{y}.webp", quality=84, max_side=1000)
    webp(f"jfrel_lc_{y}.png", f"jfrel/lc_{y}.webp", quality=90, max_side=1000)
    webp(f"jfrel_canopy_{y}.webp", f"jfrel/canopy_{y}.webp", quality=82, max_side=1000)
webp("jfrel_change_raw.png", "jfrel/change_raw.webp", quality=90, max_side=1000)
webp("jfrel_change_refined.png", "jfrel/change_refined.webp", quality=90, max_side=1000)
# binary forest estimate from the stratified sample (forest vs everything else)
cls = J["sample_classes"]
M = np.array(J["sample_matrix"])
fi = cls.index("Forest")
map_ha = {k: v["map_ha"] for k, v in J["area_estimates"].items()}
Nh = np.array([map_ha[c] for c in cls])
Wh = Nh / Nh.sum()
nh = M.sum(1)
pF = (M[:, fi] / nh)
p_hat = float((Wh * pF).sum())
var = float((Wh ** 2 * pF * (1 - pF) / (nh - 1)).sum())
tot = Nh.sum()
forest_est = {"map_ha": float(map_ha["Forest"]), "est_ha": p_hat * tot, "ci95_ha": 1.96 * math.sqrt(var) * tot,
              "users": float(M[fi, fi] / M[fi].sum()), "producers": float(M[fi, fi] / M[:, fi].sum())}
dump({
    "epochs": J["epochs"], "scenes": J["scenes"], "classes": J["classes"], "areas": J["areas_ha"],
    "accuracy": {y: {"oa": a["overall"], "kappa": a["kappa"], "n": a["n_test"]} for y, a in J["accuracy"].items()},
    "transitions": J["transitions"], "changed": J["changed_share"],
    "change_px": J["change_counts_px"], "pixel_ha": J["pixel_ha"],
    "canopy_hist": J["canopy_hist"], "canopy_bins": J["canopy_bins"], "dense_threshold": J["dense_threshold"],
    "forest_estimate": forest_est, "hansen_loss_ha": J["hansen_loss_ha"], "bounds": J["grid"]["bounds"],
}, "jfrel", "jfrel.json")
print("JFREL forest estimate", forest_est)

# ---------------- UNCCD ----------------
U = load("unccd.json")
for n in ["rgb_2017", "rgb_2024", "trend"]:
    webp(f"unccd_{n}.webp", f"unccd/{n}.webp", quality=84, max_side=1200)
for n in ["prod", "lc", "soc", "combined"]:
    webp(f"unccd_{n}.png", f"unccd/{n}.webp", lossless=True, max_side=1200)
dump({k: U[k] for k in ["years", "annual_mean_ndvi", "shares", "area_ha", "degraded_ha", "sdg_15_3_1",
                        "examples", "classes"]} | {"bounds": U["grid"]["bounds"], "size": [U["grid"]["width"], U["grid"]["height"]]},
     "unccd", "unccd.json")

# ---------------- NFMS ----------------
if os.path.exists(d("nfms", "tiles")):
    shutil.rmtree(d("nfms", "tiles"))
shutil.copytree(os.path.join(SRC, "tiles"), d("nfms", "tiles"))
for p in list(os.walk(d("nfms", "tiles"))):
    for f in p[2]:
        if f.endswith(".png"):
            raise SystemExit("unconverted png tile left: " + f)
nf = json.load(open(os.path.join(SRC, "nfms.json")))
# transparent filler for empty forest tiles (no 404s on the live map) + tile index for the pyramid graphic
blank = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
tiles_root = d("nfms", "tiles")
index = {}
for z in sorted(os.listdir(os.path.join(tiles_root, "relief")), key=int):
    pairs = []
    for x in sorted(os.listdir(os.path.join(tiles_root, "relief", z)), key=int):
        for f in sorted(os.listdir(os.path.join(tiles_root, "relief", z, x)), key=lambda q: int(q.split(".")[0])):
            y = int(f.split(".")[0])
            pairs.append([int(x), y])
            fp = os.path.join(tiles_root, "forest", z, x, f"{y}.webp")
            if not os.path.exists(fp):
                os.makedirs(os.path.dirname(fp), exist_ok=True)
                blank.save(fp, "WEBP", lossless=True)
    index[z] = pairs
nf["tiles"] = index
dump(nf, "nfms", "nfms.json")

# ---------------- GeoFasal ----------------
G = load("geofasal.json")
for i in range(len(G["dates"])):
    webp(f"gf_rgb_{i:02d}.webp", f"geofasal/rgb_{i:02d}.webp", quality=80)
    webp(f"gf_ndvi_{i:02d}.webp", f"geofasal/ndvi_{i:02d}.webp", quality=82)
Image.open(os.path.join(SRC, "gf_fields.png")).save(d("geofasal", "fields.webp"), "WEBP", lossless=True)

def crop_name(c):
    n = np.array(c["ndvi"])
    dates = G["dates"]
    mo = np.array([int(x[5:7]) for x in dates])
    win = np.isin(mo, [12, 1]); feb = np.isin(mo, [2, 3]); spr = np.isin(mo, [4, 5])
    if n.max() < 0.45:
        return "Villages, roads & fallow"
    if n[feb].max() >= 0.65 and n[spr].mean() < n[feb].max() - 0.2:
        return "Wheat"
    if n[win].max() >= 0.6:
        return "Potato or vegetables, then spring crop"
    return "Spring crop (maize)"

for c in G["clusters"]:
    c["name"] = crop_name(c)
for f in G["fields"]:
    f["name"] = G["clusters"][f["cluster"]]["name"]
dump({"dates": G["dates"], "clusters": G["clusters"], "fields": G["fields"], "n_fields": G["n_fields"],
      "size": [G["grid"]["width"], G["grid"]["height"]], "bounds": G["grid"]["bounds"],
      "mean_ndvi": G["mean_ndvi"]}, "geofasal", "geofasal.json")
print("GeoFasal clusters", [(c["name"], c["share"]) for c in G["clusters"]])

# ---------------- Move Smart ----------------
S = load("movesmart.json")
for n in ["lst", "true", "ndvi"]:
    webp(f"ms_{n}.webp", f"movesmart/{n}.webp", quality=82, max_side=1200)
S["size"] = [S["grid"]["width"], S["grid"]["height"]]
S["bounds"] = S["grid"]["bounds"]
del S["grid"]
dump(S, "movesmart", "movesmart.json")

# ---------------- Mottainai ----------------
T = load("mottainai.json")
Image.open(os.path.join(SRC, "mt_water.png")).save(d("mottainai", "water.webp"), "WEBP", lossless=True)
T["size"] = [T["grid"]["width"], T["grid"]["height"]]
del T["grid"]
dump(T, "mottainai", "mottainai.json")

# ---------------- DHA ----------------
shutil.copy(os.path.join(SRC, "dha.json"), d("dha", "dha.json"))

# ================= posters (16:10, 1200x750) =================
def parse(path):
    out = []
    for segm in re.findall(r"M[^M]+", path):
        m = re.match(r"M(-?\d+) (-?\d+)l(.*)", segm)
        x, y = int(m.group(1)), int(m.group(2))
        pts = [(x, y)]
        nums = list(map(int, m.group(3).split()))
        for i in range(0, len(nums), 2):
            x += nums[i]; y += nums[i + 1]; pts.append((x, y))
        out.append(pts)
    return out

PW, PH = 1200, 750


def cover(im, box=None):
    im = im.convert("RGB")
    if box:
        im = im.crop(box)
    r = max(PW / im.width, PH / im.height)
    im = im.resize((math.ceil(im.width * r), math.ceil(im.height * r)), Image.LANCZOS)
    x = (im.width - PW) // 2
    y = (im.height - PH) // 2
    return im.crop((x, y, x + PW, y + PH))


def poster(name, a, b):
    a.save(d("posters", f"{name}_a.webp"), "WEBP", quality=80, method=6)
    b.save(d("posters", f"{name}_b.webp"), "WEBP", quality=82, method=6)


def src(n):
    return Image.open(os.path.join(SRC, n))

# JFREL: imagery -> classified land cover (same crop)
w, hgt = src("jfrel_rgb_2024.webp").size
box = (0, int(hgt * 0.12), w, int(hgt * 0.12) + int(w * PH / PW))
lc_full = src("jfrel_lc_2024.png").convert("RGB").resize((w, hgt), Image.NEAREST)
poster("jfrel", cover(src("jfrel_rgb_2024.webp"), box), cover(lc_full, box))

# UNCCD: imagery -> combined indicator
poster("unccd", cover(src("unccd_rgb_2024.webp")), cover(src("unccd_combined.png")))

# NFMS: relief tiles -> relief + forest tiles (zoom 8 mosaic)
def mosaic(zoom, forest):
    base = os.path.join(SRC, "tiles")
    xs = sorted(int(x) for x in os.listdir(os.path.join(base, "relief", str(zoom))))
    ys_ = sorted({int(f.split(".")[0]) for x in xs for f in os.listdir(os.path.join(base, "relief", str(zoom), str(x)))})
    M_ = Image.new("RGBA", (256 * len(xs), 256 * len(ys_)), (246, 244, 239, 255))
    for i, x in enumerate(xs):
        for j, y in enumerate(ys_):
            p = os.path.join(base, "relief", str(zoom), str(x), f"{y}.webp")
            if not os.path.exists(p):
                continue
            t = Image.open(p).convert("RGBA")
            fp = os.path.join(base, "forest", str(zoom), str(x), f"{y}.webp")
            if forest and os.path.exists(fp):
                t = Image.alpha_composite(t, Image.open(fp).convert("RGBA"))
            M_.paste(t, (i * 256, j * 256))
    return M_

m0, m1 = mosaic(8, False), mosaic(8, True)
bh_ = int(m0.height * 0.62)
bw_ = min(m0.width, int(bh_ * PW / PH))
bx0 = max(0, min(int(m0.width * 0.25), m0.width - bw_))
bx = (bx0, int(m0.height * 0.04), bx0 + bw_, int(m0.height * 0.04) + bh_)
poster("nfms", cover(m0, bx), cover(m1, bx))

# GeoFasal: true colour at peak -> NDVI with field outlines
peak = int(np.argmax(G["mean_ndvi"]))
nd = src(f"gf_ndvi_{peak:02d}.webp").convert("RGBA")
nd = Image.alpha_composite(nd, src("gf_fields.png").convert("RGBA"))
poster("geofasal", cover(src(f"gf_rgb_{peak:02d}.webp")), cover(nd))

# Move Smart: true colour -> LST with both routes
lst = src("ms_lst.webp").convert("RGB").resize(tuple(S["size"]))
dr = ImageDraw.Draw(lst)
for band in S["network"]:
    for l in parse(band):
        dr.line(l, fill=(255, 255, 255), width=1)
for k, col, wd in (("shortest", (27, 34, 32), 7), ("coolest", (255, 255, 255), 11), ("coolest", (20, 110, 90), 7)):
    dr.line([tuple(p) for p in S["routes"][k]["path"]], fill=col, width=wd, joint="curve")
cx, cy = S["routes"]["origin"]
bw, bh = 640, 400
rbox = (max(0, int(cx - bw * 0.6)), max(0, int(cy - bh * 0.35)))
rbox = (min(rbox[0], S["size"][0] - bw), min(rbox[1], S["size"][1] - bh))
rbox = (rbox[0], rbox[1], rbox[0] + bw, rbox[1] + bh)
tc = src("ms_true.webp").convert("RGB").resize(tuple(S["size"]))
poster("movesmart", cover(tc, rbox), cover(lst, rbox))

# Mottainai: roads only -> roads + optimised route + stops
def parse(path):
    out = []
    for segm in re.findall(r"M[^M]+", path):
        m = re.match(r"M(-?\d+) (-?\d+)l(.*)", segm)
        x, y = int(m.group(1)), int(m.group(2))
        pts = [(x, y)]
        nums = list(map(int, m.group(3).split()))
        for i in range(0, len(nums), 2):
            x += nums[i]; y += nums[i + 1]; pts.append((x, y))
        out.append(pts)
    return out

def road_map(route):
    W_, H_ = T["size"]
    im = Image.new("RGB", (W_, H_), (246, 244, 239))
    wat = src("mt_water.png").convert("RGBA")
    im.paste(wat, (0, 0), wat)
    dr = ImageDraw.Draw(im)
    for l in parse(T["roads"]["minor"]):
        dr.line(l, fill=(214, 208, 198), width=2)
    for l in parse(T["roads"]["major"]):
        dr.line(l, fill=(176, 168, 156), width=4)
    if route:
        dr.line([tuple(p) for p in T["optimised"]["path"]], fill=(184, 69, 42), width=7, joint="curve")
        for (x, y) in T["stops"]:
            dr.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(255, 254, 251), outline=(27, 34, 32), width=3)
        x, y = T["depot"]
        dr.rectangle((x - 11, y - 11, x + 11, y + 11), fill=(27, 34, 32))
    return im

poster("mottainai", cover(road_map(False)), cover(road_map(True)))

# DHA: plan view -> axonometric extrusion
D = load("dha.json")
Wd, Hd = D["size"]

def plan():
    sc = 1.6
    im = Image.new("RGB", (int(Wd * sc), int(Hd * sc)), (246, 244, 239))
    dr = ImageDraw.Draw(im)
    for r in D["roads"]:
        dr.line([(x * sc, y * sc) for x, y in r["c"]], fill=(222, 216, 206), width=9 if r["k"] in ("primary", "secondary", "tertiary") else 5)
    for b in D["buildings"]:
        dr.polygon([(x * sc, y * sc) for x, y in b["r"]], fill=(150, 146, 138))
    return im

def axon():
    th = math.radians(-38)
    cx0, cy0 = Wd / 2, Hd / 2
    half = 330  # metres around the centre shown in the poster
    sel = []
    for b in D["buildings"]:
        xs_ = [p[0] for p in b["r"]]; ys__ = [p[1] for p in b["r"]]
        if abs(sum(xs_) / len(xs_) - cx0) < half * 1.3 and abs(sum(ys__) / len(ys__) - cy0) < half:
            sel.append(b)
    def P0(x, y, z=0.0):
        X = (x - cx0) * math.cos(th) - (y - cy0) * math.sin(th)
        Y = (x - cx0) * math.sin(th) + (y - cy0) * math.cos(th)
        return X, Y * 0.55 - z * 1.0
    pts = [P0(x, y) for b in sel for x, y in b["r"]]
    minx = min(p[0] for p in pts); maxx = max(p[0] for p in pts)
    miny = min(p[1] for p in pts) - 30; maxy = max(p[1] for p in pts)
    sc = min(PW / (maxx - minx), PH / (maxy - miny)) * 1.25
    ox = PW / 2 - (minx + maxx) / 2 * sc
    oy = PH / 2 - (miny + maxy) / 2 * sc
    def P(x, y, z=0.0):
        X, Y = P0(x, y, z)
        return X * sc + ox, Y * sc + oy
    im = Image.new("RGB", (PW, PH), (246, 244, 239))
    dr = ImageDraw.Draw(im)
    for r in D["roads"]:
        dr.line([P(x, y) for x, y in r["c"]], fill=(226, 220, 210), width=int(6 * sc / 1.6))
    def depth(b):
        xs_ = [p[0] for p in b["r"]]; ys__ = [p[1] for p in b["r"]]
        return P0(sum(xs_) / len(xs_), sum(ys__) / len(ys__))[1]
    for b in sorted(sel, key=depth):
        h_ = b["h"] or 6.6
        ring = b["r"]
        n = len(ring)
        for i in range(n):
            x0, y0 = ring[i]; x1, y1 = ring[(i + 1) % n]
            quad = [P(x0, y0), P(x1, y1), P(x1, y1, h_), P(x0, y0, h_)]
            ex, ey = P0(x1, y1)[0] - P0(x0, y0)[0], P0(x1, y1)[1] - P0(x0, y0)[1]
            lum = 0.5 + 0.5 * (ey * 0.3 - ex * 0.95) / (math.hypot(ex, ey) + 1e-6)
            c = int(168 + 56 * lum)
            dr.polygon(quad, fill=(c, c - 5, c - 12))
        tall = h_ > 12
        dr.polygon([P(x, y, h_) for x, y in ring], fill=(208, 112, 84) if tall else (252, 250, 246), outline=(150, 142, 130))
    return im

poster("dha", cover(plan()), cover(axon()))
print("posters done")
print("total viz size MB", round(sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(DST) for f in fs) / 1e6, 2))
