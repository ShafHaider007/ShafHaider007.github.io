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
 * Sticky scrollytelling: text steps scroll past a pinned graphic. On narrow screens the graphic pins to the
 * top half and the step cards scroll over the bottom half.
 */
export function Scrolly({ steps, graphic, className, caption }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
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
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        {/* graphic: sticky top on mobile, sticky right column on desktop */}
        <div className="sticky top-14 z-10 h-[52vh] bg-paper/95 py-3 lg:order-2 lg:top-[11vh] lg:h-[78vh] lg:bg-transparent lg:py-0">
          <div className="relative h-full w-full">{graphic(state)}</div>
          {caption && <div className="mt-2 hidden text-[12px] leading-snug text-ink-3 lg:block">{caption}</div>}
        </div>
        <div className="relative z-20 lg:order-1">
          {steps.map((s, i) => (
            <div
              key={s.title}
              data-step={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              className="flex min-h-[80vh] items-start pb-[8vh] pt-[46vh] first:pt-[3vh] last:min-h-[95vh] lg:min-h-[90vh] lg:items-center lg:py-[12vh] lg:first:pt-[6vh]"
            >
              <div
                className={cn(
                  'w-full max-w-[30rem] border border-line bg-surface/95 p-5 shadow-[0_1px_0_rgba(27,34,32,0.04)] backdrop-blur-sm transition-opacity duration-500 sm:p-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0',
                  state.step === i ? 'opacity-100' : 'lg:opacity-35',
                )}
              >
                <p className="eyebrow">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {s.kicker ? ` · ${s.kicker}` : ''}
                </p>
                <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.15] tracking-tight text-ink lg:text-[1.9rem]">{s.title}</h3>
                <div className="mt-3 space-y-3 text-[15.5px] leading-[1.7] text-ink-2">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Framed panel used inside graphics: hairline border, paper background, optional label strip. */
export function Panel({ children, label, className }: { children: ReactNode; label?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative flex h-full w-full flex-col border border-ink/80 bg-surface p-[5px]', className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      {label && <div className="flex items-center justify-between gap-3 px-1 pt-2 font-mono text-[10.5px] text-ink-3">{label}</div>}
    </div>
  )
}
