"""Building footprints + streets for a DHA Lahore neighbourhood from Overture Maps (for an axonometric view)."""
import numpy as np
from shapely import wkb
from shapely.geometry import box, shape, mapping
from shapely.ops import transform
from pyproj import Transformer
from s2lib import Grid, dump
import overture as ov

grid = Grid(74.4005, 31.4735, 1.5, 1.05, res=1)
to_utm = Transformer.from_crs("EPSG:4326", grid.crs, always_xy=True).transform
frame = box(grid.x0, grid.y0 - grid.H, grid.x0 + grid.W, grid.y0)

def local(geom):
    g = transform(to_utm, geom)
    return transform(lambda x, y: (x - grid.x0, grid.y0 - y), g)

b = ov.query("buildings", "building", grid.bounds_ll,
             columns=["id", "geometry", "bbox", "height", "num_floors", "class", "subtype"])
rows = b.to_pylist() if b is not None else []
blds = []
for r in rows:
    g = wkb.loads(r["geometry"])
    g = transform(to_utm, g)
    if not g.intersects(frame) or g.area < 25:
        continue
    g = g.intersection(frame)
    polys = [g] if g.geom_type == "Polygon" else [p for p in getattr(g, "geoms", []) if p.geom_type == "Polygon"]
    for p in polys:
        p = p.simplify(0.6)
        ring = [(round(x - grid.x0, 1), round(grid.y0 - y, 1)) for x, y in p.exterior.coords][:-1]
        if len(ring) < 3:
            continue
        h = r["height"] or ((r["num_floors"] or 0) * 3.3) or None
        blds.append({"r": ring, "h": round(float(h), 1) if h else None, "a": round(p.area)})
print("buildings", len(blds), "with height", sum(1 for x in blds if x["h"]))

s = ov.query("transportation", "segment", grid.bounds_ll, columns=["id", "subtype", "class", "geometry", "bbox"])
roads = []
for r in s.to_pylist():
    if r["subtype"] != "road":
        continue
    g = transform(to_utm, wkb.loads(r["geometry"])).intersection(frame)
    lines = [g] if g.geom_type == "LineString" else [l for l in getattr(g, "geoms", []) if l.geom_type == "LineString"]
    for l in lines:
        if l.length < 5:
            continue
        roads.append({"c": [[round(x - grid.x0, 1), round(grid.y0 - y, 1)] for x, y in l.simplify(0.8).coords],
                      "k": r["class"]})
print("roads", len(roads))
dump({"size": [grid.W, grid.H], "buildings": blds, "roads": roads, "bounds": grid.bounds_ll}, "dha.json")
