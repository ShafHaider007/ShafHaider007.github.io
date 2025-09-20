'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: 'left' | 'center' | 'right'
  onLetterAnimationComplete?: () => void
  trigger?: string
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
  trigger
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLSpanElement | HTMLDivElement)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const elements = elementsRef.current

    // Clear any existing animations
    gsap.killTweensOf(elements)

    // Set initial state
    gsap.set(elements, from)

    // Create animation timeline
    const tl = gsap.timeline({
      delay,
      onComplete: onLetterAnimationComplete
    })

    // Animate elements
    if (splitType === 'chars') {
      tl.to(elements, {
        ...to,
        duration,
        ease,
        stagger: 0.05
      })
    } else if (splitType === 'words') {
      tl.to(elements, {
        ...to,
        duration,
        ease,
        stagger: 0.1
      })
    } else if (splitType === 'lines') {
      tl.to(elements, {
        ...to,
        duration,
        ease,
        stagger: 0.2
      })
    }

    // Set up ScrollTrigger if trigger is provided
    if (trigger) {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top 80%',
        animation: tl,
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      gsap.killTweensOf(elements)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [text, delay, duration, ease, splitType, from, to, onLetterAnimationComplete, trigger])

  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span
          key={index}
          ref={el => {
            if (el) elementsRef.current[index] = el
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    } else if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span
          key={index}
          ref={el => {
            if (el) elementsRef.current[index] = el
          }}
          className="inline-block mr-1"
        >
          {word}
        </span>
      ))
    } else if (splitType === 'lines') {
      return text.split('\n').map((line, index) => (
        <div
          key={index}
          ref={el => {
            if (el) elementsRef.current[index] = el
          }}
          className="block"
        >
          {line}
        </div>
      ))
    }
    return text
  }

  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[textAlign]

  return (
    <div
      ref={containerRef}
      className={`${className} ${textAlignClass}`}
    >
      {splitText()}
    </div>
  )
}
