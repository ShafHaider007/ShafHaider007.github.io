'use client'

import { type ElementType, type ReactNode, useRef } from 'react'
import { EASE, gsap, reducedMotion, SplitText, useGSAP } from './gsap'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Animate these descendants one after another instead of the wrapper itself. */
  stagger?: string
  y?: number
  delay?: number
  start?: string
}

/** Fade and rise into place when scrolled into view. */
export function Reveal({ children, className, as: Tag = 'div', stagger, y = 26, delay = 0, start = 'top 86%' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return
      const targets = stagger ? ref.current.querySelectorAll(stagger) : ref.current
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE,
        delay,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: ref.current, start, once: true },
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Heading whose lines slide up out of a mask. */
export function SplitHeading({
  children,
  as: Tag = 'h2',
  className,
  start = 'top 88%',
  immediate,
  delay = 0,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  start?: string
  immediate?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (!ref.current) return
      if (reducedMotion()) {
        ref.current.style.visibility = 'visible'
        return
      }
      const split = SplitText.create(ref.current, { type: 'lines,words', mask: 'lines', linesClass: 'split-line' })
      gsap.set(ref.current, { visibility: 'visible' })
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.035,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start, once: true },
      })
      return () => split.revert()
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={cn('split-heading', className)}>
      {children}
    </Tag>
  )
}

/** Paragraph whose words brighten as it scrolls through the viewport (scrubbed). */
export function ScrubText({ children, className, as: Tag = 'p' }: { children: ReactNode; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return
      const split = SplitText.create(ref.current, { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 52%', scrub: 0.6 },
        },
      )
      return () => split.revert()
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Counts the number inside `value` up from zero when it enters the viewport ("28%" -> 0…28%). */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion()) return
      const m = value.match(/(\d+(?:\.\d+)?)/)
      if (!m) return
      const target = parseFloat(m[1])
      const digits = (m[1].split('.')[1] ?? '').length
      const [pre, post] = [value.slice(0, m.index), value.slice((m.index ?? 0) + m[1].length)]
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${pre}${obj.v.toFixed(digits)}${post}`
        },
        onStart: () => {
          el.textContent = `${pre}${(0).toFixed(digits)}${post}`
        },
      })
    },
    { scope: ref },
  )
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}

/** Horizontal rule that draws from left to right on enter. */
export function DrawRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (reducedMotion() || !ref.current) return
      gsap.from(ref.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.3,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      })
    },
    { scope: ref },
  )
  return <div ref={ref} className={cn('h-px w-full bg-ink', className)} />
}
