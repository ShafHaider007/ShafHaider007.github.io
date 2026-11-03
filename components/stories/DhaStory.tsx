'use client'

import { type PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { DemoNote, Fit } from '@/components/viz/primitives'
import { fmt, seg, useVizJson } from '@/lib/viz'

type Bld = { r: number[][]; h: number | null; a: number }
type Data = { size: [number, number]; buildings: Bld[]; roads: { c: number[][]; k: string }[] }

export function DhaStory() {
  const d = useVizJson<Data>('dha/dha.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Axon d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        Building footprints and streets for a 1.5 × 1.05 km neighbourhood of DHA Lahore from Overture Maps (heights
        where available, otherwise two storeys). It illustrates the kind of map-first search the platforms provide; the
        platforms themselves use DHA’s verified plot records, which are not shown here.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  return [
    {
      kicker: 'Footprints',
      title: 'Every plot is a geometry',
      body: (
        <>
          <p>
            A property platform starts from geometry: {d ? fmt(d.buildings.length) : '…'} building footprints in this
            one neighbourhood, each tied to a record. Map-first search means the parcel, not a listing, is the entry
            point.
          </p>
        </>
      ),
    },
    {
      kicker: '3D',
      title: 'Lifted into the third dimension',
      body: (
        <>
          <p>
            Extruding footprints by height turns the plan into a city block buyers recognise. Commercial blocks stand out
            from the two-storey houses around them.
          </p>
        </>
      ),
    },
    {
      kicker: 'Spatial search',
      title: 'Search by distance, not by list',
      body: (
        <>
          <p>
            “Show me plots within 250 m of this park” is a spatial query. As the search radius grows, the matching
            buildings light up and the count updates, the same kind of query the platforms run against verified
            records.
          </p>
        </>
      ),
    },
    {
      kicker: 'Records',
      title: 'Click a plot, see its record',
      body: (
        <>
          <p>
            Hover or tap any building to open its card. In production the card links to verified ownership records,
            seller dashboards and realtor workflows; here it shows what the geometry alone can tell you.
          </p>
        </>
      ),
    },
  ]
}

function Axon({ d, s }: { d: Data; s: ScrollState }) {
  const { step, progress: p } = s
  const pitch = step === 0 ? 0 : step === 1 ? seg(p, 0.05, 0.7) : 1
  const lift = step === 0 ? 0 : step === 1 ? seg(p, 0.25, 0.85) : 1
  const radius = step === 2 ? 40 + 260 * seg(p, 0.05, 0.75) : step === 3 ? 300 : 0
  const [W, H] = d.size
  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1 border border-ink/80 bg-surface p-[5px]">
        <Fit aspect={W / H}>
          <Canvas d={d} pitch={pitch} lift={lift} radius={radius} interactive={step >= 2} />
        </Fit>
      </div>
      <div className="flex justify-between pt-2.5 font-mono text-[10.5px] text-ink-3">
        <span>Overture Maps buildings · DHA Lahore</span>
        <span>{step >= 2 ? `search radius ${Math.round(radius)} m` : step === 1 ? 'extruded by height · 2× vertical' : 'plan view'}</span>
      </div>
    </div>
  )
}

