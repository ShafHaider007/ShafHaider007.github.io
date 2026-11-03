'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Scrolly, type ScrollState } from '@/components/scrolly/Scrolly'
import { Chip, DemoNote, Fit } from '@/components/viz/primitives'
import { seg, useVizJson, viz } from '@/lib/viz'
import { basePath } from '@/lib/paths'
import { cn } from '@/lib/utils'

type Data = {
  bounds: [number, number, number, number]
  minzoom: number
  maxzoom: number
  counts: Record<string, number>
  bytes: { relief: number; forest: number }
  qa: { check: string; value: string; ok: boolean }[]
  tiles: Record<string, [number, number][]>
}

export function NfmsStory() {
  const d = useVizJson<Data>('nfms/nfms.json')
  const steps = useMemo(() => buildSteps(d), [d])
  return (
    <>
      <Scrolly steps={steps} graphic={(s) => (d ? <Graphic d={d} s={s} /> : <div className="h-full animate-pulse bg-line/40" />)} />
      <DemoNote>
        Rebuilt for this site with two open national layers, the Copernicus 90 m elevation model and ESA WorldCover 2021
        forest cover, cut into the tiles used by the map above. The real NFMS pipeline handles the platform’s own forest,
        land-cover and reporting layers.
      </DemoNote>
    </>
  )
}

function buildSteps(d: Data | null) {
  const total = d ? Object.values(d.counts).reduce((a, b) => a + b, 0) : 0
  return [
    {
      kicker: 'Inputs',
      title: 'Why don’t national layers line up?',
      body: (
        <>
          <p>
            A forest platform takes maps from many sources. They come in different projections, cell sizes, data types
            and ways of marking missing data. Shown as they are, they do not line up and they load slowly.
          </p>
          <p>The first job is to bring them all onto one grid.</p>
        </>
      ),
    },
    {
      kicker: 'Checks',
      title: 'How do we stop bad data reaching the map?',
      body: (
        <>
          <p>
            Every layer goes through automatic checks before it is published: coverage, value ranges, class codes and
            projection. If a layer fails, the run stops instead of putting a broken map online.
          </p>
        </>
      ),
    },
    {
      kicker: 'Tiles',
      title: 'How can a huge raster load quickly in a browser?',
      body: (
        <>
          <p>
            Each layer is cut into small 256-pixel tiles for every zoom level and packed as MBTiles. The browser only asks
            for the few tiles on screen.
          </p>
          <p>
            This example has {total || '…'} tiles across zoom levels {d?.minzoom ?? 5} to {d?.maxzoom ?? 9}. Each level has
            about four times as many tiles as the one above it.
          </p>
        </>
      ),
    },
    {
      kicker: 'The map',
      title: 'What does the user get?',
      body: (
        <>
          <p>
            A map that responds at once. Try it: drag to move, hold Ctrl or ⌘ and scroll to zoom (two fingers on a phone),
            and switch the forest layer on and off.
          </p>
          <p className="text-[13px] text-ink-3">Relief from Copernicus GLO-90. Forest from ESA WorldCover 2021.</p>
        </>
      ),
    },
  ]
}

function Graphic({ d, s }: { d: Data; s: ScrollState }) {
  const { step, progress: p } = s
  if (step === 0) return <Pipeline p={p} stage={0} />
  if (step === 1) return <QaPanel d={d} p={p} />
  if (step === 2) return <Pyramid d={d} p={p} />
  return <LiveMap d={d} />
}

/* ---------- pipeline diagram ---------- */

