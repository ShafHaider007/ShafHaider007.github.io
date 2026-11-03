'use client'

import { type ReactNode, useMemo } from 'react'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { Chip, Count, DemoNote, Figure, Layer, Legend, Wipe } from '@/components/viz/primitives'
import { fmt, seg } from '@/lib/viz'
import { useVizJson } from '@/lib/useVizJson'

type Route = { path: number[][]; length_m: number; heat_c: number; shade: number; profile: number[][] }
type Data = {
  size: [number, number]
  landsat_date: string
  lst_range: [number, number]
  scatter: { ndvi: number[]; lst: number[]; r: number; slope: number; intercept: number }
  uhi_c: number
  routes: { shortest: Route; coolest: Route; origin: number[]; dest: number[]; origin_name: string; dest_name: string }
  network: string[]
  iso: string[]
  iso_bins: number[]
  iso_origin: number[]
  iso_origin_name: string
  weights: { heat: number; shade: number; street: number }
}

const LST_GRAD = 'linear-gradient(90deg,#346094,#78a8be 20%,#e2dec4 35%,#eeba70 50%,#d6703c 65%,#a02824 80%,#60121c)'
const COMFORT = ['#a02824', '#d6703c', '#e2c47c', '#7fae6e', '#2f6b4a']
const ISO = ['#173f5f', '#20639b', '#3c88b8', '#6aa8cc', '#9cc5dc', '#c8dfea']
const COOL = '#1f6e5a'

