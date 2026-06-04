'use client'

import dynamic from 'next/dynamic'
import { useReducedMotion } from 'motion/react'

const ScrollCanvas = dynamic(
  () => import('@/components/ui/ScrollCanvas').then((m) => m.ScrollCanvas),
  { ssr: false }
)

export function AmbientScrollLayer() {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-50" aria-hidden>
      <ScrollCanvas />
    </div>
  )
}