function Canvas({ d, pitch, lift, radius, interactive }: { d: Data; pitch: number; lift: number; radius: number; interactive: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<{ i: number; x: number; y: number } | null>(null)
  const [W, H] = d.size
  const centre = useMemo(() => {
    // centre the search on the largest open block near the middle (approximated by the frame centre)
    return [W * 0.52, H * 0.55]
  }, [W, H])
  const cent = useMemo(
    () =>
      d.buildings.map((b) => {
        const xs = b.r.map((q) => q[0])
        const ys = b.r.map((q) => q[1])
        return [xs.reduce((a, v) => a + v, 0) / xs.length, ys.reduce((a, v) => a + v, 0) / ys.length]
      }),
    [d],
  )
  const inside = useMemo(() => cent.map(([x, y]) => Math.hypot(x - centre[0], y - centre[1]) <= radius), [cent, centre, radius])
  const count = inside.filter(Boolean).length
  const proj = useRef<(x: number, y: number, z?: number) => [number, number]>(() => [0, 0])

  useEffect(() => {
    const cv = ref.current
    const box = wrap.current
    if (!cv || !box) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const cw = box.clientWidth
    const ch = box.clientHeight
    cv.width = cw * dpr
    cv.height = ch * dpr
    cv.style.width = `${cw}px`
    cv.style.height = `${ch}px`
    const ctx = cv.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cw, ch)

    const th = (-38 * Math.PI) / 180 * pitch
    const squash = 1 - 0.45 * pitch
    const zs = 2.0 * pitch * lift // 2x vertical exaggeration in 3D
    const cx = W / 2
    const cy = H / 2
    const sc = Math.min(cw / W, ch / H) * (1 + 0.85 * pitch)
    const P = (x: number, y: number, z = 0): [number, number] => {
      const X = (x - cx) * Math.cos(th) - (y - cy) * Math.sin(th)
      const Y = (x - cx) * Math.sin(th) + (y - cy) * Math.cos(th)
      return [cw / 2 + X * sc, ch / 2 + (Y * squash - z * zs) * sc]
    }
    proj.current = P

    // streets
    ctx.lineCap = 'round'
    for (const r of d.roads) {
      ctx.beginPath()
      r.c.forEach(([x, y], i) => {
        const [px, py] = P(x, y)
        if (i) ctx.lineTo(px, py)
        else ctx.moveTo(px, py)
      })
      ctx.strokeStyle = '#e4ded3'
      ctx.lineWidth = (['primary', 'secondary', 'tertiary'].includes(r.k) ? 9 : 5) * sc
      ctx.stroke()
    }
    // search radius ground disc
    if (radius > 0) {
      ctx.beginPath()
      for (let a = 0; a <= 64; a++) {
        const ang = (a / 64) * Math.PI * 2
        const [px, py] = P(centre[0] + Math.cos(ang) * radius, centre[1] + Math.sin(ang) * radius)
        if (a) ctx.lineTo(px, py)
        else ctx.moveTo(px, py)
      }
      ctx.fillStyle = 'rgba(184,69,42,0.07)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(184,69,42,0.7)'
      ctx.setLineDash([6, 5])
      ctx.lineWidth = 1.4
      ctx.stroke()
      ctx.setLineDash([])
    }
    // buildings, back to front
    const order = d.buildings
      .map((b, i) => ({ i, depth: (cent[i][0] - cx) * Math.sin(th) + (cent[i][1] - cy) * Math.cos(th) }))
      .sort((a, b) => a.depth - b.depth)
    for (const { i } of order) {
      const b = d.buildings[i]
      const h = (b.h ?? 6.6) * lift
      const hit = inside[i]
      const hov = hover?.i === i
      if (h > 0.3 && pitch > 0.02) {
        for (let k = 0; k < b.r.length; k++) {
          const [x0, y0] = b.r[k]
          const [x1, y1] = b.r[(k + 1) % b.r.length]
          const a0 = P(x0, y0)
          const a1 = P(x1, y1)
          const b1 = P(x1, y1, h)
          const b0 = P(x0, y0, h)
          const ex = a1[0] - a0[0]
          const ey = a1[1] - a0[1]
          const lum = 0.5 + 0.5 * ((ey * 0.3 - ex * 0.95) / (Math.hypot(ex, ey) + 1e-6))
          const c = Math.round(170 + 55 * lum)
          ctx.beginPath()
          ctx.moveTo(...a0)
          ctx.lineTo(...a1)
          ctx.lineTo(...b1)
          ctx.lineTo(...b0)
          ctx.closePath()
          ctx.fillStyle = hit ? `rgb(${Math.min(255, c + 20)},${c - 60},${c - 85})` : `rgb(${c},${c - 5},${c - 12})`
          ctx.fill()
        }
      }
      ctx.beginPath()
      b.r.forEach(([x, y], k) => {
        const [px, py] = P(x, y, h)
        if (k) ctx.lineTo(px, py)
        else ctx.moveTo(px, py)
      })
      ctx.closePath()
      ctx.fillStyle = hov ? '#1b2220' : hit ? '#d0704f' : (b.h ?? 0) > 12 ? '#e9c6b6' : pitch > 0.02 ? '#fbf9f4' : '#9a958c'
      ctx.fill()
      if (pitch > 0.02) {
        ctx.strokeStyle = 'rgba(120,112,100,0.55)'
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
    }
    // centre pin
    if (radius > 0) {
      const [px, py] = P(centre[0], centre[1])
      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#1b2220'
      ctx.fill()
      ctx.strokeStyle = '#fffefb'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [d, pitch, lift, radius, inside, hover, cent, centre, W, H])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    const mx = e.clientX - r.left
    const my = e.clientY - r.top
    // pick the closest building roof centroid in screen space
    let best = -1
    let bd = 18
    cent.forEach(([x, y], i) => {
      const [px, py] = proj.current(x, y, (d.buildings[i].h ?? 6.6) * 1)
      const dd = Math.hypot(px - mx, py - my)
      if (dd < bd) {
        bd = dd
        best = i
      }
    })
    setHover(best >= 0 ? { i: best, x: mx, y: my } : null)
  }

  const hb = hover ? d.buildings[hover.i] : null
  const dist = hover ? Math.hypot(cent[hover.i][0] - centre[0], cent[hover.i][1] - centre[1]) : 0
  return (
    <div ref={wrap} className="absolute inset-0" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <canvas ref={ref} className="absolute inset-0" />
      {radius > 0 && (
        <div className="absolute right-3 top-3 bg-surface/95 px-3 py-2 text-right">
          <div className="font-serif text-[1.9rem] leading-none text-ink">{fmt(count)}</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">buildings within {Math.round(radius)} m</div>
        </div>
      )}
      {hb && hover && (
        <div className="pointer-events-none absolute z-10 w-52 border border-ink bg-surface p-3 text-[12.5px] shadow-sm" style={{ left: Math.min(hover.x + 14, 9999), top: hover.y + 14 }}>
          <p className="eyebrow text-accent">Building record</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="text-ink-3">Footprint</dt>
            <dd className="text-right font-mono text-ink">{fmt(hb.a)} m²</dd>
            <dt className="text-ink-3">Height</dt>
            <dd className="text-right font-mono text-ink">{hb.h ? `${hb.h.toFixed(1)} m` : 'n/a (2 storeys assumed)'}</dd>
            <dt className="text-ink-3">From search point</dt>
            <dd className="text-right font-mono text-ink">{fmt(dist)} m</dd>
          </dl>
        </div>
      )}
    </div>
  )
}
