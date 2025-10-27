'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ProcessStep {
  title: string
  description: string
  indexLabel: string
}

interface PinnedProcessProps {
  steps: ProcessStep[]
  renderStep?: (step: ProcessStep, index: number) => ReactNode
}

export function PinnedProcess({ steps, renderStep }: PinnedProcessProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const root = rootRef.current
    if (!root) return

    const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.process-panel'))
    if (!panels.length) return

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, yPercent: 6 })
      gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.6 },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${(panels.length - 1) * 900}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return
        const previous = panels[index - 1]
        tl
          .to(previous, { autoAlpha: 0, yPercent: -6 })
          .fromTo(panel, { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 1, yPercent: 0 }, '<')
      })
    }, root)

    return () => ctx.revert()
  }, [reduced, steps.length])

  if (reduced) {
    return (
      <div className="grid gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-3xl border border-border/40 bg-card/80 p-8 shadow-xl shadow-black/25">
            {renderStep ? renderStep(step, index) : <DefaultStep step={step} index={index} />}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(192,132,252,0.14),transparent_60%)]" aria-hidden />
      {steps.map((step, index) => (
        <div key={step.title} className="process-panel absolute inset-0 flex items-center justify-center px-6">
          <div className="relative w-full max-w-4xl rounded-[32px] border border-border/30 bg-card/85 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute -left-3 top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs text-primary md:flex">
              {step.indexLabel}
            </div>
            {renderStep ? renderStep(step, index) : <DefaultStep step={step} index={index} />}
          </div>
        </div>
      ))}
    </div>
  )
}

function DefaultStep({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">{step.title}</h3>
      {step.description ? (
        <p className="text-sm text-muted-foreground md:text-base">{step.description}</p>
      ) : null}
    </div>
  )
}
