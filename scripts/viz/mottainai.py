"""Multi-stop pickup routing on the real Lagos street network (Overture), naive order vs optimised order.

Pickup points are randomly generated (seeded) - an illustration of the method, not company data.
"""
import math
import numpy as np
import networkx as nx
from shapely import wkb
from shapely.geometry import LineString
from shapely.ops import substring
from pyproj import Transformer
from s2lib import Grid, tile_for, find_scenes, read_s2, read_scl, clear_mask, save, dump
import overture as ov

grid = Grid(3.362, 6.512, 7.0, 4.9, res=10)
to_utm = Transformer.from_crs("EPSG:4326", grid.crs, always_xy=True)

def px(x, y):
    return (x - grid.x0) / grid.res, (grid.y0 - y) / grid.res

DRIVE = {"motorway", "trunk", "primary", "secondary", "tertiary", "residential", "unclassified",
         "living_street", "service"}
t = ov.query("transportation", "segment", grid.bounds_ll, columns=["id", "subtype", "class", "connectors", "geometry", "bbox"])
G = nx.Graph()
draw = {"major": [], "minor": []}
for row in t.to_pylist():
    if row["subtype"] != "road" or row["class"] not in DRIVE or not row["connectors"]:
        continue
    geom = wkb.loads(row["geometry"])
    if geom.geom_type != "LineString":
        continue
    xs, ys = to_utm.transform(*zip(*geom.coords))
    line = LineString(zip(xs, ys))
    major = row["class"] in ("motorway", "trunk", "primary", "secondary")
    draw["major" if major else "minor"].append([px(x, y) for x, y in line.coords])
    cons = sorted(row["connectors"], key=lambda c: c["at"])
    for c0, c1 in zip(cons[:-1], cons[1:]):
        if c1["at"] <= c0["at"]:
            continue
        seg = substring(line, c0["at"], c1["at"], normalized=True)
        if seg.length < 1:
            continue
        G.add_edge(c0["connector_id"], c1["connector_id"], length=seg.length,
                   coords=[px(x, y) for x, y in seg.coords])
G = G.subgraph(max(nx.connected_components(G), key=len)).copy()
print("graph", G.number_of_nodes(), G.number_of_edges())

pos = {}
for u, v, d in G.edges(data=True):
    pos.setdefault(u, d["coords"][0]); pos.setdefault(v, d["coords"][-1])
nodes = list(G.nodes)
xy = np.array([pos[n] for n in nodes])

rng = np.random.default_rng(7)
W, H = grid.W, grid.H
def near(x, y):
    return nodes[int(np.argmin(((xy - (x, y)) ** 2).sum(1)))]
# depot near the western edge, pickups spread on a jittered grid
depot = near(W * 0.06, H * 0.55)
stops = []
for gx in range(5):
    for gy in range(3):
        if len(stops) >= 14:
            break
        x = (gx + 0.5 + rng.uniform(-0.3, 0.3)) / 5 * W
        y = (gy + 0.5 + rng.uniform(-0.3, 0.3)) / 3 * H
        stops.append(near(x, y))
stops = list(dict.fromkeys(stops))[:14]
pts = [depot] + stops
N = len(pts)
D = np.zeros((N, N))
P = {}
for i, a in enumerate(pts):
    dist, path = nx.single_source_dijkstra(G, a, weight="length")
    for j, b in enumerate(pts):
        D[i, j] = dist[b]
        P[(i, j)] = path[b]

def tour_len(order):
    return sum(D[a, b] for a, b in zip(order[:-1], order[1:]))

# naive: requests served in the order they arrived (random), returning to depot
naive = [0] + list(rng.permutation(range(1, N))) + [0]
# optimised: nearest neighbour then 2-opt
unv = set(range(1, N)); cur = 0; nn = [0]
while unv:
    nxt = min(unv, key=lambda j: D[cur, j]); nn.append(nxt); unv.remove(nxt); cur = nxt
nn.append(0)
best = nn[:]
improved = True
while improved:
    improved = False
    for i in range(1, N - 1):
        for k in range(i + 1, N):
            cand = best[:i] + best[i:k + 1][::-1] + best[k + 1:]
            if tour_len(cand) < tour_len(best) - 1e-6:
                best, improved = cand, True
print("naive km", round(tour_len(naive) / 1000, 2), "optimised km", round(tour_len(best) / 1000, 2),
      "saving", round(1 - tour_len(best) / tour_len(naive), 3))

def route_coords(order):
    out = []
    for a, b in zip(order[:-1], order[1:]):
        path = P[(a, b)]
        for u, v in zip(path[:-1], path[1:]):
            cs = G[u][v]["coords"]
            if math.dist(cs[0], pos[u]) > math.dist(cs[-1], pos[u]):
                cs = cs[::-1]
            out += cs if not out else cs[1:]
    simp = LineString(out).simplify(0.8)
    return [[round(x, 1), round(y, 1)] for x, y in simp.coords]

def rel_path(lines, tol=0.9):
    out = []
    for cs in lines:
        ls = LineString(cs).simplify(tol)
        p = [(int(round(x)), int(round(y))) for x, y in ls.coords]
        p = [p[0]] + [q for i, q in enumerate(p[1:], 1) if q != p[i - 1]]
        if len(p) < 2:
            continue
        out.append(f"M{p[0][0]} {p[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(p[:-1], p[1:])))
    return "".join(out)

# water mask from Sentinel-2 (MNDWI) for the lagoon
sc = find_scenes(tile_for(grid.lon, grid.lat), ["2024-12", "2025-01"], max_cloud=10, max_nodata=1)
s = max(sc[:6], key=lambda s: clear_mask(read_scl(s, grid.scaled(5))).mean())
b = read_s2(s, ["B03", "B11"], grid)
mndwi = (b["B03"] - b["B11"]) / (b["B03"] + b["B11"] + 1e-6)
from scipy import ndimage
water = ndimage.binary_opening(np.nan_to_num(mndwi) > 0.15, iterations=2)
img = np.zeros((H, W, 4), "uint8")
img[water] = (200, 219, 228, 255)
from PIL import Image
save(Image.fromarray(img), "mt_water.png")

dump({
    "grid": grid.meta(),
    "roads": {"major": rel_path(draw["major"]), "minor": rel_path(draw["minor"], 1.2)},
    "depot": [round(c, 1) for c in pos[depot]],
    "stops": [[round(c, 1) for c in pos[n]] for n in stops],
    "naive": {"order": [int(i) for i in naive], "path": route_coords(naive), "km": tour_len(naive) / 1000},
    "optimised": {"order": [int(i) for i in best], "path": route_coords(best), "km": tour_len(best) / 1000},
}, "mottainai.json")
