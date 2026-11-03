'use client'

import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/paths'

export const viz = (path: string) => asset(`/viz/${path}`)

const cache = new Map<string, Promise<unknown>>()

/** Fetch a JSON file from /public/viz once per page load. */
export function useVizJson<T>(path: string): T | null {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    let live = true
    const url = viz(path)
    if (!cache.has(url)) cache.set(url, fetch(url).then((r) => r.json()))
    cache.get(url)!.then((d) => live && setData(d as T))
    return () => {
      live = false
    }
  }, [path])
  return data
}

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Map t from [a,b] to [0,1], clamped. */
export const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(m.matches)
    const on = () => setReduced(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduced
}

/** Progress (0-1) of an element through the viewport: 0 when its top reaches the bottom edge, 1 when its
 *  bottom reaches `endAt` (fraction of viewport height from the top). */
export function useSectionProgress<T extends HTMLElement>(endAt = 0.35) {
  const ref = useRef<T | null>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = r.height + vh * (1 - endAt)
      const v = clamp((vh - r.top) / total)
      setP((old) => (Math.abs(old - v) < 0.002 ? old : Math.round(v * 500) / 500))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [endAt])
  return [ref, p] as const
}

export const fmt = (n: number, digits = 0) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits })
