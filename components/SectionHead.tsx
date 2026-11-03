import type { ReactNode } from 'react'

/** Section heading with a rule above it, as in a printed report. */
export function SectionHead({ id, title, children }: { id?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 border-t border-ink pt-4 md:mb-10">
      <h2 id={id} className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink md:text-[28px]">
        {title}
      </h2>
      {children && <div className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-ink-2">{children}</div>}
    </div>
  )
}
