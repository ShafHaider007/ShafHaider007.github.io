import type { ReactNode } from 'react'
import { DrawRule, Reveal, SplitHeading } from '@/components/motion/Reveal'

export function SectionHead({ index, title, children }: { index: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 md:mb-14">
      <DrawRule />
      <div className="grid gap-4 pt-5 md:grid-cols-[12rem_1fr] md:gap-8">
        <Reveal y={10}>
          <p className="eyebrow pt-2">§ {index}</p>
        </Reveal>
        <div>
          <SplitHeading className="font-serif text-[2rem] leading-[1.1] tracking-tight text-ink md:text-[2.6rem]">{title}</SplitHeading>
          {children && (
            <Reveal delay={0.15} className="mt-3 max-w-2xl text-ink-2">
              {children}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}
