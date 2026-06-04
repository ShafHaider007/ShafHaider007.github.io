'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  destroyLenisScrollTrigger,
  initLenisScrollTrigger,
  refreshScrollTrigger,
  setLenisInstance,
} from '@/lib/scroll/lenis-scroll-trigger'

export function ScrollStoryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useLenis((lenis) => {
    setLenisInstance(lenis)
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    return () => {
      lenis.off('scroll', onScroll)
    }
  })

  useEffect(() => {
    initLenisScrollTrigger()
    return () => destroyLenisScrollTrigger()
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => refreshScrollTrigger(), 150)
    return () => window.clearTimeout(timeout)
  }, [pathname])

  return <>{children}</>
}
