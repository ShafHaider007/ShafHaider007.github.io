import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Plate } from '@/components/Plate'
import { SwipeCompare } from '@/components/SwipeCompare'
import { plates } from '@/lib/plates'
import { getProject, projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.short,
    description: project.blurb,
    openGraph: { images: [{ url: plates[project.plate].src.src }] },
  }
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]
  const plate = plates[p.plate]
  const ndvi = 'ndvi' in plate ? plate.ndvi : undefined

  return (
    <article className="pb-24">
      <header className="page pt-10 md:pt-16">
        <Link href="/#work" className="eyebrow transition-colors hover:text-ink">
          ← Selected work
        </Link>
        <div className="mt-8 grid gap-6 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3 lg:pt-3">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> · {p.period}
          </p>
          <div className="lg:col-span-9">
            <h1 className="font-serif text-[2.3rem] leading-[1.06] tracking-[-0.015em] text-ink sm:text-[3.2rem]">{p.title}</h1>
            <p className="mt-6 max-w-3xl text-[1.1rem] leading-relaxed text-ink-2">{p.blurb}</p>
          </div>
        </div>
      </header>

      <div className="page mt-12 pt-5 md:mt-16">
        <Plate id={p.plate} number="Fig. 1" note={p.context} priority sizes="(min-width: 1248px) 1200px, 100vw" />
      </div>

      <div className="page mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
        <aside className="lg:col-span-3">
          <dl className="space-y-6 text-sm lg:sticky lg:top-24">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1.5 text-ink">{p.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Client / context</dt>
              <dd className="mt-1.5 text-ink">{p.client}</dd>
            </div>
            <div>
              <dt className="eyebrow">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="border border-line bg-surface px-2 py-0.5 text-[12.5px] text-ink-2">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {p.links && (
              <div>
                <dt className="eyebrow">Links</dt>
                <dd className="mt-1.5">
                  <ul className="space-y-1">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} target="_blank" rel="noreferrer" className="link text-ink">
                          {l.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div className="lg:col-span-9">
          <dl className="grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-3">
            {p.figures.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-[2rem] leading-none tracking-tight text-ink">{f.value}</dd>
                <dd className="mt-2 text-sm text-ink-2">{f.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 max-w-[42rem] space-y-10">
            {p.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-serif text-[1.55rem] leading-tight text-ink">{s.heading}</h2>
                <p className="mt-3 text-[1.05rem] leading-[1.75] text-ink-2">{s.body}</p>
              </section>
            ))}
          </div>

          {ndvi && (
            <figure className="mt-16">
              <SwipeCompare before={plate.src} after={ndvi} alt={`${plate.place}, ${plate.region}`} />
              <figcaption className="mt-3 text-sm text-ink-2">
                <span className="mr-2 font-mono text-[11px] text-accent">Fig. 2</span>
                {p.compareCaption ?? 'True colour against NDVI computed from the same scene.'}
              </figcaption>
            </figure>
          )}
        </div>
      </div>

      <nav className="page mt-24">
        <Link href={`/projects/${next.slug}`} className="group block border-t border-ink pt-6">
          <span className="eyebrow">Next project</span>
          <span className="mt-3 flex items-baseline justify-between gap-6">
            <span className="font-serif text-[1.8rem] leading-tight text-ink transition-colors group-hover:text-accent-ink sm:text-[2.4rem]">
              {next.title}
            </span>
            <span aria-hidden className="text-2xl text-ink-3 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </nav>
    </article>
  )
}
