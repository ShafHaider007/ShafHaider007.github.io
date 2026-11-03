'use client'

import { useMemo } from 'react'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { Chip, DemoNote, Figure, Layer } from '@/components/viz/primitives'
import { seg, useVizJson } from '@/lib/viz'
import { cn } from '@/lib/utils'

type Cluster = { name: string; ndvi: number[]; ndwi: number[]; share: number }
type Field = { cluster: number; name: string; poly: number[][]; ndvi: number[]; ndwi: number[]; area_ha: number }
type Data = { dates: string[]; clusters: Cluster[]; fields: Field[]; n_fields: number; size: [number, number]; mean_ndvi: number[] }

const COLORS: Record<string, string> = {
  Wheat: '#c8962c',
  'Potato or vegetables, then spring crop': '#7a4fa0',
  'Spring crop (maize)': '#2f7d5b',
  'Villages, roads & fallow': '#8a8478',
}
const color = (n: string) => COLORS[n] ?? '#1b2220'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const label = (iso: string) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`

export function GeoFasalStory() {
  const d = useVizJson<Data>('geofasal/geofasal.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Graphic d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        A 4.2 × 2.8 km block of fields near Sahiwal, Punjab, through the 2024–25 winter season: every clear Sentinel-2
        image from October to May, fields found by image segmentation and grouped by the shape of their NDVI curve.
        GeoFasal does the same for any field a farmer draws.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  const wheat = d?.clusters.find((c) => c.name === 'Wheat')
  return [
    {
      kicker: 'The season',
      title: 'What does one season look like from space?',
      body: (
        <>
          <p>
            GeoFasal gets Sentinel-2 images for each field through a STAC API and keeps only clear days. Winter fog in
            Punjab is not always caught by the cloud mask, so days when the fields suddenly look bare are removed too.
          </p>
          <p>Scroll to move through the {d ? d.dates.length : '…'} clear days of the 2024–25 season.</p>
        </>
      ),
    },
    {
      kicker: 'NDVI',
      title: 'How green is each field, week by week?',
      body: (
        <>
          <p>
            NDVI turns each image into a measure of how green and dense the crop is. Wheat greens up in January, peaks in
            February and March, and dries before harvest in April. Other fields follow other calendars.
          </p>
        </>
      ),
    },
    {
      kicker: 'Crop groups',
      title: 'Can fields be grouped by crop without labels?',
      body: (
        <>
          <p>
            Splitting the area into {d ? d.n_fields : '…'} fields and grouping their NDVI curves separates the crops
            without any training labels. Wheat covers about {wheat ? Math.round(wheat.share * 100) : '…'}% of the field area
            here.
          </p>
          <p>The outlined fields are one example from each group.</p>
        </>
      ),
    },
    {
      kicker: 'Yield model',
      title: 'What goes into the yield model?',
      body: (
        <>
          <p>
            NDWI follows the water in the leaves alongside NDVI. The curves of both, plus timing such as green-up date,
            peak value and how fast the crop dries, are the inputs to GeoFasal’s yield predictions and advice.
          </p>
        </>
      ),
    },
  ]
}

function Graphic({ d, s }: { d: Data; s: ScrollState }) {
  const [W, H] = d.size
  const n = d.dates.length
  const { step, progress: p } = s
  const idx = Math.min(n - 1, Math.max(0, Math.round(seg(p, 0.05, 0.92) * (n - 1))))
  const showNdvi = step >= 1
  const fieldsOn = step >= 2
  const metric: 'ndvi' | 'ndwi' = step === 3 ? 'ndwi' : 'ndvi'
  return (
    <div className="grid h-full grid-rows-[minmax(0,1.25fr)_minmax(0,1fr)] gap-3">
      <Figure
        aspect={W / H}
        topLeft={<Chip>{showNdvi ? 'NDVI' : 'True colour'}</Chip>}
        topRight={<span className="bg-surface/95 px-2 py-1 font-mono text-[12px] text-ink">{label(d.dates[idx])}</span>}
      >
        {d.dates.map((_, i) => (
          <Layer key={`r${i}`} src={`geofasal/rgb_${String(i).padStart(2, '0')}.webp`} alt="" style={{ opacity: !showNdvi && i === idx ? 1 : 0 }} />
        ))}
        {d.dates.map((_, i) => (
          <Layer key={`n${i}`} src={`geofasal/ndvi_${String(i).padStart(2, '0')}.webp`} alt="" style={{ opacity: showNdvi && i === idx ? 1 : 0 }} />
        ))}
        <Layer src="geofasal/fields.webp" alt="" className="transition-opacity duration-500" style={{ opacity: fieldsOn ? 0.55 : 0 }} />
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full transition-opacity duration-500" style={{ opacity: fieldsOn ? 1 : 0 }}>
          {d.fields.map((f) => (
            <polygon key={f.cluster} points={f.poly.map((q) => q.join(',')).join(' ')} fill="none" stroke="#fffefb" strokeWidth={4} />
          ))}
          {d.fields.map((f) => (
            <polygon key={`c${f.cluster}`} points={f.poly.map((q) => q.join(',')).join(' ')} fill={color(f.name)} fillOpacity={0.18} stroke={color(f.name)} strokeWidth={2.2} />
          ))}
          {d.fields.map((f) => {
            const cx = f.poly.reduce((a, q) => a + q[0], 0) / f.poly.length
            const top = Math.min(...f.poly.map((q) => q[1]))
            const short = f.name.split(/[ ,(]/)[0]
            return (
              <text key={`t${f.cluster}`} x={cx} y={top - 5} textAnchor="middle" fontSize={11} className="font-sans" fill={color(f.name)} stroke="#fffefb" strokeWidth={3.5} paintOrder="stroke">
                {short}
              </text>
            )
          })}
        </svg>
      </Figure>
      <Calendar d={d} idx={idx} metric={metric} highlight={fieldsOn} />
    </div>
  )
}

function Calendar({ d, idx, metric, highlight }: { d: Data; idx: number; metric: 'ndvi' | 'ndwi'; highlight: boolean }) {
  const W = 620
  const H = 220
  const m = { l: 40, r: 14, t: 12, b: 26 }
  const n = d.dates.length
  const t0 = new Date(d.dates[0]).getTime()
  const t1 = new Date(d.dates[n - 1]).getTime()
  const X = (iso: string) => m.l + ((new Date(iso).getTime() - t0) / (t1 - t0)) * (W - m.l - m.r)
  const lo = metric === 'ndvi' ? 0 : -0.2
  const hi = metric === 'ndvi' ? 0.85 : 0.6
  const Y = (v: number) => m.t + (1 - (v - lo) / (hi - lo)) * (H - m.t - m.b)
  const months = d.dates.filter((x, i) => i === 0 || x.slice(5, 7) !== d.dates[i - 1].slice(5, 7))
  return (
    <div className="flex min-h-0 flex-col border border-line bg-surface px-3 pb-2 pt-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-h-0 w-full flex-1" role="img" aria-label={`${metric.toUpperCase()} by crop group`}>
        {(metric === 'ndvi' ? [0, 0.2, 0.4, 0.6, 0.8] : [-0.2, 0, 0.2, 0.4, 0.6]).map((v) => (
          <g key={v}>
            <line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#eeeae1" />
            <text x={m.l - 6} y={Y(v) + 4} textAnchor="end" fontSize={10} className="fill-ink-3 font-mono">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {months.map((x) => (
          <text key={x} x={X(x)} y={H - 6} fontSize={10} className="fill-ink-3 font-mono">
            {MONTHS[Number(x.slice(5, 7)) - 1]}
          </text>
        ))}
        {d.clusters.map((c) => {
          const vals = c[metric]
          const path = vals.map((v, i) => `${i ? 'L' : 'M'}${X(d.dates[i])} ${Y(v)}`).join('')
          return <path key={c.name} d={path} fill="none" stroke={color(c.name)} strokeWidth={highlight ? 2.4 : 1.6} opacity={highlight ? 1 : 0.85} strokeLinejoin="round" />
        })}
        <line x1={X(d.dates[idx])} x2={X(d.dates[idx])} y1={m.t} y2={H - m.b} stroke="#1b2220" strokeWidth={1} strokeDasharray="3 3" />
        {d.clusters.map((c) => (
          <circle key={c.name} cx={X(d.dates[idx])} cy={Y(c[metric][idx])} r={4} fill="#fffefb" stroke={color(c.name)} strokeWidth={2} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
        {d.clusters.map((c) => (
          <span key={c.name} className={cn('flex items-center gap-1.5 text-[11.5px] text-ink-2')}>
            <span className="h-[3px] w-4" style={{ background: color(c.name) }} />
            {c.name} <span className="text-ink-3">{Math.round(c.share * 100)}%</span>
          </span>
        ))}
        <span className="ml-auto font-mono text-[10.5px] text-ink-3">{metric.toUpperCase()} · mean per crop group</span>
      </div>
    </div>
  )
}
