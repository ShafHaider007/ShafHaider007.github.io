'use client'

import { ComponentPropsWithoutRef, ElementType, createElement, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

type BlurTextProps<T extends ElementType> = {
  text: string
  animateBy?: 'words' | 'chars'
  delay?: number
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

const defaultTransition = { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] }

export default function BlurText<T extends ElementType = 'p'>(props: BlurTextProps<T>) {
  const { text, animateBy = 'words', delay = 0, as, className, ...rest } = props
  const shouldReduceMotion = useReducedMotion()
  const Wrapper = (as ?? 'p') as T

  if (shouldReduceMotion) {
    return createElement(
      Wrapper,
      { className, ...rest } as ComponentPropsWithoutRef<T>,
      text
    )
  }

  const items = animateBy === 'chars' ? Array.from(text) : text.split(/\s+/)

  return createElement(
    Wrapper,
    { className: clsx('inline-block overflow-hidden', className), ...rest } as ComponentPropsWithoutRef<T>,
    items.map((item, index) => {
      const content = animateBy === 'chars' ? item : item
      const key = `${item}-${index}`
      const isSpace = animateBy !== 'chars' && index < items.length - 1

      return (
        <span key={key} className="inline-block">
          <motion.span
            initial={{ opacity: 0, filter: 'blur(12px)', y: '20%' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: '0%' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ ...defaultTransition, delay: delay / 1000 + index * 0.08 }}
            style={{ willChange: 'transform, filter, opacity', display: 'inline-block' }}
          >
            {content}
            {animateBy !== 'chars' && isSpace ? '\u00A0' : null}
          </motion.span>
          {animateBy === 'chars' && content === ' ' ? '\u00A0' : null}
        </span>
      )
    })
  )
}