function Pipeline({ p }: { p: number; stage: number }) {
  const inputs = [
    { name: 'Copernicus DEM', meta: 'EPSG:4326 · 90 m · float32' },
    { name: 'ESA WorldCover', meta: 'EPSG:4326 · 10 m · uint8 classes' },
    { name: 'Forest inventory', meta: 'UTM 42N/43N · vector plots' },
    { name: 'Boundaries', meta: 'shapefile · mixed CRS' },
  ]
  const stages = ['Harmonise', 'QA/QC', 'Tile', 'Publish']
  const t = seg(p, 0.05, 0.85)
  return (
    <div className="flex h-full flex-col justify-center border border-ink/80 bg-surface p-5">
      <svg viewBox="0 0 640 400" className="w-full" role="img" aria-label="Raster pipeline">
        {inputs.map((inp, i) => {
          const y = 40 + i * 90
          return (
            <g key={inp.name} opacity={seg(t, i * 0.06, i * 0.06 + 0.2)}>
              <rect x={4} y={y - 26} width={200} height={52} fill="#fffefb" stroke="#1b2220" strokeWidth={1} />
              <text x={16} y={y - 4} fontSize={13.5} className="fill-ink font-sans">
                {inp.name}
              </text>
              <text x={16} y={y + 14} fontSize={10.5} className="fill-ink-3 font-mono">
                {inp.meta}
              </text>
              <path
                d={`M204 ${y} C 260 ${y}, 260 200, 300 200`}
                fill="none"
                stroke="#b8452a"
                strokeWidth={1.4}
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - seg(t, 0.15 + i * 0.05, 0.45 + i * 0.05)}
              />
            </g>
          )
        })}
        {stages.map((st, i) => {
          const x = 300 + i * 86
          const on = seg(t, 0.45 + i * 0.12, 0.55 + i * 0.12)
          return (
            <g key={st}>
              {i > 0 && <line x1={x - 86 + 70} x2={x} y1={200} y2={200} stroke="#1b2220" strokeWidth={1.2} opacity={on} />}
              <rect x={x} y={176} width={70} height={48} fill={on > 0.5 ? '#1b2220' : '#fffefb'} stroke="#1b2220" strokeWidth={1} style={{ transition: 'fill 300ms' }} />
              <text x={x + 35} y={205} textAnchor="middle" fontSize={11.5} className={cn('font-sans', on > 0.5 ? 'fill-paper' : 'fill-ink')}>
                {st}
              </text>
            </g>
          )
        })}
        <g opacity={seg(t, 0.9, 1)}>
          <text x={300} y={262} fontSize={11} className="fill-ink-3 font-mono">
            one grid · EPSG:3857 · 256 px tiles · zoom 5–9
          </text>
        </g>
      </svg>
      <p className="mt-2 font-mono text-[10.5px] text-ink-3">Python · GDAL · rasterio · MBTiles</p>
    </div>
  )
}

