'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export type ProjectSlide = {
  id: string
  title: string
  description: string
}

interface ProjectGalleryProps {
  slides: ProjectSlide[]
}

export function ProjectGallery({ slides }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const active = slides[index]

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setIndex((prev) => (prev + 1) % slides.length)
      } else if (event.key === 'ArrowLeft') {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slides.length])

  return (
    <div className="space-y-6 rounded-3xl border border-border/30 bg-card/70 p-6 shadow-lg shadow-black/25 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Gallery</p>
        <span className="text-sm text-muted-foreground">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-border/20 bg-gradient-to-br from-primary/15 via-transparent to-accent/20 p-8">
        {reduceMotion ? (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">{active.title}</h3>
            <p className="text-sm text-muted-foreground">{active.description}</p>
          </div>
        ) : (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-3 will-change-[transform,opacity]"
          >
            <h3 className="text-xl font-semibold text-foreground">{active.title}</h3>
            <p className="text-sm text-muted-foreground">{active.description}</p>
          </motion.div>
        )}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <button
          type="button"
          className="rounded-full border border-border/30 bg-background/60 px-4 py-2 transition hover:border-primary/40 hover:text-primary"
          onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          Previous
        </button>
        <button
          type="button"
          className="rounded-full border border-border/30 bg-background/60 px-4 py-2 transition hover:border-primary/40 hover:text-primary"
          onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
        >
          Next
        </button>
      </div>
      <p className="text-xs text-muted-foreground">Tip: use ← → keys for keyboard navigation.</p>
    </div>
  )
}
