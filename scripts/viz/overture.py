"""Read Overture Maps GeoParquet for a bbox via plain HTTP range requests (no DuckDB extensions needed)."""
import io, json, os, re, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
import pyarrow.parquet as pq
import pyarrow as pa

BASE = "https://overturemaps-us-west-2.s3.us-west-2.amazonaws.com"
RELEASE = "2026-10-21.0"
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
os.makedirs(CACHE, exist_ok=True)


class RangeFile(io.RawIOBase):
    """Seekable read-only file over HTTP Range requests with a small block cache."""

    BLOCK = 1 << 20

    def __init__(self, url, size):
        self.url, self.size, self.pos, self.cache = url, size, 0, {}

    def readable(self):
        return True

    def seekable(self):
        return True

    def tell(self):
        return self.pos

    def seek(self, off, whence=0):
        self.pos = off if whence == 0 else (self.pos + off if whence == 1 else self.size + off)
        return self.pos

    def _fetch(self, start, end):
        req = urllib.request.Request(self.url, headers={"Range": f"bytes={start}-{end - 1}"})
        for attempt in range(4):
            try:
                with urllib.request.urlopen(req, timeout=120) as r:
                    return r.read()
            except Exception:
                if attempt == 3:
                    raise

    def read(self, n=-1):
        if n < 0:
            n = self.size - self.pos
        n = max(0, min(n, self.size - self.pos))
        if n == 0:
            return b""
        start, end = self.pos, self.pos + n
        if n > 4 * self.BLOCK:  # big reads go straight through
            data = self._fetch(start, end)
        else:
            b0, b1 = start // self.BLOCK, (end - 1) // self.BLOCK
            parts = []
            for b in range(b0, b1 + 1):
                if b not in self.cache:
                    s = b * self.BLOCK
                    self.cache[b] = self._fetch(s, min(self.size, s + self.BLOCK))
                parts.append(self.cache[b])
            buf = b"".join(parts)
            off = start - b0 * self.BLOCK
            data = buf[off:off + n]
        self.pos = end
        return data

    def readinto(self, b):
        d = self.read(len(b))
        b[:len(d)] = d
        return len(d)


def list_files(theme, typ):
    out, token = [], None
    prefix = f"release/{RELEASE}/theme={theme}/type={typ}/"
    while True:
        u = f"{BASE}/?list-type=2&prefix={prefix}" + (f"&continuation-token={urllib.parse.quote(token)}" if token else "")
        x = urllib.request.urlopen(u, timeout=60).read().decode()
        out += list(zip(re.findall(r"<Key>([^<]+)</Key>", x), map(int, re.findall(r"<Size>(\d+)</Size>", x))))
        m = re.search(r"<NextContinuationToken>([^<]+)</NextContinuationToken>", x)
        if not m:
            return out
        token = m.group(1)


def _bbox_stats(md, rg):
    """Return (xmin_min, xmax_max, ymin_min, ymax_max) of a row group from column statistics."""
    vals = {}
    row = md.row_group(rg)
    for ci in range(row.num_columns):
        col = row.column(ci)
        p = col.path_in_schema
        if p in ("bbox.xmin", "bbox.xmax", "bbox.ymin", "bbox.ymax") and col.statistics is not None:
            vals[p] = (col.statistics.min, col.statistics.max)
    if len(vals) < 4:
        return None
    return vals["bbox.xmin"][0], vals["bbox.xmax"][1], vals["bbox.ymin"][0], vals["bbox.ymax"][1]


def footer_index(theme, typ):
    """Cache per-row-group bbox stats for all files of a type (one footer read per file)."""
    path = os.path.join(CACHE, f"index_{RELEASE}_{theme}_{typ}.json")
    if os.path.exists(path):
        return json.load(open(path))
    files = list_files(theme, typ)

    def one(kv):
        key, size = kv
        f = RangeFile(f"{BASE}/{key}", size)
        md = pq.ParquetFile(f).metadata
        return key, size, [_bbox_stats(md, i) for i in range(md.num_row_groups)]

    with ThreadPoolExecutor(16) as ex:
        idx = list(ex.map(one, files))
    json.dump(idx, open(path, "w"))
    return idx


def query(theme, typ, bbox, columns=None):
    """bbox = (minx, miny, maxx, maxy). Returns a pyarrow Table of rows whose bbox intersects."""
    x0, y0, x1, y1 = bbox
    idx = footer_index(theme, typ)
    jobs = []
    for key, size, stats in idx:
        rgs = [i for i, s in enumerate(stats) if s and not (s[1] < x0 or s[0] > x1 or s[3] < y0 or s[2] > y1)]
        if rgs:
            jobs.append((key, size, rgs))
    print(f"{typ}: {sum(len(r) for _, _, r in jobs)} row groups in {len(jobs)} files")

    def read(job):
        key, size, rgs = job
        pf = pq.ParquetFile(RangeFile(f"{BASE}/{key}", size))
        t = pf.read_row_groups(rgs, columns=columns)
        b = t.column("bbox").combine_chunks()
        xmin = b.field("xmin").to_numpy(zero_copy_only=False)
        xmax = b.field("xmax").to_numpy(zero_copy_only=False)
        ymin = b.field("ymin").to_numpy(zero_copy_only=False)
        ymax = b.field("ymax").to_numpy(zero_copy_only=False)
        keep = ~((xmax < x0) | (xmin > x1) | (ymax < y0) | (ymin > y1))
        return t.filter(pa.array(keep))

    with ThreadPoolExecutor(6) as ex:
        tables = [t for t in ex.map(read, jobs) if t.num_rows]
    return pa.concat_tables(tables, promote_options="default") if tables else None
