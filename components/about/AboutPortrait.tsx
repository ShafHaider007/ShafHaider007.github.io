'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, willChange: 'transform, opacity' }}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border/30 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(64,196,173,0.35),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(254,178,89,0.3),transparent_60%)]" aria-hidden />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/80 to-transparent p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Field notes</p>
        <p className="mt-3 text-base text-muted-foreground">
          From remote-sensing labs at NUST to building data pipelines in code, I bring an earth-systems science mindset to
          every dataset I ingest, model, and analyse.
        </p>
      </div>
    </motion.div>
  )
}