const toPath = (pts: number[][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('')

export function MoveSmartStory() {
  const d = useVizJson<Data>('movesmart/movesmart.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Graphic d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        Recomputed for this site with open data: Landsat 8 thermal data (27 June 2019) for surface temperature, Sentinel-2 for
        vegetation and the Overture Maps street network for routing. The project also used MODIS, a tree-trunk detection model
        and PostGIS. Its 12 °C heat-island figure comes from that fuller analysis.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  const r = d?.routes
  const extra = r ? (r.coolest.length_m / r.shortest.length_m - 1) * 100 : 0
  return [
    {
      kicker: 'Heat',
      title: 'Surface heat across the city',
      body: (
        <>
          <p>
            Landsat’s thermal band measures the heat given off by the ground. After correcting for how differently surfaces give
            off heat, it gives land-surface temperature on a 30 m grid (the thermal sensor itself sees about 100 m).
          </p>
          <p>
            On a late-June morning the Margalla forest and the green belts are near {d ? Math.round(d.lst_range[0]) : '…'} °C,
            while main roads and dense blocks pass {d ? Math.round(d.lst_range[1]) : '…'} °C.
          </p>
        </>
      ),
    },
    {
      kicker: 'Vegetation',
      title: 'Vegetation and temperature',
      body: (
        <>
          <p>Plotting temperature against vegetation (NDVI) for a sample of pixels shows a clear pattern: greener means cooler.</p>
          <p>
            Recomputed here with open data, the correlation is{' '}
            <strong className="font-semibold text-ink">r = {d ? d.scatter.r.toFixed(2) : '…'}</strong>, about{' '}
            {d ? Math.abs(d.scatter.slope / 10).toFixed(1) : '…'} °C cooler for every 0.1 of NDVI. The project found r = −0.72.
          </p>
        </>
      ),
    },
    {
      kicker: 'Comfort',
      title: 'A comfort score for each street',
      body: (
        <>
          <p>
            Each street segment takes the temperature and vegetation along it. This re-creation combines heat (
            {d ? d.weights.heat * 100 : 50}%), shade ({d ? d.weights.shade * 100 : 30}%) and type of street (
            {d ? d.weights.street * 100 : 20}%) with fixed weights, so footpaths score better than highways. The project derived
            its weights with AHP, the analytic hierarchy process.
          </p>
          <p>
            The routing cost is the length of a street, raised when the street is uncomfortable. A pleasant street can be worth a
            short detour.
          </p>
        </>
      ),
    },
    {
      kicker: 'Routing',
      title: 'Shortest route against coolest route',
      body: (
        <>
          <p>
            From {r?.origin_name ?? 'F-7 Markaz'} to {r?.dest_name ?? 'Faisal Mosque'}, the shortest walk is{' '}
            {r ? fmt(r.shortest.length_m) : '…'} m at an average {r ? r.shortest.heat_c.toFixed(1) : '…'} °C.
          </p>
          <p>
            The coolest is {r ? fmt(r.coolest.length_m) : '…'} m, {Math.round(extra)}% longer, and{' '}
            <strong className="font-semibold text-ink">{r ? (r.shortest.heat_c - r.coolest.heat_c).toFixed(1) : '…'} °C cooler</strong>{' '}
            on average, with {r ? Math.round((r.coolest.shade / r.shortest.shade - 1) * 100) : '…'}% more vegetation along the way.
          </p>
        </>
      ),
    },
    {
      kicker: 'Walking areas',
      title: 'Walking areas from 5 to 30 minutes',
      body: (
        <>
          <p>
            The same street network shows how far you can walk from {d?.iso_origin_name ?? 'F-7 Markaz'} in 5, 10, 15, 20, 25 and
            30 minutes at 4.8 km/h.
          </p>
          <p>The project offered 5 to 30 minute walking areas alongside the routes.</p>
        </>
      ),
    },
  ]
}

function Graphic({ d, s }: { d: Data; s: ScrollState }) {
  const [W, H] = d.size
  const aspect = W / H
  const { step, progress: p } = s
  const lstLegend = (
    <span className="flex items-center gap-2">
      <span>{Math.round(d.lst_range[0])} °C</span>
      <span className="h-2 w-28" style={{ background: LST_GRAD }} />
      <span>{Math.round(d.lst_range[1])} °C</span>
    </span>
  )

  if (step === 0) {
    return (
      <Figure aspect={aspect} footer={<>{lstLegend}<span>Landsat 8 · {d.landsat_date} · 10:42 local</span></>}>
        <Wipe
          t={seg(p, 0.05, 0.7)}
          a={<Layer src="movesmart/true.webp" alt="Sentinel-2 true colour of Islamabad" />}
          b={<Layer src="movesmart/lst.webp" alt="Land-surface temperature of Islamabad" />}
          labelA="True colour"
          labelB="Surface temperature"
        />
      </Figure>
    )
  }

  if (step === 1) return <Scatter d={d} t={seg(p, 0.02, 0.7)} />

  return <NetMap d={d} step={step} p={p} lstLegend={lstLegend} />
}

function bboxOf(pts: number[][]) {
  const xs = pts.map((q) => q[0])
  const ys = pts.map((q) => q[1])
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}

/** Network map shared by the comfort, routing and isochrone steps, so the view can zoom between them. */
function NetMap({ d, step, p, lstLegend }: { d: Data; step: number; p: number; lstLegend: ReactNode }) {
  const [W, H] = d.size
  const r = d.routes
  const zoom = useMemo(() => {
    const fit = (b: number[], pad: number, maxS: number) => {
      const bw = (b[2] - b[0]) * (1 + pad)
      const bh = (b[3] - b[1]) * (1 + pad)
      const s = Math.min(maxS, Math.max(1, Math.min(W / bw, H / bh)))
      const fx = (b[0] + b[2]) / 2 / W
      const fy = (b[1] + b[3]) / 2 / H
      const tx = Math.min(0, Math.max(1 - s, 0.5 - fx * s))
      const ty = Math.min(0, Math.max(1 - s, 0.5 - fy * s))
      return { s, tx, ty }
    }
    const rb = bboxOf([...r.shortest.path, ...r.coolest.path])
    const [ox, oy] = d.iso_origin
    const isoR = 290
    return {
      2: { s: 1, tx: 0, ty: 0 },
      3: fit([rb[0], rb[1], rb[2], rb[3] + (rb[3] - rb[1]) * 0.55], 0.5, 3),
      4: fit([ox - isoR, oy - isoR * 0.8, ox + isoR, oy + isoR * 0.8], 0.15, 2.2),
    } as Record<number, { s: number; tx: number; ty: number }>
  }, [d, W, H, r])
  const z = zoom[step] ?? zoom[2]
  const k = 1 / z.s

  const comfortT = step === 2 ? seg(p, 0.05, 0.6) : 0
  const a = step === 3 ? seg(p, 0.02, 0.45) : step > 3 ? 1 : 0
  const b = step === 3 ? seg(p, 0.3, 0.8) : step > 3 ? 1 : 0
  const isoT = step === 4 ? seg(p, 0.02, 0.75) : 0
  const shown = Math.min(d.iso.length, Math.floor(isoT * (d.iso.length + 0.999)))

  const footer =
    step === 2 ? (
      <>
        <span className="flex items-center gap-2">
          less comfortable
          {COMFORT.map((c) => (
            <span key={c} className="h-2 w-5" style={{ background: c }} />
          ))}
          more
        </span>
        <span>
          weights · heat {d.weights.heat} · shade {d.weights.shade} · street {d.weights.street}
        </span>
      </>
    ) : step === 3 ? (
      <>
        <Legend items={[{ label: `Shortest · ${fmt(r.shortest.length_m)} m`, color: '#1b2220' }, { label: `Coolest · ${fmt(r.coolest.length_m)} m`, color: COOL }]} />
        {lstLegend}
      </>
    ) : (
      <span className="flex items-center gap-1.5">
        {d.iso_bins.map((bin, i) => (
          <span key={bin} className="flex items-center gap-1">
            <span className="h-2 w-4" style={{ background: ISO[i] }} />
            {bin}
          </span>
        ))}
        <span className="ml-1">min at 4.8 km/h</span>
      </span>
    )

  return (
    <Figure
      aspect={W / H}
      footer={footer}
      topRight={
        step === 4 ? (
          <div className="bg-surface/95 px-3 py-2 text-right">
            <div className="font-sans font-medium text-[1.9rem] leading-none text-ink">
              <Count value={shown ? d.iso_bins[shown - 1] : 0} /> min
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">walking from {d.iso_origin_name}</div>
          </div>
        ) : undefined
      }
    >
      <div
        className="absolute inset-0 origin-top-left transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{ transform: `translate(${z.tx * 100}%, ${z.ty * 100}%) scale(${z.s})` }}
      >
        <Layer src="movesmart/lst.webp" alt="Land-surface temperature" className="transition-opacity duration-700" style={{ opacity: step === 3 ? 0.9 : step === 2 ? 0.35 : 0 }} />
        <Layer src="movesmart/true.webp" alt="" className="transition-opacity duration-700" style={{ opacity: step === 4 ? 0.45 : 0, filter: 'grayscale(0.6)' }} />
        <div className="absolute inset-0 bg-surface transition-opacity duration-700" style={{ opacity: step === 2 ? 0.55 : step === 4 ? 0.5 : 0 }} />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
          {d.network.map((dd, i) => (
            <path
              key={i}
              d={dd}
              fill="none"
              stroke={step === 2 ? COMFORT[i] : step === 3 ? '#fffefb' : '#c9c2b4'}
              strokeWidth={(step === 2 ? 1.3 : 0.8) * k}
              opacity={step === 2 ? seg(comfortT, i * 0.12, i * 0.12 + 0.4) : step === 3 ? 0.5 : 1}
              strokeLinecap="round"
            />
          ))}
          {step === 4 &&
            d.iso.map((dd, i) => (
              <path key={i} d={dd} fill="none" stroke={ISO[i]} strokeWidth={2.4 * k} strokeLinecap="round" style={{ transition: 'opacity 400ms' }} opacity={i < shown ? 1 : 0} />
            ))}
          {step === 3 && (
            <>
              <path d={toPath(r.shortest.path)} fill="none" stroke="#fffefb" strokeWidth={9 * k} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - a} />
              <path d={toPath(r.shortest.path)} fill="none" stroke="#1b2220" strokeWidth={5 * k} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - a} />
              <path d={toPath(r.coolest.path)} fill="none" stroke="#fffefb" strokeWidth={9 * k} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - b} />
              <path d={toPath(r.coolest.path)} fill="none" stroke={COOL} strokeWidth={5 * k} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - b} />
              {[
                { q: r.origin, n: r.origin_name },
                { q: r.dest, n: r.dest_name },
              ].map(({ q, n }, i) => (
                <g key={n} transform={`translate(${q[0]} ${q[1]})`}>
                  <circle r={8 * k} fill="#fffefb" stroke="#1b2220" strokeWidth={3 * k} />
                  <text x={(i ? -13 : 13) * k} y={-11 * k} textAnchor={i ? 'end' : 'start'} fontSize={14 * k} className="fill-ink font-sans" stroke="#fffefb" strokeWidth={4 * k} paintOrder="stroke">
                    {n}
                  </text>
                </g>
              ))}
            </>
          )}
          {step === 4 && (
            <g transform={`translate(${d.iso_origin[0]} ${d.iso_origin[1]})`}>
              <circle r={18 * k} fill="#173f5f" opacity={0.15} />
              <circle r={8 * k} fill="#fffefb" stroke="#173f5f" strokeWidth={3 * k} />
            </g>
          )}
        </svg>
      </div>
      {step === 3 && (
        <div className="absolute inset-x-2 bottom-2 hidden sm:block">
          <Profile d={d} a={a} b={b} />
        </div>
      )}
    </Figure>
  )
}

