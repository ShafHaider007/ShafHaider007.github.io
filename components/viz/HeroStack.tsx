'use client'

import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { viz } from '@/lib/viz'

const BANDS = [
  { id: 'B02', name: 'Blue', nm: 490, tint: '#406ebe' },
  { id: 'B03', name: 'Green', nm: 560, tint: '#3c965a' },
  { id: 'B04', name: 'Red', nm: 665, tint: '#c44030' },
  { id: 'B08', name: 'NIR', nm: 842, tint: '#962846' },
  { id: 'B11', name: 'SWIR 1', nm: 1610, tint: '#b06e28' },
  { id: 'B12', name: 'SWIR 2', nm: 2190, tint: '#785232' },
]

const STAGES = [
  {
    key: 'bands',
    label: 'Spectral bands',
    note: 'Six of the thirteen Sentinel-2 bands, each a separate measurement of reflected light.',
    alt: 'Six Sentinel-2 band images of Islamabad stacked in layers, from blue to shortwave infrared.',
  },
  {
    key: 'true',
    label: 'True colour',
    note: 'Red, green and blue bands combined: what the eye would see from orbit.',
    alt: 'Sentinel-2 true-colour image of Islamabad: the Margalla Hills at the top, the city grid in the middle and Rawal Lake on the right.',
  },
  {
    key: 'ndvi',
    label: 'NDVI',
    note: '(NIR − Red) / (NIR + Red): healthy vegetation reflects strongly in the near infrared.',
    alt: 'Vegetation index map of Islamabad: dense green over the hills and green belts, pale over built-up blocks and roads.',
  },
  {
    key: 'landcover',
    label: 'Land cover',
    note: 'A random forest trained on ESA WorldCover labels assigns every 10 m pixel a class.',
    alt: 'Land-cover map of Islamabad: forest, shrub and grass, cropland, built-up land, bare ground and water.',
  },
] as const

const LEGEND = [
  ['Forest', '#265c3a'],
  ['Shrub & grass', '#c4c480'],
  ['Cropland', '#e2be5c'],
  ['Built-up', '#b8452a'],
  ['Bare', '#d6cab6'],
  ['Water', '#588caa'],
] as const

const GAP = 34

/**
 * The same 16 × 12 km of Islamabad as a stack: six Sentinel-2 bands fan out, then combine into true colour, NDVI and a
 * land-cover map. It steps through the stages on its own (with a pause button), and holds still with reduced motion.
 */
