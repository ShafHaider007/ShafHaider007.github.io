import Link from 'next/link'
import { Plate } from '@/components/Plate'
import { cn } from '@/lib/utils'
import type { Project } from '@/lib/projects'

export function ProjectRow({ project: p, index, flip }: { project: Project; index: number; flip?: boolean }) {
  const no = String(index + 1).padStart(2, '0')
  return (
    <article className="grid items-start gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <Link
        href={`/projects/${p.slug}`}
        className={cn('block pt-5 md:col-span-7 md:pr-5', flip && 'md:order-2')}
        tabIndex={-1}
        aria-hidden
      >
        <Plate id={p.plate} sizes="(min-width: 768px) 58vw, 100vw" caption={false} aspect={3 / 2} />
      </Link>
      <div className={cn('md:col-span-5 md:pt-5', flip && 'md:order-1')}>
        <p className="eyebrow">
          <span className="text-accent">{no}</span> · {p.period}
        </p>
        <h3 className="mt-3 font-serif text-[1.75rem] leading-[1.15] tracking-tight text-ink md:text-[2rem]">
          <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent-ink">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-3">{p.role}</p>
        <p className="mt-5 leading-relaxed text-ink-2">{p.blurb}</p>
        <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {p.figures.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-[1.35rem] leading-none text-ink">{f.value}</dd>
              <dd className="mt-1.5 text-[12.5px] leading-snug text-ink-3">{f.label}</dd>
            </div>
          ))}
        </dl>
        <Link href={`/projects/${p.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink link">
          Read the case study <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}

export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const no = String(index + 1).padStart(2, '0')
  return (
    <article className="flex flex-col">
      <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className="block pt-5">
        <Plate id={p.plate} sizes="(min-width: 768px) 45vw, 100vw" caption={false} aspect={16 / 10} />
      </Link>
      <p className="eyebrow mt-5">
        <span className="text-accent">{no}</span> · {p.period}
      </p>
      <h3 className="mt-2 font-serif text-[1.5rem] leading-[1.2] tracking-tight text-ink">
        <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent-ink">
          {p.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-3">{p.client}</p>
      <p className="mt-3 leading-relaxed text-ink-2">{p.blurb}</p>
    </article>
  )
}
