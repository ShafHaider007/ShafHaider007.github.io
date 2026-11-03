"""Heat-aware pedestrian routing demo for Islamabad.

- Land-surface temperature: Landsat 8 band 10 (27 Jun 2019), single-channel with NDVI-based emissivity.
- Vegetation: NDVI (Landsat bands 4/5 for the scatter; Sentinel-2 for the 10 m display layer).
- Network: Overture Maps transportation segments split at connectors.
- Comfort cost: AHP-style weights on heat, shade and street type; shortest vs coolest route; isochrones.
"""
import json, math, re
import numpy as np
import networkx as nx
from shapely import wkb
from shapely.geometry import LineString, Point
from shapely.ops import substring
from rasterio.enums import Resampling
from s2lib import Grid, read_url, find_scenes, read_s2, read_scl, clear_mask, true_colour, to_img, ramp, save, dump, get
import overture as ov

grid = Grid(73.050, 33.709, 10.0, 7.0, res=10)
g30 = grid.scaled(3)
LS = "https://storage.googleapis.com/gcp-public-data-landsat/LC08/01/150/037/LC08_L1TP_150037_20190627_20190705_01_T1/"
SID = "LC08_L1TP_150037_20190627_20190705_01_T1"
mtl = get(LS + SID + "_MTL.txt").decode()
def mval(k):
    return float(re.search(rf"{k} = ([-0-9.E+]+)", mtl).group(1))

# ---- LST ----
def band(n, g, res=Resampling.bilinear):
    return read_url(f"{LS}{SID}_B{n}.TIF", g, resampling=res)

b10 = band(10, g30)
rad = mval("RADIANCE_MULT_BAND_10") * b10 + mval("RADIANCE_ADD_BAND_10")
bt = mval("K2_CONSTANT_BAND_10") / np.log(mval("K1_CONSTANT_BAND_10") / rad + 1)
sun = math.radians(mval("SUN_ELEVATION"))
def toa(n):
    dn = band(n, g30)
    r = (mval(f"REFLECTANCE_MULT_BAND_{n}") * dn + mval(f"REFLECTANCE_ADD_BAND_{n}")) / math.sin(sun)
    r[dn == 0] = np.nan
    return r
red, nir = toa(4), toa(5)
ndvi30 = (nir - red) / (nir + red + 1e-6)
pv = np.clip((ndvi30 - 0.2) / (0.5 - 0.2), 0, 1) ** 2
emis = np.where(ndvi30 < 0.2, 0.973, np.where(ndvi30 > 0.5, 0.99, 0.004 * pv + 0.986))
lam, rho = 10.895e-6, 1.438e-2
lst = bt / (1 + (lam * bt / rho) * np.log(emis)) - 273.15
lst[(b10 == 0) | ~np.isfinite(lst)] = np.nan
water = ndvi30 < 0.0
print("LST range", np.nanpercentile(lst, [1, 50, 99]).round(1))

lst_stops = [(30, (52, 96, 148)), (34, (120, 168, 190)), (37, (226, 222, 196)), (40, (238, 186, 112)),
             (43, (214, 112, 60)), (46, (160, 40, 36)), (50, (96, 18, 28))]
lst_img = ramp(lst, lst_stops)
from PIL import Image
lst_big = Image.fromarray(lst_img).resize((grid.W, grid.H), Image.BICUBIC)
save(lst_big, "ms_lst.webp", quality=86, max_side=1600)

# scatter sample (non-water pixels)
rng = np.random.default_rng(3)
ok = np.isfinite(lst) & np.isfinite(ndvi30) & ~water
ii = rng.choice(np.flatnonzero(ok.ravel()), size=2400, replace=False)
sx, sy = ndvi30.ravel()[ii], lst.ravel()[ii]
r = float(np.corrcoef(ndvi30[ok], lst[ok])[0, 1])
slope, icpt = np.polyfit(ndvi30[ok], lst[ok], 1)
uhi = float(np.nanpercentile(lst[ok], 95) - np.nanpercentile(lst[ok & (ndvi30 > 0.5)], 50))
print("r(NDVI,LST)", round(r, 3), "slope", round(slope, 2), "UHI proxy", round(uhi, 1))

