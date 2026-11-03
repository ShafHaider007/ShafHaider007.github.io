'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { Count, DemoNote, Figure, Layer, Legend } from '@/components/viz/primitives'
import { seg } from '@/lib/viz'
import { useVizJson } from '@/lib/useVizJson'

type Tour = { order: number[]; path: number[][]; km: number }
type Data = { size: [number, number]; roads: { major: string; minor: string }; depot: number[]; stops: number[][]; naive: Tour; optimised: Tour }

const toPath = (pts: number[][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('')

export function MottainaiStory() {
  const d = useVizJson<Data>('mottainai/mottainai.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Graphic d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        The street network is real (Overture Maps, Lagos mainland). The fourteen pickup points are random, placed only for
        this example, and the distances are measured on the real streets. The 28% in the project summary is the real drop
        in Mottainai’s routing costs, which is a different number.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  const save = d ? Math.round((1 - d.optimised.km / d.naive.km) * 100) : 0
  return [
    {
      kicker: 'Operations',
      title: 'Where are the pickups?',
      body: (
        <>
          <p>
            Customers ask for recycling pickups in an app. Drivers and field managers do the work on the street. Behind
            them is the ArcGIS Online setup I run: data on customers, requests, depots and routes.
          </p>
        </>
      ),
    },
    {
      kicker: 'Arrival order',
      title: 'What does first come, first served cost?',
      body: (
        <>
          <p>
            Collecting in the order requests arrive sends a truck back and forth across the city. On this street network,
            fourteen stops in arrival order add up to{' '}
            <strong className="font-medium text-ink">{d ? d.naive.km.toFixed(1) : '…'} km</strong>.
          </p>
        </>
      ),
    },
    {
      kicker: 'Ordered stops',
      title: 'How much does ordering the stops save?',
      body: (
        <>
          <p>
            A self-hosted GraphHopper engine works out the street distance between every pair of stops and puts them in the
            order that gives the shortest drive. Here that is{' '}
            <strong className="font-medium text-ink">{d ? d.optimised.km.toFixed(1) : '…'} km</strong>, {save}% shorter.
          </p>
          <p>Running the engine ourselves also removed the per-request fees from Google Maps and Mapbox.</p>
        </>
      ),
    },
    {
      kicker: 'Field apps',
      title: 'How do the apps work with a weak signal?',
      body: (
        <>
          <p>
            The customer, driver and field manager apps, written in Kotlin with the ArcGIS Maps SDK and Mapbox SDK, save
            locations offline and send them when the phone is back online. On Lagos streets with patchy coverage, that
            keeps the data complete.
          </p>
        </>
      ),
    },
  ]
}

function Graphic({ d, s }: { d: Data; s: ScrollState }) {
  const [W, H] = d.size
  const { step, progress: p } = s
  if (step === 3) return <Architecture p={p} />
  const naiveT = step === 1 ? seg(p, 0.05, 0.85) : step > 1 ? 1 : 0
  const optT = step === 2 ? seg(p, 0.05, 0.85) : 0
  const km = step === 1 ? d.naive.km * naiveT : step === 2 ? d.optimised.km * optT : 0
  return (
    <Figure
      aspect={W / H}
      topRight={
        step >= 1 ? (
          <div className="bg-surface/95 px-3 py-2 text-right">
            <div className="font-serif text-[1.9rem] leading-none text-ink">
              <Count value={km} digits={1} /> km
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-3">{step === 1 ? 'arrival order' : 'optimised'}</div>
          </div>
        ) : undefined
      }
      footer={
        <>
          <Legend
            items={[
              { label: 'Depot', color: '#1b2220' },
              { label: 'Pickup', color: '#fffefb', ring: true },
              { label: `Arrival order · ${d.naive.km.toFixed(1)} km`, color: '#c8a89c' },
              { label: `Optimised · ${d.optimised.km.toFixed(1)} km`, color: '#b8452a' },
            ]}
          />
          <span>Overture Maps streets · Lagos mainland</span>
        </>
      }
    >
      <div className="absolute inset-0 bg-paper" />
      <Layer src="mottainai/water.webp" alt="" />
      <RouteSvg d={d} naiveT={naiveT} optT={optT} stopsT={step === 0 ? seg(p, 0.2, 0.8) : 1} fadeNaive={step === 2} />
    </Figure>
  )
}

function RouteSvg({ d, naiveT, optT, stopsT, fadeNaive }: { d: Data; naiveT: number; optT: number; stopsT: number; fadeNaive: boolean }) {
  const [W, H] = d.size
  const optRef = useRef<SVGPathElement>(null)
  const [truck, setTruck] = useState<{ x: number; y: number } | null>(null)
  useEffect(() => {
    const el = optRef.current
    if (!el || optT <= 0) {
      setTruck(null)
      return
    }
    const L = el.getTotalLength()
    const pt = el.getPointAtLength(L * optT)
    setTruck({ x: pt.x, y: pt.y })
  }, [optT])
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
      <path d={d.roads.minor} fill="none" stroke="#d9d2c6" strokeWidth={1} />
      <path d={d.roads.major} fill="none" stroke="#b9b0a2" strokeWidth={2.2} />
      <path
        d={toPath(d.naive.path)}
        fill="none"
        stroke={fadeNaive ? '#d8c2b8' : '#c27a62'}
        strokeWidth={fadeNaive ? 2 : 3}
        strokeLinejoin="round"
        strokeDasharray={fadeNaive ? '5 4' : undefined}
        pathLength={fadeNaive ? undefined : 1}
        style={fadeNaive ? undefined : { strokeDasharray: 1, strokeDashoffset: 1 - naiveT }}
        opacity={naiveT > 0 ? 1 : 0}
      />
      <path d={toPath(d.optimised.path)} fill="none" stroke="#fffefb" strokeWidth={7} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - optT} />
      <path ref={optRef} d={toPath(d.optimised.path)} fill="none" stroke="#b8452a" strokeWidth={4} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - optT} />
      {d.stops.map(([x, y], i) => (
        <g key={i} style={{ opacity: seg(stopsT, i / d.stops.length, (i + 1) / d.stops.length) }}>
          <circle cx={x} cy={y} r={7} fill="#fffefb" stroke="#1b2220" strokeWidth={2.2} />
        </g>
      ))}
      <rect x={d.depot[0] - 9} y={d.depot[1] - 9} width={18} height={18} fill="#1b2220" />
      <text x={d.depot[0] + 14} y={d.depot[1] + 5} fontSize={14} className="fill-ink font-sans" stroke="#f6f4ef" strokeWidth={4} paintOrder="stroke">
        Depot
      </text>
      {truck && (
        <g transform={`translate(${truck.x} ${truck.y})`}>
          <circle r={11} fill="#b8452a" opacity={0.2} />
          <rect x={-7} y={-5} width={14} height={10} rx={2} fill="#1b2220" />
        </g>
      )}
    </svg>
  )
}

