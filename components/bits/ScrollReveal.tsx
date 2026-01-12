'use client'

import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps<T extends ElementType = 'div'> = {
  children: ReactNode
  enableBlur?: boolean
  baseOpacity?: number
  stagger?: number
  once?: boolean
  scrollContainerRef?: React.RefObject<HTMLElement | null>
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'children'>

export default function ScrollReveal<T extends ElementType = 'div'>(props: ScrollRevealProps<T>) {
  const {
    children,
    className,
    enableBlur = false,
    baseOpacity = 0,
    stagger = 0.08,
    once = true,
    scrollContainerRef,
    as,
    ...rest
  } = props
  const rootRef = useRef<HTMLDivElement | null>(null)
  const spansRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const root = rootRef.current
    if (!root || spansRef.current.length === 0) return

    const ctx = gsap.context(() => {
      const targets = spansRef.current
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          end: 'bottom 40%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          scroller: scrollContainerRef?.current ?? undefined,
        },
      })

      timeline.fromTo(
        targets,
        {
          opacity: baseOpacity,
          yPercent: 20,
          rotateX: enableBlur ? -15 : 0,
          filter: enableBlur ? 'blur(16px)' : 'blur(0px)',
        },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 0.8,
          stagger,
        }
      )
    }, root)

    return () => ctx.revert()
  }, [baseOpacity, enableBlur, once, scrollContainerRef, stagger])

  const textContent = Array.isArray(children)
    ? children.map((child) => (typeof child === 'string' ? child : '')).join(' ')
    : typeof children === 'string'
      ? children
      : ''

  if (!textContent.trim()) {
    return (
      <div ref={rootRef} className={clsx('inline-block', className)} {...rest}>
        {children}
      </div>
    )
  }

  const words = textContent.trim().split(/\s+/)

  spansRef.current = []

  return (
    <div ref={rootRef} className={clsx('inline-block', className)} {...rest}>
      {words.map((word, index) => {
        const refCallback = (node: HTMLSpanElement | null) => {
          if (node) spansRef.current[index] = node
        }
        const spacer = index < words.length - 1 ? '\u00A0' : ''

        return (
          <span key={`${word}-${index}`} className="inline-block">
            <span
              ref={refCallback}
              className="inline-block will-change-[transform,filter,opacity]"
              style={{ willChange: 'transform, filter, opacity' }}
            >
              {word}
            </span>
            {spacer}
          </span>
        )
      })}
    </div>
  )
}