# ---- Sentinel-2 display layers (summer 2019) ----
scenes = find_scenes("43SCT", ["2019-06", "2019-07"], max_cloud=5, max_nodata=1)
best = max(scenes[:8], key=lambda s: clear_mask(read_scl(s, grid.scaled(6))).mean())
b = read_s2(best, ["B02", "B03", "B04", "B08"], grid)
save(to_img(true_colour(b, gain=2.5, sat=1.1)), "ms_true.webp", quality=84, max_side=1600)
ndvi10 = (b["B08"] - b["B04"]) / (b["B08"] + b["B04"] + 1e-6)
ndvi_stops = [(-0.2, (120, 150, 172)), (0.0, (214, 208, 190)), (0.15, (226, 214, 170)), (0.3, (208, 210, 130)),
              (0.45, (150, 184, 98)), (0.6, (84, 142, 72)), (0.8, (30, 86, 48))]
save(ramp(ndvi10, ndvi_stops), "ms_ndvi.webp", quality=84, max_side=1600)

# ---- network ----
t = ov.query("transportation", "segment", grid.bounds_ll,
             columns=["id", "subtype", "class", "connectors", "geometry", "bbox", "names"])
rows = t.to_pylist()
WALK = {"primary", "secondary", "tertiary", "residential", "living_street", "unclassified", "service",
        "pedestrian", "footway", "path", "steps", "cycleway", "track", "trunk"}
CLASS_COMFORT = {"footway": 1.0, "pedestrian": 1.0, "path": 0.95, "living_street": 0.9, "residential": 0.85,
                 "service": 0.75, "unclassified": 0.75, "tertiary": 0.6, "track": 0.7, "cycleway": 0.9,
                 "steps": 0.7, "secondary": 0.45, "primary": 0.35, "trunk": 0.25}

from pyproj import Transformer
to_utm = Transformer.from_crs("EPSG:4326", grid.crs, always_xy=True)

def px(x, y):
    return (x - grid.x0) / grid.res, (grid.y0 - y) / grid.res

def sample(arr, g, xs, ys):
    c = np.clip(((np.array(xs) - g.x0) / g.res).astype(int), 0, g.W - 1)
    r_ = np.clip(((g.y0 - np.array(ys)) / g.res).astype(int), 0, g.H - 1)
    return arr[r_, c]

