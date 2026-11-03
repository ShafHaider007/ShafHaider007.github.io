'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, reducedMotion, ScrollTrigger } from './gsap'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and Lenis share one clock. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (reducedMotion()) return
    // anchors stay off: same-page links go through scrollToId, and Next.js handles /#section on arrival
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2) })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  // new page: start at the top and re-measure triggers once images and fonts settle
  useEffect(() => {
    // Next.js already scrolls to a #section on arrival (e.g. /#experience from a project page); just tell Lenis
    // where the page now is so it does not glide back to its old position. Otherwise start at the top.
    const lenis = window.__lenis
    // the new page has a different height: re-measure first, or Lenis clamps to the old page's scroll limit
    lenis?.resize()
    if (window.location.hash) {
      requestAnimationFrame(() => {
        lenis?.resize()
        lenis?.scrollTo(window.scrollY, { immediate: true, force: true })
      })
    } else {
      lenis?.scrollTo(0, { immediate: true, force: true })
    }
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('load', onLoad)
    }
  }, [pathname])

  return <>{children}</>
}

/** Scroll to an in-page anchor through Lenis when it is running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -64 })
  else el.scrollIntoView({ behavior: 'smooth' })
  return true
}
