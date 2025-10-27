'use client'

import { motion, useReducedMotion } from 'motion/react'
import clsx from 'clsx'

const PRESETS = {
  'page-footer': 'linear-gradient(to bottom, rgba(2,10,18,0) 0%, rgba(2,10,18,0.65) 50%, rgba(2,10,18,0.9) 100%)',
  'section-top': 'linear-gradient(to top, rgba(2,10,18,0) 0%, rgba(2,10,18,0.6) 55%, rgba(2,10,18,0.85) 100%)',
  'horizontal-right': 'linear-gradient(to right, rgba(2,10,18,0) 0%, rgba(2,10,18,0.55) 65%, rgba(2,10,18,0.85) 100%)',
} as const

type PresetKey = keyof typeof PRESETS

interface GradualBlurProps {
  preset?: PresetKey
  animated?: boolean
  className?: string
}

export default function GradualBlur({ preset = 'page-footer', animated = false, className }: GradualBlurProps) {
  const gradient = PRESETS[preset] ?? PRESETS['page-footer']
  const prefersReducedMotion = useReducedMotion()

  if (!animated || prefersReducedMotion) {
    return <div className={clsx('pointer-events-none', className)} style={{ backgroundImage: gradient }} />
  }

  return (
    <motion.div
      className={clsx('pointer-events-none', className)}
      style={{ backgroundImage: gradient, willChange: 'filter, opacity' }}
      initial={{ opacity: 0.85, filter: 'blur(0px)' }}
      animate={{ opacity: [0.75, 0.95, 0.85], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
