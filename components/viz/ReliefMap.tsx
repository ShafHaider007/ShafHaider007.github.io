'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { projects } from '@/lib/projects'
import { seg, useSectionProgress, useVizJson, viz } from '@/lib/viz'
import { cn } from '@/lib/utils'

type MapData = {
  frame: { lon0: number; lon1: number; lat0: number; lat1: number; k: number; s: number; width: number; height: number }
  outline: string
  provinces: { name: string; d: string }[]
  rivers: { name: string; rank: number; w: number; inside: boolean; d: string }[]
  lakes: { name: string; d: string }[]
}

const CITIES = [
  { name: 'Islamabad', lon: 73.05, lat: 33.68, dx: -10, dy: 16, anchor: 'end' as const },
  { name: 'Lahore', lon: 74.34, lat: 31.55, dx: 12, dy: -6, anchor: 'start' as const },
  { name: 'Karachi', lon: 67.01, lat: 24.86, dx: 10, dy: 4, anchor: 'start' as const },
  { name: 'Quetta', lon: 66.99, lat: 30.18, dx: -10, dy: 4, anchor: 'end' as const },
  { name: 'Peshawar', lon: 71.52, lat: 34.01, dx: -10, dy: -6, anchor: 'end' as const },
]

const RIVER_LABELS = [
  { name: 'Indus', lon: 70.9, lat: 28.3, rot: 62 },
  { name: 'Jhelum', lon: 72.95, lat: 32.4, rot: 58 },
  { name: 'Chenab', lon: 72.75, lat: 31.25, rot: 52 },
]

