'use client'

import type { ReactNode } from 'react'
import { useReveal } from '@/lib/hooks'
import { viz } from '@/lib/viz'

type Heat = { ndvi: number[]; lst: number[]; r: number; slope: number; intercept: number }

function Frame({ children, n, caption }: { children: ReactNode; n: number; caption: ReactNode }) {
  return (
    <figure>
      <div className="border border-ink/70 bg-surface p-1">{children}</div>
      <figcaption className="figure-caption">
        <span className="font-semibold text-ink">Figure {n}.</span> {caption}
      </figcaption>
    </figure>
  )
}

/** Two images of the same place; the later one wipes across the earlier one when the figure comes into view. */
function YearWipe({ a, b, labelA, labelB, alts, aspect }: { a: string; b: string; labelA: string; labelB: string; alts: [string, string]; aspect: string }) {
  const [ref, on] = useReveal<HTMLDivElement>(0.5)
  return (
    <div ref={ref} className="relative overflow-hidden bg-plate" style={{ aspectRatio: aspect }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={viz(a)} alt={alts[0]} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div data-animate className="absolute inset-0 transition-[clip-path] duration-[1800ms] ease-[cubic-bezier(.65,0,.35,1)]" style={{ clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={viz(b)} alt={alts[1]} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <span className="absolute left-2 top-2 rounded-[2px] bg-surface/90 px-1.5 py-0.5 font-mono text-[11px] text-ink">
        {labelA} → {labelB}
      </span>
    </div>
  )
}

export function ForestFigure({ n }: { n: number }) {
  return (
    <Frame
      n={n}
      caption={
        <>
          Canopy density from spectral unmixing, open-data test area near Murree: September 2018, wiping to September 2024.
          Darker green means denser canopy; degradation shows up as a fall in density inside the forest. Made for this site, not
          results from the forest-carbon study.
        </>
      }
    >
      <YearWipe
        a="jfrel/canopy_2018.webp"
        b="jfrel/canopy_2024.webp"
        labelA="2018"
        labelB="2024"
        aspect="883 / 1000"
        alts={[
          'Canopy density map for 2018: dense forest in dark green along the ridges, open land in off-white.',
          'Canopy density map for 2024 of the same hills.',
        ]}
      />
    </Frame>
  )
}

export function DrylandFigure({ n }: { n: number }) {
  const [ref, on] = useReveal<HTMLDivElement>(0.4)
  const chips = [
    { label: 'Plant growth (productivity)', v: 'Improved', up: true },
    { label: 'Land cover', v: 'Improved', up: true },
    { label: 'Soil organic carbon', v: 'Degraded', up: false },
  ]
  return (
    <Frame
      n={n}
      caption={
        <>
          Edge of the Cholistan desert in Sentinel-2 images from autumn 2017 and 2024, with how a new irrigated field scores under
          this site’s walk-through settings: productivity and land cover improve, soil carbon falls by the default factor, so the
          “one out, all out” rule counts it as degraded. Made for this site.
        </>
      }
    >
      <YearWipe
        a="unccd/rgb_2017.webp"
        b="unccd/rgb_2024.webp"
        labelA="2017"
        labelB="2024"
        aspect="8 / 5"
        alts={[
          'Satellite image from 2017: irrigated farmland in the upper left and open sand across the lower right.',
          'The same area in 2024, with new dark green rectangular fields scattered across the sand.',
        ]}
      />
      <div ref={ref} className="space-y-2 px-3 pb-3 pt-3.5">
        {chips.map((c, i) => (
          <div
            key={c.label}
            data-animate
            className="flex items-center justify-between gap-3 text-[13.5px] transition-[opacity,transform] duration-500"
            style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-12px)', transitionDelay: `${900 + i * 250}ms` }}
          >
            <span className="text-ink-2">{c.label}</span>
            <span className={c.up ? 'font-mono text-gain' : 'font-mono text-loss'}>
              {c.up ? '↑' : '↓'} {c.v}
            </span>
          </div>
        ))}
        <div
          data-animate
          className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3 transition-[opacity,transform] duration-500"
          style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'scale(0.96)', transitionDelay: '1800ms' }}
        >
          <span className="text-[13.5px] text-ink">SDG 15.3.1 result (one out, all out)</span>
          <span className="bg-loss px-2 py-1 font-mono text-[11.5px] text-white">Degraded</span>
        </div>
      </div>
    </Frame>
  )
}

export function HeatFigure({ n, d }: { n: number; d: Heat }) {
  const [ref, on] = useReveal<HTMLDivElement>(0.4)
  const W = 440
  const H = 300
  const m = { l: 40, r: 12, t: 12, b: 40 }
  const X = (v: number) => m.l + ((v + 0.1) / 0.9) * (W - m.l - m.r)
  const Y = (v: number) => H - m.b - ((v - 28) / 18) * (H - m.t - m.b)
  return (
    <Frame
      n={n}
      caption={
        <>
          Vegetation (NDVI, Sentinel-2, 10 June 2019) against land-surface temperature (Landsat 8, 27 June 2019) for 600 sampled
          pixels in Islamabad, coloured from cool to hot. Recomputed for this site from open data: r = {d.r.toFixed(2)}. The Move
          Smart project’s own analysis found r = −0.72.
        </>
      }
    >
      <div ref={ref}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          data-animate-children
          role="img"
          aria-label={`Scatter plot of 600 sampled pixels: as vegetation (NDVI) rises from 0 to 0.8, surface temperature falls from about 42 to 31 °C. Correlation r = ${d.r.toFixed(2)}.`}
        >
          {[30, 34, 38, 42].map((v) => (
            <g key={v}>
              <line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#e3e6e8" />
              <text x={m.l - 6} y={Y(v) + 4} textAnchor="end" fontSize={11} fill="#5a636a" fontFamily="var(--font-mono)">
                {v}
              </text>
            </g>
          ))}
          {[0, 0.2, 0.4, 0.6, 0.8].map((v) => (
            <text key={v} x={X(v)} y={H - m.b + 16} textAnchor="middle" fontSize={11} fill="#5a636a" fontFamily="var(--font-mono)">
              {v.toFixed(1)}
            </text>
          ))}
          <text x={(W + m.l) / 2} y={H - 6} textAnchor="middle" fontSize={11.5} fill="#465057">
            Vegetation (NDVI)
          </text>
          <text x={12} y={(H - m.b) / 2} textAnchor="middle" fontSize={11.5} fill="#465057" transform={`rotate(-90 12 ${(H - m.b) / 2})`}>
            Surface temperature (°C)
          </text>
          {d.ndvi.map((v, i) => {
            const k = Math.max(0, Math.min(1, (d.lst[i] - 31) / 13))
            return (
              <circle
                key={i}
                cx={X(v)}
                cy={Y(d.lst[i])}
                r={2.2}
                fill={`hsl(${210 - 200 * k} 50% ${47 - 6 * k}%)`}
                style={{ opacity: on ? 0.65 : 0, transition: 'opacity 500ms ease-out', transitionDelay: `${(i * 37) % 1200}ms` }}
              />
            )
          })}
          <line
            x1={X(-0.1)}
            y1={Y(d.intercept + d.slope * -0.1)}
            x2={X(0.8)}
            y2={Y(d.intercept + d.slope * 0.8)}
            stroke="#15191c"
            strokeWidth={2}
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: on ? 0 : 1, transition: 'stroke-dashoffset 1200ms ease-in-out 1300ms' }}
          />
        </svg>
      </div>
    </Frame>
  )
}