function QaPanel({ d, p }: { d: Data; p: number }) {
  const t = seg(p, 0.05, 0.8)
  const rows = [
    ...d.qa,
    { check: 'Tiles cut', value: `${Object.values(d.counts).reduce((a, b) => a + b, 0)} per layer, zoom 5–9`, ok: true },
    { check: 'Payload', value: `${((d.bytes.relief + d.bytes.forest) / 1e6).toFixed(1)} MB for both layers`, ok: true },
  ]
  return (
    <div className="flex h-full flex-col justify-center border border-ink/80 bg-surface p-6">
      <p className="eyebrow">Automated QA/QC · this run</p>
      <ul className="mt-4 divide-y divide-line">
        {rows.map((r, i) => {
          const on = seg(t, i / rows.length, (i + 0.8) / rows.length)
          return (
            <li key={r.check} className="grid grid-cols-[1.4rem_1fr_auto] items-baseline gap-3 py-3" style={{ opacity: 0.25 + 0.75 * on }}>
              <span className={cn('grid h-5 w-5 place-items-center rounded-full border text-[11px] transition-colors', on > 0.6 ? 'border-[#2f6b4a] bg-[#2f6b4a] text-white' : 'border-line text-transparent')}>
                ✓
              </span>
              <span className="text-[14px] text-ink">{r.check}</span>
              <span className="text-right font-mono text-[11.5px] text-ink-2">{r.value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- 3D tile pyramid ---------- */

function Pyramid({ d, p }: { d: Data; p: number }) {
  const levels = ['5', '6', '7', '8']
  const explode = seg(p, 0.05, 0.6)
  const [x0, y0, x1, y1] = useMemo(() => {
    const t = d.tiles['8']
    const xs = t.map((q) => q[0])
    const ys = t.map((q) => q[1])
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs) + 1, Math.max(...ys) + 1]
  }, [d])
  const aspect = (x1 - x0) / (y1 - y0)
  return (
    <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] gap-3">
      <div className="relative min-h-0 overflow-hidden border border-ink/80 bg-surface [perspective:1600px]">
        <Fit aspect={aspect}>
          <div
            className="absolute inset-[22%_24%_18%_20%] [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${52 * explode}deg) rotateZ(${-28 * explode}deg) translateZ(${-40 * explode}px)` }}
          >
            {levels.map((z, li) => {
              const k = 2 ** (8 - Number(z))
              return (
                <div
                  key={z}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                  style={{ transform: `translateZ(${li * 46 * explode}px)`, opacity: li === levels.length - 1 ? 1 : 0.35 + 0.65 * explode }}
                >
                  <div className="absolute inset-0 overflow-hidden shadow-[0_0_0_1px_rgba(27,34,32,0.25)]">
                  {d.tiles[z].map(([x, y]) => {
                    // tile footprint expressed in zoom-8 tile units
                    const left = ((x * k - x0) / (x1 - x0)) * 100
                    const top = ((y * k - y0) / (y1 - y0)) * 100
                    const size = (k / (x1 - x0)) * 100
                    const sizeY = (k / (y1 - y0)) * 100
                    return (
                      <div
                        key={`${x}-${y}`}
                        className="absolute overflow-hidden outline outline-1 outline-white/70"
                        style={{ left: `${left}%`, top: `${top}%`, width: `${size}%`, height: `${sizeY}%` }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={viz(`nfms/tiles/relief/${z}/${x}/${y}.webp`)} alt="" className="absolute inset-0 h-full w-full" loading="lazy" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={viz(`nfms/tiles/forest/${z}/${x}/${y}.webp`)} alt="" className="absolute inset-0 h-full w-full" loading="lazy" />
                      </div>
                    )
                  })}
                  </div>
                  <span
                    className="absolute -left-2 top-0 origin-right -translate-x-full whitespace-nowrap font-mono text-[11px] text-ink"
                    style={{ transform: `translateX(-100%) rotateZ(${30 * explode}deg) rotateX(${-58 * explode}deg)`, opacity: explode > 0.5 ? 1 : 0 }}
                  >
                    z{z} · {d.counts[z]} tiles
                  </span>
                </div>
              )
            })}
          </div>
        </Fit>
      </div>
      <div className="flex items-end gap-2">
        {Object.entries(d.counts).map(([z, n]) => {
          const max = Math.max(...Object.values(d.counts))
          return (
            <div key={z} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[10.5px] text-ink-2">{n}</span>
              <span className="w-full bg-ink/80" style={{ height: `${6 + (n / max) * 36}px` }} />
              <span className="font-mono text-[10.5px] text-ink-3">z{z}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- live map (MapLibre) ---------- */

function LiveMap({ d }: { d: Data }) {
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<import('maplibre-gl').Map | null>(null)
  const [forest, setForest] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const maplibregl = (await import('maplibre-gl')).default
      if (cancelled || !el.current) return
      const root = `${window.location.origin}${basePath}/viz/nfms/tiles`
      const [w, s, e, n] = d.bounds
      const m = new maplibregl.Map({
        container: el.current,
        style: {
          version: 8,
          sources: {
            relief: { type: 'raster', tiles: [`${root}/relief/{z}/{x}/{y}.webp`], tileSize: 256, minzoom: 5, maxzoom: 9, bounds: d.bounds },
            forest: { type: 'raster', tiles: [`${root}/forest/{z}/{x}/{y}.webp`], tileSize: 256, minzoom: 5, maxzoom: 9, bounds: d.bounds },
          },
          layers: [
            { id: 'bg', type: 'background', paint: { 'background-color': '#f6f4ef' } },
            { id: 'relief', type: 'raster', source: 'relief' },
            { id: 'forest', type: 'raster', source: 'forest', paint: { 'raster-opacity': 0.9 } },
          ],
        },
        bounds: [
          [w + 1.2, s + 1.4],
          [e - 0.8, n - 0.6],
        ],
        maxBounds: [
          [w - 1, s - 1],
          [e + 1, n + 1],
        ],
        minZoom: 5,
        maxZoom: 10.5,
        attributionControl: false,
        cooperativeGestures: true,
        dragRotate: false,
      })
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      m.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-left')
      m.on('load', () => setReady(true))
      map.current = m
    })()
    return () => {
      cancelled = true
      map.current?.remove()
      map.current = null
    }
  }, [d])

  useEffect(() => {
    if (map.current && ready) map.current.setLayoutProperty('forest', 'visibility', forest ? 'visible' : 'none')
  }, [forest, ready])

  return (
    <div className="flex h-full flex-col">
      <div className="relative min-h-0 flex-1 border border-ink/80 bg-surface p-[5px]">
        <div ref={el} className="h-full w-full" aria-label="Interactive map of forest cover in northern Pakistan" />
        <div className="absolute left-4 top-4 z-10 flex gap-1.5">
          <button
            type="button"
            onClick={() => setForest((f) => !f)}
            className={cn('border px-2.5 py-1.5 text-[12px] font-medium transition-colors', forest ? 'border-[#265c3a] bg-[#265c3a] text-white' : 'border-ink bg-surface text-ink')}
          >
            Forest cover {forest ? 'on' : 'off'}
          </button>
          <Chip className="self-center">zoom 5–9 tiles</Chip>
        </div>
      </div>
      <div className="flex justify-between pt-2.5 font-mono text-[10.5px] text-ink-3">
        <span>MapLibre GL · raster tiles from this site</span>
        <span>Copernicus GLO-90 · ESA WorldCover 2021</span>
      </div>
    </div>
  )
}
