'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type ScrollState = { step: number; progress: number }

type Step = { title: string; body: ReactNode; kicker?: string }

type Props = {
  steps: Step[]
  /** Render the sticky graphic for the current step and the progress (0-1) through it. */
  graphic: (s: ScrollState) => ReactNode
  className?: string
  caption?: ReactNode
}

/**
 * Walk-through: text steps scroll past a figure that stays in view and changes with the step. On narrow screens the
 * figure sits in the top half of the screen and the steps scroll over the bottom half. All step text stays at full
 * contrast; the current step is marked with a rule.
 */
export function Scrolly({ steps, graphic, className, caption }: Props) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [state, setState] = useState<ScrollState>({ step: 0, progress: 0 })

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const mid = window.innerHeight * 0.6
      let step = 0
      let progress = 0
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= mid) {
          step = i
          progress = Math.min(1, Math.max(0, (mid - r.top) / r.height))
        }
      })
      const q = Math.round(progress * 400) / 400
      setState((s) => (s.step === step && s.progress === q ? s : { step, progress: q }))
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [steps.length])

  return (
    <section className={cn('relative', className)}>
      <p className="print-only text-[10pt] italic">The figures for these steps are interactive and appear on the website.</p>
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* figure: sticky top half on phones, sticky right column on desktop */}
        <div
          data-scrolly-graphic
          className="sticky top-0 z-10 h-[50vh] border-b border-line bg-paper py-2 lg:order-2 lg:top-[7vh] lg:h-[82vh] lg:border-0 lg:bg-transparent lg:py-0"
        >
          <div className="relative h-full w-full">{graphic(state)}</div>
          {caption && <div className="mt-2 hidden text-[12.5px] leading-snug text-ink-2 lg:block">{caption}</div>}
        </div>
        <ol className="relative z-20 lg:order-1">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              data-scrolly-step
              ref={(el) => {
                refs.current[i] = el
              }}
              aria-current={state.step === i ? 'step' : undefined}
              className="flex min-h-[80vh] items-start pb-[8vh] pt-[44vh] first:pt-[4vh] last:min-h-[90vh] lg:min-h-[85vh] lg:items-center lg:py-[10vh] lg:first:pt-[4vh]"
            >
              <div
                className={cn(
                  'w-full max-w-[32rem] border border-line bg-paper p-5 shadow-[0_1px_2px_rgba(21,25,28,0.06)] sm:p-6 lg:border-0 lg:border-l-2 lg:bg-transparent lg:py-1 lg:pl-6 lg:pr-0 lg:shadow-none',
                  state.step === i ? 'lg:border-ink' : 'lg:border-line',
                )}
              >
                <p className="eyebrow">
                  Step {i + 1} of {steps.length}
                </p>
                <h3 className="mt-1.5 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink lg:text-[22px]">{s.title}</h3>
                <div className="prose-text mt-2.5 space-y-3 text-[15.5px] sm:text-[16.5px]">{s.body}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Framed panel used inside graphics: hairline border, white background, optional label strip. */
export function Panel({ children, label, className }: { children: ReactNode; label?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative flex h-full w-full flex-col border border-ink/70 bg-surface p-1', className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      {label && <div className="flex items-center justify-between gap-3 px-1 pt-2 font-mono text-[11px] text-ink-3">{label}</div>}
    </div>
  )
}
