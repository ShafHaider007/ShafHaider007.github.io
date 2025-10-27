'use client'

import { motion, useScroll } from 'motion/react'

export function TopProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-primary" />
}
