import Link from 'next/link'
import { Poster } from '@/components/Poster'
import type { Project } from '@/lib/projects'

/**
 * Projects as a list. Each entry has a large figure that wipes from the input data to the analysis, then the title,
 * the question and a summary.
 */
export function ProjectList({ items, firstFigure = 1, headingLevel = 3 }: { items: Project[]; firstFigure?: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((p, i) => (
        <li key={p.slug} className="grid gap-5 py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
          <figure className="lg:col-span-7">
            <Link href={`/projects/${p.slug}/`} tabIndex={-1} aria-hidden className="block">
              <Poster input={p.thumb.input} src={p.thumb.src} labels={p.thumb.labels} alt={p.thumb.alt} />
            </Link>
            <figcaption className="mt-2 text-[12.5px] leading-snug text-ink-3">
              <span className="font-semibold text-ink-2">Figure {firstFigure + i}.</span> {p.thumb.caption}
            </figcaption>
          </figure>
          <div className="lg:col-span-5">
            <H className="text-[21px] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-[24px]">
              <Link href={`/projects/${p.slug}/`} className="title-link">
                {p.title}
              </Link>
            </H>
            <p className="mt-1.5 text-[13.5px] text-ink-3">{p.context}</p>
            <p className="prose-text mt-4 text-ink-2">
              <span className="font-sans text-[14px] font-semibold text-ink">Question: </span>
              {p.question}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
