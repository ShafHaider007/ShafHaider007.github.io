import Link from 'next/link'
import { PlateImage } from '@/components/Plate'
import type { Project } from '@/lib/projects'
import { viz } from '@/lib/viz'

/** Projects as a list of entries, each with a numbered thumbnail figure, the title, the question and a summary. */
export function ProjectList({ items, firstFigure = 1, headingLevel = 3 }: { items: Project[]; firstFigure?: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((p, i) => (
        <li key={p.slug} className="grid gap-4 py-7 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-7 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
          <figure className="order-2 sm:order-1">
            <div className="border border-ink/70 p-1">
              <PlateImage src={viz(p.thumb.src)} alt={p.thumb.alt} width={1200} height={750} />
            </div>
            <figcaption className="mt-1.5 text-[12.5px] leading-snug text-ink-3">
              <span className="font-semibold text-ink-2">Figure {firstFigure + i}.</span> {p.thumb.caption}
            </figcaption>
          </figure>
          <div className="order-1 sm:order-2">
            <H className="text-[19px] font-semibold leading-snug tracking-[-0.005em] text-ink md:text-[21px]">
              <Link href={`/projects/${p.slug}/`} className="title-link">
                {p.title}
              </Link>
            </H>
            <p className="mt-1 text-[13.5px] text-ink-3">
              {p.context}
            </p>
            <p className="prose-text mt-3 text-ink-2">
              <span className="font-sans text-[14px] font-semibold text-ink">Question: </span>
              {p.question}
            </p>
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">{p.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
