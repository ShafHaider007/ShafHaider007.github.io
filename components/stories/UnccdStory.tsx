'use client'

import { useMemo } from 'react'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { Chip, Count, DemoNote, Figure, Fit, Layer, Legend, Wipe } from '@/components/viz/primitives'
import { fmt, seg, useVizJson, viz } from '@/lib/viz'
import { cn } from '@/lib/utils'

type Shares = { degraded: number; stable: number; improved: number }
type Data = {
  years: number[]
  annual_mean_ndvi: number[]
  shares: { productivity: Shares; land_cover: Shares; soc: Shares; combined: Shares }
  area_ha: number
  degraded_ha: number
  sdg_15_3_1: number
  examples: { prod: number; lc: number; soc: number; result: number; from: number; to: number }[]
  classes: Record<string, string>
  size: [number, number]
}

const TRI = [
  { label: 'Degraded', color: '#b8452a' },
  { label: 'Stable', color: '#ece8de' },
  { label: 'Improved', color: '#347684' },
]

export function UnccdStory() {
  const d = useVizJson<Data>('unccd/unccd.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Graphic d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        A 24 × 15 km window on the edge of the Cholistan desert, computed for this site from Sentinel-2 (2017–2024)
        and ESA WorldCover labels with the logic of the UNCCD Good Practice Guidance. It shows how the indicator is
        built; it is not Pakistan’s reported figure, which comes from the national assessment.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  const sh = d?.shares
  const pct = (v?: number) => (v === undefined ? '…' : `${Math.round(v * 100)}%`)
  return [
    {
      kicker: 'Landscape',
      title: 'A desert edge that is changing fast',
      body: (
        <>
          <p>
            South of the canal-irrigated plain, the Cholistan desert is being reclaimed: between 2017 and 2024 new
            rectangular fields appear in the sand. Is that land improving or degrading? SDG 15.3.1 answers with three
            sub-indicators.
          </p>
        </>
      ),
    },
    {
      kicker: 'Sub-indicator 1',
      title: 'Land productivity',
      body: (
        <>
          <p>
            Annual NDVI (the mean of each month’s clear-sky maximum) for every pixel from {d?.years[0] ?? 2017} to{' '}
            {d?.years[d.years.length - 1] ?? 2024}, then a Theil–Sen slope and a Mann–Kendall test. Only significant
            trends count.
          </p>
          <p>
            Here {pct(sh?.productivity.improved)} of the window shows a significant increase and{' '}
            {pct(sh?.productivity.degraded)} a decline.
          </p>
        </>
      ),
    },
    {
      kicker: 'Sub-indicator 2',
      title: 'Land cover',
      body: (
        <>
          <p>
            Land cover is classified for both years and every transition is scored with a degradation matrix: forest
            lost or land sealed by construction is degradation; desert turned to cropland or grassland is improvement.
          </p>
          <p>
            {pct(sh?.land_cover.degraded)} degraded, {pct(sh?.land_cover.improved)} improved, after a minimum mapping
            unit removes edge noise.
          </p>
        </>
      ),
    },
    {
      kicker: 'Sub-indicator 3',
      title: 'Soil organic carbon',
      body: (
        <>
          <p>
            Without repeated soil surveys, carbon change is estimated from land-cover change with IPCC Tier-1 stock
            factors. Converting land to cropland lowers the stock by about a fifth; sealing it by construction removes
            most of it.
          </p>
          <p>A decline of more than 10% counts as degradation: {pct(sh?.soc.degraded)} of the window.</p>
        </>
      ),
    },
    {
      kicker: 'Integration',
      title: 'One out, all out',
      body: (
        <>
          <p>
            The three layers are stacked. A pixel is degraded if any one of them says so; it is improved only if at
            least one improves and none degrades.
          </p>
          <p>
            That is why new desert fields can count as degraded: productivity rises and land cover improves, but the
            conversion to cropland costs soil carbon, and that one “out” decides.
          </p>
        </>
      ),
    },
    {
      kicker: 'Indicator',
      title: 'The proportion of degraded land',
      body: (
        <>
          <p>
            SDG 15.3.1 is the degraded area over the total land area. For this window:{' '}
            <strong className="font-medium text-ink">{d ? (d.sdg_15_3_1 * 100).toFixed(1) : '…'}%</strong>, or{' '}
            {d ? fmt(d.degraded_ha) : '…'} of {d ? fmt(d.area_ha) : '…'} ha.
          </p>
          <p>
            In the national assessment this runs for the whole country, with QA/QC of each input and documentation that
            provinces can reproduce, which is the part of the work I lead.
          </p>
        </>
      ),
    },
  ]
}

function Graphic({ d, s }: { d: Data; s: ScrollState }) {
  const [W, H] = d.size
  const aspect = W / H
  const { step, progress: p } = s
  const legend = <Legend items={TRI} />

  if (step === 0) {
    return (
      <Figure aspect={aspect} footer={<><span>Sentinel-2 L2A · October–November</span><span>24 × 15 km</span></>}>
        <Wipe
          t={seg(p, 0.08, 0.75)}
          a={<Layer src="unccd/rgb_2017.webp" alt="Cholistan desert margin in 2017" />}
          b={<Layer src="unccd/rgb_2024.webp" alt="Cholistan desert margin in 2024" />}
          labelA="2017"
          labelB="2024"
        />
      </Figure>
    )
  }

  if (step === 1) {
    const t = seg(p, 0.35, 0.8)
    return (
      <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-3">
        <Figure aspect={aspect} footer={t > 0.5 ? legend : <span className="flex items-center gap-2">decline <span className="h-2 w-28" style={{ background: 'linear-gradient(90deg,#a03422,#e2aa78,#f0ece2,#82bab0,#226e78)' }} /> increase · NDVI per year</span>}>
          <Layer src="unccd/trend.webp" alt="Per-pixel NDVI trend" />
          <Layer src="unccd/prod.webp" alt="Significant productivity trend" style={{ opacity: t }} />
        </Figure>
        <Spark d={d} t={seg(p, 0, 0.35)} />
      </div>
    )
  }

  if (step === 2 || step === 3) {
    const src = step === 2 ? 'unccd/lc.webp' : 'unccd/soc.webp'
    return (
      <Figure aspect={aspect} footer={<>{legend}<span>{step === 2 ? '2017 → 2024 transitions' : 'IPCC Tier-1 factors'}</span></>}>
        <Layer src="unccd/rgb_2024.webp" alt="" style={{ opacity: 0.35 }} />
        <Layer src={src} alt={step === 2 ? 'Land-cover degradation' : 'Soil organic carbon degradation'} style={{ opacity: 0.25 + 0.75 * seg(p, 0.05, 0.4), mixBlendMode: 'multiply' }} />
      </Figure>
    )
  }

  if (step === 4) return <Stack d={d} p={p} />

  // final indicator
  const c = d.shares.combined
  return (
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-3">
      <Figure
        aspect={aspect}
        topRight={
          <div className="bg-surface/95 px-3 py-2 text-right">
            <div className="font-serif text-[2.2rem] leading-none text-ink">
              <Count value={d.sdg_15_3_1 * 100 * seg(p, 0, 0.5)} digits={1} suffix="%" />
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">SDG 15.3.1 · this window</div>
          </div>
        }
        footer={legend}
      >
        <Layer src="unccd/combined.webp" alt="Combined degradation status" />
      </Figure>
      <div className="flex h-3 overflow-hidden border border-line">
        <span style={{ width: `${c.degraded * 100}%`, background: '#b8452a' }} />
        <span style={{ width: `${c.stable * 100}%`, background: '#ece8de' }} />
        <span style={{ width: `${c.improved * 100}%`, background: '#347684' }} />
      </div>
    </div>
  )
}

function Spark({ d, t }: { d: Data; t: number }) {
  const W = 600
  const H = 70
  const v = d.annual_mean_ndvi
  const lo = Math.min(...v) - 0.02
  const hi = Math.max(...v) + 0.02
  const X = (i: number) => 30 + (i / (v.length - 1)) * (W - 50)
  const Y = (x: number) => 8 + (1 - (x - lo) / (hi - lo)) * (H - 24)
  return (
    <div className="border border-line bg-surface px-3 pb-1.5 pt-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-[62px] w-full">
        <path d={v.map((x, i) => `${i ? 'L' : 'M'}${X(i)} ${Y(x)}`).join('')} fill="none" stroke="#347684" strokeWidth={2} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - t} />
        {v.map((x, i) => (
          <g key={i} opacity={seg(t, i / v.length, (i + 1) / v.length)}>
            <circle cx={X(i)} cy={Y(x)} r={3} fill="#fffefb" stroke="#347684" strokeWidth={1.6} />
            <text x={X(i)} y={H - 2} textAnchor="middle" fontSize={10} className="fill-ink-3 font-mono">
              {String(d.years[i]).slice(2)}
            </text>
          </g>
        ))}
      </svg>
      <div className="font-mono text-[10.5px] text-ink-3">Window mean annual NDVI, {d.years[0]}–{d.years[d.years.length - 1]}</div>
    </div>
  )
}

