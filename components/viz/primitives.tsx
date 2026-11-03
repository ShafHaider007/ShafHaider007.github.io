'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { viz } from '@/lib/viz'

/** Full-bleed image layer inside a positioned parent. */
export function Layer({
  src,
  alt = '',
  style,
  className,
  pixelated,
}: {
  src: string
  alt?: string
  style?: CSSProperties
  className?: string
  pixelated?: boolean
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={viz(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn('absolute inset-0 h-full w-full select-none object-cover', pixelated && '[image-rendering:pixelated]', className)}
      style={style}
    />
  )
}

/** A map sheet: hairline frame, fixed aspect, children stacked absolutely; caption strip underneath. */
export function Sheet({
  aspect,
  children,
  footer,
  className,
}: {
  aspect: number
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <figure className={cn('flex h-full w-full flex-col items-center justify-center', className)}>
      <div className="flex max-h-full w-full flex-col border border-ink/80 bg-surface p-[5px]" style={{ maxWidth: `calc((100% ) )` }}>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: String(aspect), maxHeight: 'calc(100% - 2rem)' }}>
          {children}
        </div>
        {footer && <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 pt-2 font-mono text-[10.5px] leading-snug text-ink-3">{footer}</figcaption>}
      </div>
    </figure>
  )
}

/** Fit a fixed-aspect box inside the available space (both width and height constrained). */
export function Fit({ aspect, children, className }: { aspect: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const W = e.contentRect.width
      const H = e.contentRect.height
      const w = Math.min(W, H * aspect)
      setSize({ w, h: w / aspect })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [aspect])
  return (
    <div ref={ref} className={cn('flex h-full w-full items-center justify-center', className)}>
      {size && (
        <div className="relative" style={{ width: size.w, height: size.h }}>
          {children}
        </div>
      )}
    </div>
  )
}

/** Framed figure that fills its parent while keeping the data aspect ratio. */
export function Figure({
  aspect,
  children,
  footer,
  topLeft,
  topRight,
}: {
  aspect: number
  children: ReactNode
  footer?: ReactNode
  topLeft?: ReactNode
  topRight?: ReactNode
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-0 flex-1">
        <Fit aspect={aspect}>
          <div className="absolute inset-0 border border-ink/80 bg-surface p-[5px]">
            <div className="relative h-full w-full overflow-hidden">{children}</div>
          </div>
          {topLeft && <div className="absolute left-[14px] top-[14px] z-10">{topLeft}</div>}
          {topRight && <div className="absolute right-[14px] top-[14px] z-10">{topRight}</div>}
        </Fit>
      </div>
      {footer && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-2.5 font-mono text-[10.5px] leading-snug text-ink-3">
          {footer}
        </div>
      )}
    </div>
  )
}

/** Vertical wipe between two layers; `t` = 0 shows `a`, 1 shows `b`. */
export function Wipe({ a, b, t, labelA, labelB }: { a: ReactNode; b: ReactNode; t: number; labelA?: string; labelB?: string }) {
  const pct = Math.round(t * 1000) / 10
  return (
    <>
      <div className="absolute inset-0">{a}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        {b}
      </div>
      {t > 0.001 && t < 0.999 && <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-surface shadow-[0_0_0_1px_rgba(27,34,32,0.35)]" style={{ left: `${pct}%` }} />}
      {labelB && <Chip className="absolute left-2.5 top-2.5" style={{ opacity: t > 0.08 ? 1 : 0 }}>{labelB}</Chip>}
      {labelA && <Chip className="absolute right-2.5 top-2.5" style={{ opacity: t < 0.92 ? 1 : 0 }}>{labelA}</Chip>}
    </>
  )
}

export function Chip({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={cn('rounded-[2px] bg-surface/90 px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink transition-opacity duration-300', className)}
      style={style}
    >
      {children}
    </span>
  )
}

export function Legend({ items, className }: { items: { label: string; color: string; ring?: boolean }[]; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-x-3 gap-y-1', className)}>
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5 font-sans text-[11.5px] normal-case tracking-normal text-ink-2">
          <span className={cn('inline-block h-2.5 w-2.5', it.ring && 'rounded-full')} style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

/** Number that eases toward its target value. */
export function Count({ value, digits = 0, suffix = '', prefix = '' }: { value: number; digits?: number; suffix?: string; prefix?: string }) {
  const [v, setV] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = performance.now()
    const a = from.current
    let raf = 0
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 700)
      const e = 1 - Math.pow(1 - k, 3)
      setV(a + (value - a) * e)
      if (k < 1) raf = requestAnimationFrame(step)
      else from.current = value
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return (
    <>
      {prefix}
      {v.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits })}
      {suffix}
    </>
  )
}

export const rgb = (c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`

/** Small "method demonstration" note placed under a story. */
export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 border-l-2 border-accent pl-4 text-[13.5px] leading-relaxed text-ink-2">
      <p className="eyebrow mb-1.5">About these figures</p>
      {children}
    </div>
  )
}