export function HeroStack() {
  const reduced = usePrefersReducedMotion()
  const [stage, setStage] = useState(0)
  const [hover, setHover] = useState(false)
  const [stopped, setStopped] = useState(false)
  const holdUntil = useRef(0)
  const wrap = useRef<HTMLDivElement>(null)
  const playing = !reduced && !stopped && !hover

  useEffect(() => {
    if (reduced) {
      setStage(1)
      return
    }
    if (!playing) return
    const id = window.setInterval(() => {
      if (Date.now() < holdUntil.current) return
      setStage((s) => (s + 1) % STAGES.length)
    }, 3600)
    return () => window.clearInterval(id)
  }, [playing, reduced])

  // gentle scroll-linked tilt as the stack leaves the viewport
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const on = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const t = Math.min(1, window.scrollY / (window.innerHeight * 0.9))
        wrap.current?.style.setProperty('--tilt', String(t))
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => {
      window.removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const exploded = STAGES[stage].key === 'bands'
  const product = STAGES[stage].key

  return (
    <div className="relative overflow-hidden lg:overflow-visible" ref={wrap} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div role="img" aria-label={STAGES[stage].alt} className="relative mx-auto aspect-[4/3.35] w-full max-w-[640px] [perspective:2200px]">
        <div
          className="absolute inset-[9%_10%_14%_6%] transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d]"
          style={{
            transform: reduced
              ? 'none'
              : `rotateX(calc(${exploded ? 56 : 50}deg + var(--tilt, 0) * 8deg)) rotateZ(${exploded ? -34 : -28}deg) translateZ(${exploded ? -70 : 0}px)`,
          }}
        >
          {/* soft ground shadow */}
          <div
            aria-hidden
            className="absolute inset-0 bg-ink/25 blur-2xl transition-opacity duration-700"
            style={{ transform: 'translateZ(-40px)', opacity: reduced ? 0 : 0.5 }}
          />
          {BANDS.map((b, i) => (
            <div
              key={b.id}
              aria-hidden
              className="absolute inset-0 border border-ink/30 bg-surface transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] [transform-style:preserve-3d]"
              style={{
                transform: `translateZ(${exploded ? i * GAP : 0}px)`,
                transitionDelay: exploded ? `${i * 70}ms` : `${(BANDS.length - i) * 40}ms`,
                opacity: exploded || i === BANDS.length - 1 ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viz(`hero/${b.id}.webp`)} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          ))}
          {(['true', 'ndvi', 'landcover'] as const).map((k) => (
            <div
              key={k}
              aria-hidden
              className="absolute inset-0 border border-ink/40 transition-[opacity,transform] duration-700"
              style={{
                transform: `translateZ(${exploded ? BANDS.length * GAP : 1}px)`,
                opacity: product === k ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={viz(`hero/${k}.webp`)} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          ))}
        </div>
        {/* band legend (2D, so it is never hidden behind the stack) */}
        <ul
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-[1%] top-0 z-20 hidden space-y-1 transition-opacity duration-500 sm:block',
            exploded ? 'opacity-100' : 'opacity-0',
          )}
        >
          {[...BANDS].reverse().map((b, i) => (
            <li
              key={b.id}
              className="flex items-center gap-2 font-mono text-[11px] transition-[opacity,transform] duration-500"
              style={{ transitionDelay: exploded ? `${300 + i * 60}ms` : '0ms', transform: exploded ? 'none' : 'translateX(6px)' }}
            >
              <span className="h-2.5 w-2.5" style={{ background: b.tint }} />
              <span className="font-medium text-ink">{b.id}</span>
              <span className="text-ink-2">{b.name}</span>
              <span className="text-ink-3">{b.nm} nm</span>
            </li>
          ))}
        </ul>
      </div>

      {/* stage controls */}
      <div className="mx-auto mt-1 max-w-[640px]">
        <div className="flex items-start gap-3" data-print-hide>
          <div className="grid flex-1 grid-cols-4 gap-1.5" role="group" aria-label="Processing stage">
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-pressed={stage === i}
                onClick={() => {
                  setStage(i)
                  holdUntil.current = Date.now() + 7000
                }}
                className="group text-left"
              >
                <span className="relative block h-[2px] overflow-hidden bg-line">
                  <span
                    className={cn('absolute inset-y-0 left-0 bg-ink', stage === i && playing ? 'animate-[grow_3.6s_linear]' : '')}
                    style={{ width: stage >= i ? '100%' : '0%', opacity: stage >= i ? 1 : 0 }}
                  />
                </span>
                <span className={cn('mt-2 block font-mono text-[11.5px] leading-tight transition-colors', stage === i ? 'text-ink' : 'text-ink-3 group-hover:text-ink-2')}>
                  {String(i + 1).padStart(2, '0')} {s.label}
                </span>
              </button>
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setStopped((v) => !v)}
              aria-pressed={stopped}
              className="mt-[-3px] shrink-0 border border-line px-2 py-1 font-mono text-[11.5px] text-ink-2 hover:border-ink hover:text-ink"
            >
              {stopped ? 'Play' : 'Pause'}
            </button>
          )}
        </div>
        <p className="mt-3 min-h-[2.8em] text-[13.5px] leading-snug text-ink-2" aria-live="polite">
          {STAGES[stage].note}
        </p>
        <div className={cn('flex flex-wrap gap-x-3 gap-y-1 transition-opacity duration-500', product === 'landcover' ? 'opacity-100' : 'opacity-0')} aria-hidden={product !== 'landcover'}>
          {LEGEND.map(([n, c]) => (
            <span key={n} className="flex items-center gap-1.5 text-[11.5px] text-ink-2">
              <span className="h-2.5 w-2.5" style={{ background: c }} />
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