function Stack({ d, p }: { d: Data; p: number }) {
  const [W, H] = d.size
  const explode = seg(p, 0.0, 0.3) * (1 - seg(p, 0.5, 0.75))
  const merged = seg(p, 0.55, 0.8)
  const layers = [
    { src: 'unccd/soc.webp', name: 'Soil carbon' },
    { src: 'unccd/lc.webp', name: 'Land cover' },
    { src: 'unccd/prod.webp', name: 'Productivity' },
  ]
  const sym = (v: number) => (v < 0 ? '−' : v > 0 ? '+' : '0')
  const tone = (v: number) => (v < 0 ? 'text-accent-ink' : v > 0 ? 'text-[#347684]' : 'text-ink-3')
  return (
    <div className="grid h-full grid-rows-[minmax(0,1.3fr)_auto] gap-3">
      <div className="relative min-h-0 [perspective:1800px]">
        <Fit aspect={W / H}>
          <div
            className="absolute inset-[10%_16%_10%_8%] [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${56 * explode}deg) rotateZ(${-26 * explode}deg) translateZ(${-60 * explode}px)`, transition: 'transform 120ms linear' }}
          >
            {layers.map((l, i) => (
              <div
                key={l.src}
                className="absolute inset-0 border border-ink/50 bg-surface [transform-style:preserve-3d]"
                style={{ transform: `translateZ(${i * 105 * explode}px)`, opacity: 1 - merged * (i < 2 ? 1 : 0.0) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={viz(l.src)} alt="" className="h-full w-full object-cover" />
                <span
                  className="absolute -right-2 top-1/2 origin-left whitespace-nowrap font-mono text-[11px] text-ink transition-opacity"
                  style={{ transform: `translate(100%,-50%) rotateZ(${26 * explode}deg) rotateX(${-56 * explode}deg)`, opacity: explode > 0.6 ? 1 : 0 }}
                >
                  {l.name}
                </span>
              </div>
            ))}
            <div className="absolute inset-0 border border-ink" style={{ opacity: merged, transform: `translateZ(${2 * 105 * explode + 1}px)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viz('unccd/combined.webp')} alt="Combined degradation status" className="h-full w-full object-cover" />
              <Chip className="absolute left-2 top-2">Combined</Chip>
            </div>
          </div>
        </Fit>
      </div>
      <div className="border border-line bg-surface p-3">
        <div className="grid grid-cols-[1fr_repeat(3,3.2rem)_4.2rem] gap-y-1 font-mono text-[11px]">
          <span className="text-ink-3">example pixel</span>
          <span className="text-center text-ink-3">prod.</span>
          <span className="text-center text-ink-3">cover</span>
          <span className="text-center text-ink-3">SOC</span>
          <span className="text-right text-ink-3">result</span>
          {d.examples.slice(0, 5).map((e, i) => (
            <div key={i} className="contents" style={{ opacity: seg(p, 0.15 + i * 0.07, 0.25 + i * 0.07) }}>
              <span className="truncate text-ink-2" style={{ opacity: seg(p, 0.15 + i * 0.07, 0.25 + i * 0.07) }}>
                {d.classes[String(e.from)]} → {d.classes[String(e.to)]}
              </span>
              {[e.prod, e.lc, e.soc].map((v, j) => (
                <span key={j} className={cn('text-center text-[13px]', tone(v))} style={{ opacity: seg(p, 0.15 + i * 0.07, 0.25 + i * 0.07) }}>
                  {sym(v)}
                </span>
              ))}
              <span className={cn('text-right', tone(e.result))} style={{ opacity: seg(p, 0.15 + i * 0.07, 0.25 + i * 0.07) }}>
                {e.result < 0 ? 'degraded' : e.result > 0 ? 'improved' : 'stable'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