G = nx.Graph()
edges_out = []
for row in rows:
    if row["subtype"] != "road" or row["class"] not in WALK or not row["connectors"]:
        continue
    geom = wkb.loads(row["geometry"])
    if geom.geom_type != "LineString":
        continue
    xs, ys = to_utm.transform(*zip(*geom.coords))
    line = LineString(zip(xs, ys))
    cons = sorted(row["connectors"], key=lambda c: c["at"])
    for c0, c1 in zip(cons[:-1], cons[1:]):
        if c1["at"] - c0["at"] <= 0:
            continue
        seg = substring(line, c0["at"], c1["at"], normalized=True)
        L = seg.length
        if L < 1:
            continue
        n = max(2, int(L // 15) + 1)
        pts = [seg.interpolate(i / (n - 1), normalized=True) for i in range(n)]
        px_, py_ = [p.x for p in pts], [p.y for p in pts]
        heat = float(np.nanmean(sample(lst, g30, px_, py_)))
        shade = float(np.nanmean(sample(np.nan_to_num(ndvi10), grid, px_, py_)))
        G.add_edge(c0["connector_id"], c1["connector_id"], length=L, heat=heat, shade=shade,
                   cls=row["class"], coords=[px(x, y) for x, y in seg.coords],
                   name=(row["names"] or {}).get("primary") if row["names"] else None)
print("graph", G.number_of_nodes(), "nodes", G.number_of_edges(), "edges")
G = G.subgraph(max(nx.connected_components(G), key=len)).copy()
print("largest component", G.number_of_nodes(), G.number_of_edges())

heats = np.array([d["heat"] for *_, d in G.edges(data=True)])
h0, h1 = np.nanpercentile(heats, [5, 95])
for u, v, d in G.edges(data=True):
    hn = np.clip((d["heat"] - h0) / (h1 - h0), 0, 1) if np.isfinite(d["heat"]) else 0.5
    sn = np.clip((d["shade"] - 0.1) / (0.6 - 0.1), 0, 1)
    comfort = 0.5 * (1 - hn) + 0.3 * sn + 0.2 * CLASS_COMFORT.get(d["cls"], 0.6)  # AHP-style weights
    d["comfort"] = float(comfort)
    d["cost"] = d["length"] * (1 + 2.2 * (1 - comfort))
    d["minutes"] = d["length"] / (4.8 * 1000 / 60)

# ---- pick an illustrative trip: coolest route much cooler but not much longer ----
nodes = list(G.nodes)
pos = {}
for u, v, d in G.edges(data=True):
    pos.setdefault(u, d["coords"][0]); pos.setdefault(v, d["coords"][-1])
def route_stats(path):
    L = sum(G[a][b]["length"] for a, b in zip(path[:-1], path[1:]))
    hw = sum(G[a][b]["heat"] * G[a][b]["length"] for a, b in zip(path[:-1], path[1:])) / L
    sw = sum(G[a][b]["shade"] * G[a][b]["length"] for a, b in zip(path[:-1], path[1:])) / L
    return L, hw, sw

PLACES = {
    "F-7 Markaz": (73.0560, 33.7208), "F-9 Park": (73.0248, 33.7003), "G-9 Markaz": (73.0300, 33.6894),
    "F-6 Supermarket": (73.0750, 33.7290), "F-8 Markaz": (73.0420, 33.7095), "Faisal Mosque": (73.0372, 33.7295),
    "G-7 Markaz": (73.0640, 33.6960), "Blue Area": (73.0700, 33.7120), "G-8 Markaz": (73.0480, 33.6955),
}
node_xy = np.array([pos[n] for n in nodes])
def nearest(lon, lat):
    x, y = to_utm.transform(lon, lat)
    p_ = np.array(px(x, y))
    return nodes[int(np.argmin(((node_xy - p_) ** 2).sum(1)))]
place_node = {k: nearest(*v) for k, v in PLACES.items()}
cands = []
names_ = list(PLACES)
for i, pa_ in enumerate(names_):
    for pb in names_[i + 1:]:
        a, b_ = place_node[pa_], place_node[pb]
        try:
            sp = nx.shortest_path(G, a, b_, weight="length")
            cp = nx.shortest_path(G, a, b_, weight="cost")
        except nx.NetworkXNoPath:
            continue
        Ls, hs, ss = route_stats(sp)
        Lc, hc, sc = route_stats(cp)
        if Ls < 1800 or Ls > 4500 or Lc > Ls * 1.2:
            continue
        score = (hs - hc) + 2 * (sc - ss) - 4 * max(0, Lc / Ls - 1.1)
        cands.append((score, pa_, pb, Ls, hs, ss, Lc, hc, sc, sp, cp))
cands.sort(key=lambda c: -c[0])
for c in cands[:6]:
    print(f"{c[1]} -> {c[2]}: shortest {c[3]:.0f} m {c[4]:.1f}C shade {c[5]:.2f} | coolest {c[6]:.0f} m {c[7]:.1f}C shade {c[8]:.2f}")
_, A_NAME, B_NAME, Ls, hs, ss, Lc, hc, sc, sp, cp = cands[0]
a, b_ = place_node[A_NAME], place_node[B_NAME]
print("chosen", A_NAME, "->", B_NAME)

def path_coords(path):
    out = []
    for u, v in zip(path[:-1], path[1:]):
        cs = G[u][v]["coords"]
        if math.dist(cs[0], pos[u]) > math.dist(cs[-1], pos[u]):
            cs = cs[::-1]
        out += cs if not out else cs[1:]
    return [[round(x, 1), round(y, 1)] for x, y in out]

def profile(path):
    dist, outp = 0.0, []
    for u, v in zip(path[:-1], path[1:]):
        d = G[u][v]
        outp.append([round(dist), round(d["heat"], 2)])
        dist += d["length"]
        outp.append([round(dist), round(d["heat"], 2)])
    return outp

# ---- isochrones from the trip origin ----
ISO_NAME = "F-7 Markaz"
iso_origin = place_node[ISO_NAME]
times = nx.single_source_dijkstra_path_length(G, iso_origin, cutoff=30, weight="minutes")
def rel_path(coords_list, tol=0.8):
    """Encode many polylines as one SVG path with integer, relative coordinates."""
    out = []
    for cs in coords_list:
        ls = LineString(cs).simplify(tol)
        pts = [(int(round(x)), int(round(y))) for x, y in ls.coords]
        dd = [pts[0]] + [p for i, p in enumerate(pts[1:], 1) if p != pts[i - 1]]
        if len(dd) < 2:
            continue
        seg = f"M{dd[0][0]} {dd[0][1]}" + "l" + " ".join(f"{x1 - x0} {y1 - y0}" for (x0, y0), (x1, y1) in zip(dd[:-1], dd[1:]))
        out.append(seg)
    return "".join(out)

# network grouped by comfort quintile (for the comfort-score step)
comforts = np.array([d["comfort"] for *_, d in G.edges(data=True)])
qs = np.quantile(comforts, [0.2, 0.4, 0.6, 0.8])
net_bins = [[] for _ in range(5)]
for u, v, d in G.edges(data=True):
    net_bins[int(np.searchsorted(qs, d["comfort"]))].append(d["coords"])
net = [rel_path(bn) for bn in net_bins]

ISO_BINS = [5, 10, 15, 20, 25, 30]
iso_bins = [[] for _ in ISO_BINS]
for u, v, d in G.edges(data=True):
    if u in times and v in times:
        t0 = max(times[u], times[v])
        k = int(np.searchsorted(ISO_BINS, t0))
        if k < len(ISO_BINS):
            iso_bins[k].append(d["coords"])
iso = [rel_path(bn) for bn in iso_bins]
iso_xy = [round(c, 1) for c in pos[iso_origin]]

dump({
    "grid": grid.meta(), "landsat": SID, "landsat_date": "2019-06-27", "s2_scene": best["id"],
    "lst_range": [float(np.nanpercentile(lst, 2)), float(np.nanpercentile(lst, 98))],
    "scatter": {"ndvi": np.round(sx, 3).tolist(), "lst": np.round(sy, 2).tolist(), "r": r,
                "slope": float(slope), "intercept": float(icpt)},
    "uhi_c": uhi,
    "routes": {
        "shortest": {"path": path_coords(sp), "length_m": Ls, "heat_c": hs, "shade": ss, "profile": profile(sp)},
        "coolest": {"path": path_coords(cp), "length_m": Lc, "heat_c": hc, "shade": sc, "profile": profile(cp)},
        "origin": [round(c, 1) for c in pos[a]], "dest": [round(c, 1) for c in pos[b_]],
        "origin_name": A_NAME, "dest_name": B_NAME,
    },
    "network": net, "network_quintiles": qs.round(3).tolist(), "iso": iso, "iso_bins": ISO_BINS,
    "iso_origin": iso_xy, "iso_origin_name": ISO_NAME,
    "places": {k: [round(c, 1) for c in pos[n]] for k, n in place_node.items()},
    "weights": {"heat": 0.5, "shade": 0.3, "street": 0.2},
}, "movesmart.json")
print("net path chars", sum(len(x) for x in net), "iso chars", sum(len(x) for x in iso))
