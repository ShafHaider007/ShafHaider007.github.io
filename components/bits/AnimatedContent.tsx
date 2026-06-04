'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: string | ((progress: number) => number)
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  onComplete?: () => void
}

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
}: AnimatedContentProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }

    const axis = direction === 'horizontal' ? 'x' : 'y'
    const offset = reverse ? -distance : distance
    const startPct = (1 - threshold) * 100

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    })

    const tween = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        toggleActions: 'play none none none',
        once: true,
        onRefresh: (self) => {
          scrollTriggerRef.current = self
        },
      },
    })

    scrollTriggerRef.current = tween.scrollTrigger ?? null

    return () => {
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
      gsap.killTweensOf(el)
    }
  }, [
    animateOpacity,
    delay,
    direction,
    distance,
    duration,
    ease,
    initialOpacity,
    onComplete,
    reverse,
    scale,
    threshold,
    reduced,
  ])

  return <div ref={ref}>{children}</div>
}

export default AnimatedContent