function Scatter({ d, t }: { d: Data; t: number }) {
  const W = 620
  const H = 470
  const m = { l: 52, r: 18, t: 18, b: 44 }
  const x0 = -0.1, x1 = 0.8
  const y0 = 28, y1 = 46
  const X = (v: number) => m.l + ((v - x0) / (x1 - x0)) * (W - m.l - m.r)
  const Y = (v: number) => H - m.b - ((v - y0) / (y1 - y0)) * (H - m.t - m.b)
  const n = Math.floor(d.scatter.ndvi.length * seg(t, 0, 0.7))
  const lt = seg(t, 0.65, 1)
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1 border border-ink/70 bg-surface p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="Scatter of NDVI against land-surface temperature">
          {[30, 34, 38, 42, 46].map((v) => (
            <g key={v}>
              <line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#e1ddd3" />
              <text x={m.l - 8} y={Y(v) + 4} textAnchor="end" fontSize={11} className="fill-ink-3 font-mono">
                {v}°
              </text>
            </g>
          ))}
          {[0, 0.2, 0.4, 0.6, 0.8].map((v) => (
            <text key={v} x={X(v)} y={H - m.b + 18} textAnchor="middle" fontSize={11} className="fill-ink-3 font-mono">
              {v.toFixed(1)}
            </text>
          ))}
          <text x={(m.l + W - m.r) / 2} y={H - 6} textAnchor="middle" fontSize={11.5} className="fill-ink-2 font-sans">
            NDVI (vegetation)
          </text>
          <text x={14} y={(m.t + H - m.b) / 2} textAnchor="middle" fontSize={11.5} transform={`rotate(-90 14 ${(m.t + H - m.b) / 2})`} className="fill-ink-2 font-sans">
            Land-surface temperature
          </text>
          {d.scatter.ndvi.slice(0, n).map((v, i) => {
            const T = d.scatter.lst[i]
            const k = Math.max(0, Math.min(1, (T - 31) / 13))
            const c = `hsl(${210 - 200 * k} ${45 + 20 * k}% ${48 - 6 * k}%)`
            return <circle key={i} cx={X(v)} cy={Y(T)} r={2} fill={c} opacity={0.55} />
          })}
          <line
            x1={X(x0)}
            y1={Y(d.scatter.intercept + d.scatter.slope * x0)}
            x2={X(x0 + (x1 - x0) * lt)}
            y2={Y(d.scatter.intercept + d.scatter.slope * (x0 + (x1 - x0) * lt))}
            stroke="#1b2220"
            strokeWidth={2}
          />
        </svg>
        <div className="absolute right-6 top-6 bg-surface/95 px-3 py-2 text-right" style={{ opacity: lt }}>
          <div className="font-sans font-medium text-[2rem] leading-none text-ink">r = {d.scatter.r.toFixed(2)}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">{d.scatter.ndvi.length.toLocaleString()} pixels</div>
        </div>
      </div>
      <div className="pt-2.5 font-mono text-[11px] text-ink-3">Random sample of non-water pixels, 30 m · least-squares fit</div>
    </div>
  )
}

