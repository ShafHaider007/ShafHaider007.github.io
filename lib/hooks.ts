'use client'

import { useEffect, useRef, useState } from 'react'

/** True when the reader has asked the system for reduced motion. */
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

/**
 * Reveal-on-scroll state for a figure. It starts in its final state, which is what readers without JavaScript, printers
 * and anyone who prefers reduced motion get. Only when the figure starts out of view does it reset, so it can animate in
 * the first time it is at least `threshold` visible.
 */
export function useReveal<T extends Element>(threshold = 0.5) {
  const ref = useRef<T | null>(null)
  const [on, setOn] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return
    setOn(false)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, on] as const
}
