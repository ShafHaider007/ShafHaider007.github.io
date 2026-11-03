import fs from 'node:fs'
import path from 'node:path'

type Heat = { ndvi: number[]; lst: number[]; r: number; slope: number; intercept: number }

/** Static scatter of vegetation against surface temperature, rendered at build time from public/viz/home.json. */
export function HeatScatter() {
  const file = path.join(process.cwd(), 'public', 'viz', 'home.json')
  const h = (JSON.parse(fs.readFileSync(file, 'utf8')) as { heat: Heat }).heat
  const W = 440
  const H = 300
  const m = { l: 40, r: 12, t: 12, b: 40 }
  const X = (v: number) => m.l + ((v + 0.1) / 0.9) * (W - m.l - m.r)
  const Y = (v: number) => H - m.b - ((v - 28) / 18) * (H - m.t - m.b)
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full bg-surface"
      role="img"
      aria-label={`Scatter plot of 600 sampled pixels: as vegetation (NDVI) rises from 0 to 0.8, surface temperature falls from about 42 to 31 °C. Correlation r = ${h.r.toFixed(2)}.`}
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
      {h.ndvi.map((v, i) => (
        <circle key={i} cx={X(v)} cy={Y(h.lst[i])} r={2} fill="#2f6f7e" opacity={0.45} />
      ))}
      <line
        x1={X(-0.1)}
        y1={Y(h.intercept + h.slope * -0.1)}
        x2={X(0.8)}
        y2={Y(h.intercept + h.slope * 0.8)}
        stroke="#15191c"
        strokeWidth={1.75}
      />
    </svg>
  )
}

export function heatR() {
  const file = path.join(process.cwd(), 'public', 'viz', 'home.json')
  return (JSON.parse(fs.readFileSync(file, 'utf8')) as { heat: Heat }).heat.r
}
