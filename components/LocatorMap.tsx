import Link from 'next/link'
import pak from '@/lib/pakistan.json'
import { plateCentre, plates } from '@/lib/plates'
import { projects } from '@/lib/projects'

// Same equirectangular projection the paths were generated with (scripted from geoBoundaries ADM1).
function project(lon: number, lat: number) {
  return { x: (lon - pak.minx) * pak.k * pak.sc, y: (pak.maxy - lat) * pak.sc }
}

const CITIES = [
  { name: 'Islamabad', lon: 73.05, lat: 33.68, dx: -14, dy: 4, anchor: 'end' as const },
  { name: 'Lahore', lon: 74.34, lat: 31.55, dx: 16, dy: -8, anchor: 'start' as const },
  { name: 'Karachi', lon: 67.01, lat: 24.86, dx: 8, dy: 4, anchor: 'start' as const },
]

/** Pakistan with the location of each project's plate. Lagos sits off-sheet and is listed instead. */
export function LocatorMap() {
  const inPakistan = projects.filter((p) => plates[p.plate].region !== 'Lagos State, Nigeria')
  const offSheet = projects.filter((p) => !inPakistan.includes(p))

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <div className="relative border border-ink/80 bg-surface p-[5px]">
        <svg viewBox={`-20 -10 ${pak.width + 40} ${pak.height + 20}`} className="block h-auto w-full bg-[#eef2f1]" role="img" aria-label="Map of Pakistan with project locations">
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#d9d2c4" strokeWidth="1" />
            </pattern>
          </defs>
          {pak.provinces.map((p) => (
            <path key={p.name} d={p.d} fill="var(--land)" stroke="#a79f90" strokeWidth={0.8} strokeLinejoin="round" />
          ))}
          {pak.provinces.map((p) => (
            <path key={`${p.name}-h`} d={p.d} fill="url(#hatch)" opacity={0.5} />
          ))}
          {CITIES.map((c) => {
            const { x, y } = project(c.lon, c.lat)
            return (
              <g key={c.name}>
                <rect x={x - 2.5} y={y - 2.5} width={5} height={5} fill="#1b2220" />
                <text x={x + c.dx} y={y + c.dy} textAnchor={c.anchor} className="fill-ink-2 font-sans" fontSize={12}>
                  {c.name}
                </text>
              </g>
            )
          })}
          {inPakistan.map((p) => {
            const { lon, lat } = plateCentre(plates[p.plate])
            const { x, y } = project(lon, lat)
            const n = projects.indexOf(p) + 1
            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} aria-label={p.short}>
                <circle cx={x} cy={y} r={9} fill="var(--accent)" stroke="#fffefb" strokeWidth={1.5} />
                <text x={x} y={y + 3.5} textAnchor="middle" fontSize={10} className="fill-white font-mono">
                  {n}
                </text>
              </Link>
            )
          })}
        </svg>
        <span className="absolute bottom-3 left-4 font-mono text-[10px] text-ink-3">Boundaries: geoBoundaries (CC BY 4.0)</span>
      </div>

      <ol className="flex flex-col">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-t border-line last:border-b">
            <Link href={`/projects/${p.slug}`} className="group flex items-baseline gap-4 py-3.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] text-white">{i + 1}</span>
              <span className="flex-1">
                <span className="block font-medium text-ink transition-colors group-hover:text-accent-ink">{p.short}</span>
                <span className="block text-sm text-ink-3">
                  {plates[p.plate].place}
                  {offSheet.includes(p) && ' · off sheet'}
                </span>
              </span>
              <span aria-hidden className="text-ink-3 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