function Architecture({ p }: { p: number }) {
  const t = seg(p, 0.05, 0.85)
  const apps = [
    { name: 'Customer app', y: 70 },
    { name: 'Driver app', y: 200 },
    { name: 'Field Manager app', y: 330 },
  ]
  const services = [
    { name: 'ArcGIS Online', sub: 'feature services', y: 140 },
    { name: 'GraphHopper', sub: 'self-hosted routing', y: 280 },
  ]
  return (
    <div className="flex h-full flex-col justify-center border border-ink/80 bg-surface p-5">
      <svg viewBox="0 0 640 400" className="w-full" role="img" aria-label="App and service architecture">
        {apps.map((a, i) => (
          <g key={a.name} opacity={seg(t, i * 0.1, i * 0.1 + 0.2)}>
            <rect x={20} y={a.y - 34} width={150} height={68} rx={10} fill="#fffefb" stroke="#1b2220" />
            <rect x={34} y={a.y - 22} width={14} height={24} rx={2.5} fill="none" stroke="#1b2220" strokeWidth={1.4} />
            <text x={58} y={a.y - 4} fontSize={13} className="fill-ink font-sans">
              {a.name}
            </text>
            <text x={58} y={a.y + 14} fontSize={10.5} className="fill-ink-3 font-mono">
              Kotlin · offline queue
            </text>
          </g>
        ))}
        {services.map((s, i) => (
          <g key={s.name} opacity={seg(t, 0.3 + i * 0.1, 0.5 + i * 0.1)}>
            <rect x={420} y={s.y - 32} width={196} height={64} fill={i === 0 ? '#1b2220' : '#fffefb'} stroke="#1b2220" />
            <text x={436} y={s.y - 4} fontSize={14} className={i === 0 ? 'fill-paper font-sans' : 'fill-ink font-sans'}>
              {s.name}
            </text>
            <text x={436} y={s.y + 15} fontSize={10.5} className={i === 0 ? 'fill-paper/70 font-mono' : 'fill-ink-3 font-mono'} opacity={i === 0 ? 0.75 : 1}>
              {s.sub}
            </text>
          </g>
        ))}
        {apps.map((a, i) =>
          services.map((s, j) => {
            if (j === 1 && i === 0) return null
            const id = `l${i}${j}`
            const dpath = `M170 ${a.y} C 300 ${a.y}, 300 ${s.y}, 420 ${s.y}`
            const on = seg(t, 0.45 + (i + j) * 0.06, 0.65 + (i + j) * 0.06)
            return (
              <g key={id} opacity={on}>
                <path id={id} d={dpath} fill="none" stroke={j === 0 ? '#1b2220' : '#b8452a'} strokeWidth={1.2} strokeDasharray={j === 1 ? '4 3' : undefined} />
                <circle r={3.5} fill={j === 0 ? '#1b2220' : '#b8452a'}>
                  <animateMotion dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" path={dpath} />
                </circle>
              </g>
            )
          }),
        )}
        <text x={300} y={388} textAnchor="middle" fontSize={11} className="fill-ink-3 font-mono" opacity={seg(t, 0.8, 1)}>
          edits captured offline, synced when connectivity returns
        </text>
      </svg>
    </div>
  )
}