export function ReliefMap() {
  const data = useVizJson<MapData>('map/pakistan.json')
  const [ref, p] = useSectionProgress<HTMLDivElement>(0.45)
  const [active, setActive] = useState<string | null>(null)

  const proj = useMemo(() => {
    if (!data) return null
    const f = data.frame
    return (lon: number, lat: number) => ({ x: (lon - f.lon0) * f.k * f.s, y: (f.lat1 - lat) * f.s })
  }, [data])

  const pins = projects
    .map((pr, i) => ({ pr, i }))
    .filter(({ pr }) => pr.where)
  const offsheet = projects.map((pr, i) => ({ pr, i })).filter(({ pr }) => !pr.where)
  const riverP = seg(p, 0.06, 0.36)
  const activeProject = projects.find((x) => x.slug === active)

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <div className="relative border border-ink/80 bg-surface p-[5px]">
        <div className="relative overflow-hidden" style={{ aspectRatio: data ? `${data.frame.width}/${data.frame.height}` : '1000/905' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={viz('map/relief.webp')}
            alt="Shaded relief of Pakistan from the Copernicus 90 m elevation model"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out"
            style={{ transform: `scale(${1.06 - 0.06 * seg(p, 0, 0.4)})` }}
          />
          {data && proj && (
            <svg viewBox={`0 0 ${data.frame.width} ${data.frame.height}`} className="absolute inset-0 h-full w-full">
              {data.provinces.map((pv) => (
                <path key={pv.name} d={pv.d} fill="none" stroke="#8e8577" strokeWidth={0.7} strokeDasharray="3 2.5" opacity={0.55 * seg(p, 0.04, 0.2)} />
              ))}
              <path
                d={data.outline}
                fill="none"
                stroke="#1b2220"
                strokeWidth={1.4}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - seg(p, 0.0, 0.28)}
              />
              {data.lakes.map((l) => (
                <path key={l.name + l.d.slice(0, 12)} d={l.d} fill="#9cc0d0" stroke="#5f93ab" strokeWidth={0.4} opacity={riverP} />
              ))}
              {data.rivers
                .filter((r) => r.rank <= 8)
                .map((r, i) => (
                  <path
                    key={i}
                    d={r.d}
                    fill="none"
                    stroke="#4d8fb0"
                    strokeWidth={Math.max(0.7, (9 - r.rank) * 0.32)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray="1"
                    strokeDashoffset={1 - riverP}
                    opacity={r.inside ? 0.9 : 0.45}
                  />
                ))}
              {RIVER_LABELS.map((rl) => {
                const q = proj(rl.lon, rl.lat)
                return (
                  <text
                    key={rl.name}
                    x={q.x}
                    y={q.y}
                    transform={`rotate(${rl.rot} ${q.x} ${q.y})`}
                    className="fill-[#3f7a98] font-serif italic"
                    fontSize={16}
                    opacity={seg(p, 0.3, 0.4)}
                  >
                    {rl.name}
                  </text>
                )
              })}
              {CITIES.map((c) => {
                const q = proj(c.lon, c.lat)
                return (
                  <g key={c.name} opacity={seg(p, 0.18, 0.3)}>
                    <rect x={q.x - 3.5} y={q.y - 3.5} width={7} height={7} fill="#1b2220" />
                    <text x={q.x + c.dx * 1.3} y={q.y + c.dy * 1.25} textAnchor={c.anchor} className="fill-ink-2 font-sans" fontSize={17} stroke="#f6f4ef" strokeWidth={4} paintOrder="stroke">
                      {c.name}
                    </text>
                  </g>
                )
              })}
              {pins.map(({ pr, i }, k) => {
                const q = proj(pr.where!.lon, pr.where!.lat)
                const t = seg(p, 0.2 + k * 0.035, 0.27 + k * 0.035)
                const on = active === pr.slug
                return (
                  <Link
                    key={pr.slug}
                    href={`/projects/${pr.slug}`}
                    aria-label={pr.short}
                    onMouseEnter={() => setActive(pr.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(pr.slug)}
                    onBlur={() => setActive(null)}
                  >
                    <g style={{ transform: `translate(${q.x}px, ${q.y}px) scale(${t})`, transition: 'transform 300ms ease-out' }}>
                      <circle r={on ? 28 : 22} fill="var(--accent)" opacity={0.18} style={{ transition: 'r 200ms' }} />
                      <circle r={14} fill="var(--accent)" stroke="#fffefb" strokeWidth={2.5} />
                      <text y={5.2} textAnchor="middle" fontSize={15} className="fill-white font-mono">
                        {i + 1}
                      </text>
                    </g>
                  </Link>
                )
              })}
            </svg>
          )}
          {activeProject && activeProject.where && proj && data && (
            <div
              className="pointer-events-none absolute z-10 w-[min(16rem,60%)] -translate-x-1/2 border border-ink bg-surface p-3 shadow-sm"
              style={{
                left: `${(proj(activeProject.where.lon, activeProject.where.lat).x / data.frame.width) * 100}%`,
                top: `calc(${(proj(activeProject.where.lon, activeProject.where.lat).y / data.frame.height) * 100}% + 18px)`,
              }}
            >
              <p className="eyebrow text-accent">{activeProject.where.label}</p>
              <p className="mt-1 font-serif text-[1.05rem] leading-tight text-ink">{activeProject.short}</p>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-surface/90 px-2 py-1 font-mono text-[10px] leading-relaxed text-ink-3">
            Relief: Copernicus GLO-90 DEM · Rivers: Natural Earth · Boundaries: geoBoundaries
          </div>
        </div>
      </div>

      <ol className="flex flex-col self-center">
        {projects.map((pr, i) => (
          <li key={pr.slug} className="border-t border-line last:border-b">
            <Link
              href={`/projects/${pr.slug}`}
              onMouseEnter={() => setActive(pr.slug)}
              onMouseLeave={() => setActive(null)}
              className="group flex items-baseline gap-4 py-3.5"
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] transition-colors',
                  pr.where ? 'bg-accent text-white' : 'border border-ink text-ink',
                )}
              >
                {i + 1}
              </span>
              <span className="flex-1">
                <span className={cn('block font-medium transition-colors', active === pr.slug ? 'text-accent-ink' : 'text-ink group-hover:text-accent-ink')}>
                  {pr.short}
                </span>
                <span className="block text-sm text-ink-3">
                  {pr.where ? pr.where.label : pr.slug === 'national-forest-monitoring-system' ? 'Nationwide platform' : 'Lagos, Nigeria (off sheet)'}
                </span>
              </span>
              <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </li>
        ))}
        {offsheet.length > 0 && (
          <li className="pt-4 text-[12.5px] leading-relaxed text-ink-3">
            Outlined numbers have no single location on this sheet: a nationwide platform and a fleet in Lagos.
          </li>
        )}
      </ol>
    </div>
  )
}
