import type Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
let initialized = false

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function initLenisScrollTrigger() {
  if (typeof window === 'undefined' || initialized) return

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && value !== undefined && lenisInstance) {
        lenisInstance.scrollTo(value, { immediate: true })
      }
      return lenisInstance?.scroll ?? window.scrollY
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  })

  ScrollTrigger.defaults({ scroller: document.documentElement })
  ScrollTrigger.refresh()
  initialized = true
}

export function destroyLenisScrollTrigger() {
  if (!initialized) return
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  ScrollTrigger.clearMatchMedia()
  lenisInstance = null
  initialized = false
}

export function refreshScrollTrigger() {
  if (typeof window === 'undefined') return
  requestAnimationFrame(() => ScrollTrigger.refresh())
}
