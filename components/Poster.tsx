'use client'

import { useState } from 'react'
import { useReveal } from '@/lib/hooks'
import { viz } from '@/lib/viz'

/**
 * Project figure that wipes from the input data to the analysis when it comes into view. Pointing at it shows the input
 * again. With reduced motion, without JavaScript and in print, the analysis is shown at once.
 */
export function Poster({ input, src, labels, alt }: { input: string; src: string; labels: [string, string]; alt: string }) {
  const [ref, on] = useReveal<HTMLDivElement>(0.55)
  const [hover, setHover] = useState(false)
  const showResult = on && !hover
  return (
    <div ref={ref} className="relative border border-ink/70 bg-surface p-1" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-plate">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={viz(input)} alt="" width={1200} height={750} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={viz(src)}
          alt={alt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          data-animate
          className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(.65,0,.35,1)]"
          style={{ clipPath: showResult ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
        />
        <span className="absolute bottom-2.5 left-2.5 rounded-[2px] bg-surface/90 px-1.5 py-0.5 font-mono text-[11px] text-ink">
          {showResult ? labels[1] : labels[0]}
        </span>
      </div>
    </div>
  )
}
