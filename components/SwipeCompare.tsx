'use client'

import Image, { type StaticImageData } from 'next/image'
import { useCallback, useRef, useState } from 'react'

type Props = {
  before: StaticImageData
  after: StaticImageData
  beforeLabel?: string
  afterLabel?: string
  alt: string
}

/** Drag or use arrow keys to wipe between two co-registered images. */
export function SwipeCompare({ before, after, beforeLabel = 'True colour', afterLabel = 'NDVI', alt }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  return (
    <div className="border border-ink/80 bg-surface p-[5px]">
      <div
        ref={box}
        className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          move(e.clientX)
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e.clientX)
        }}
      >
        <Image src={before} alt={`${alt}, ${beforeLabel.toLowerCase()}`} placeholder="blur" sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={after} alt={`${alt}, ${afterLabel}`} placeholder="blur" sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-surface" style={{ left: `${pos}%` }} />
        <button
          type="button"
          role="slider"
          aria-label="Comparison position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
          }}
          className="absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink bg-surface text-ink shadow-sm"
          style={{ left: `${pos}%` }}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M6 4 2 8l4 4M10 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-[2px] bg-surface/90 px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-[2px] bg-surface/90 px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">
          {afterLabel}
        </span>
      </div>
      <div className="flex items-center gap-3 px-1 pb-0.5 pt-2.5 font-mono text-[10px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-3 bg-[#bed2da]" /> water
        </span>
        <span className="ml-2">NDVI 0</span>
        <span
          className="h-2 max-w-48 flex-1"
          style={{ background: 'linear-gradient(90deg,#c9b280,#e2d68c 36%,#a0be64 55%,#549646 74%,#1a5e30)' }}
        />
        <span>0.8</span>
      </div>
    </div>
  )
}
