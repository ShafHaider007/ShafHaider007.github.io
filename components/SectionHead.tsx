import type { ReactNode } from 'react'

export function SectionHead({ index, title, children }: { index: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 grid gap-4 border-t border-ink pt-5 md:mb-14 md:grid-cols-[12rem_1fr] md:gap-8">
      <p className="eyebrow pt-2">§ {index}</p>
      <div>
        <h2 className="font-serif text-[2rem] leading-[1.1] tracking-tight text-ink md:text-[2.6rem]">{title}</h2>
        {children && <div className="mt-3 max-w-2xl text-ink-2">{children}</div>}
      </div>
    </div>
  )
}