function Profile({ d, a, b }: { d: Data; a: number; b: number }) {
  const W = 600
  const H = 96
  const sp = d.routes.shortest.profile
  const cp = d.routes.coolest.profile
  const maxD = Math.max(sp[sp.length - 1][0], cp[cp.length - 1][0])
  const temps = [...sp, ...cp].map((p) => p[1]).filter(Number.isFinite)
  const t0 = Math.floor(Math.min(...temps)) - 0.5
  const t1 = Math.ceil(Math.max(...temps)) + 0.5
  const X = (v: number) => 34 + (v / maxD) * (W - 44)
  const Y = (v: number) => 8 + (1 - (v - t0) / (t1 - t0)) * (H - 26)
  const line = (pr: number[][]) => pr.filter((q) => Number.isFinite(q[1])).map((q, i) => `${i ? 'L' : 'M'}${X(q[0])} ${Y(q[1])}`).join('')
  return (
    <div className="border border-line bg-surface px-3 pb-2 pt-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[86px] w-full">
        {[t0 + 0.5, (t0 + t1) / 2, t1 - 0.5].map((v) => (
          <g key={v}>
            <line x1={34} x2={W - 10} y1={Y(v)} y2={Y(v)} stroke="#eeeae1" />
            <text x={28} y={Y(v) + 4} textAnchor="end" fontSize={10} className="fill-ink-3 font-mono">
              {v.toFixed(0)}°
            </text>
          </g>
        ))}
        <path d={line(sp)} fill="none" stroke="#1b2220" strokeWidth={1.6} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - a} />
        <path d={line(cp)} fill="none" stroke={COOL} strokeWidth={2} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - b} />
        <text x={W - 10} y={H - 4} textAnchor="end" fontSize={10} className="fill-ink-3 font-mono">
          {fmt(maxD)} m
        </text>
      </svg>
      <div className="flex flex-wrap gap-x-5 font-mono text-[11px] text-ink-3">
        <span>Temperature along each route</span>
        <span className="text-ink">shortest {d.routes.shortest.heat_c.toFixed(1)} °C</span>
        <span style={{ color: COOL }}>coolest {d.routes.coolest.heat_c.toFixed(1)} °C</span>
        <Chip className="ml-auto !bg-transparent !p-0 normal-case tracking-normal">
          {Math.round((d.routes.coolest.shade / d.routes.shortest.shade - 1) * 100)}% more shade
        </Chip>
      </div>
    </div>
  )
}
