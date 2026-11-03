import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CountUp, Reveal, SplitHeading } from '@/components/motion/Reveal'
import { SectionHead } from '@/components/SectionHead'
import { Story } from '@/components/stories/Story'
import { siteUrl } from '@/lib/paths'
import { getProject, projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const POSTER: Record<string, string> = {
  'forest-carbon-activity-data': 'jfrel',
  'unccd-2026-national-reporting': 'unccd',
  'national-forest-monitoring-system': 'nfms',
  geofasal: 'geofasal',
  'move-smart': 'movesmart',
  'mottainai-recycling': 'mottainai',
  'dha-property-webgis': 'dha',
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
    description: project.question,
    openGraph: { images: [{ url: `${siteUrl}/viz/posters/${POSTER[slug]}_b.webp`, width: 1200, height: 750 }] },
  }
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const index = projects.indexOf(p)
  const next = projects[(index + 1) % projects.length]
  const countable = (v: string) => /^[≥]?\d+(\.\d+)?\s?(%|m|°C)?$/.test(v)

  return (
    <article className="pb-24">
      <header className="page pt-10 md:pt-16">
        <Link href="/#work" className="eyebrow transition-colors hover:text-ink">
          ← Selected work
        </Link>
        <div className="mt-8 grid gap-6 border-t border-ink pt-6 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3 lg:pt-3">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> · {p.period}
            <span className="mt-2 block normal-case tracking-normal text-ink-2 lg:mt-3">{p.short}</span>
          </p>
          <div className="lg:col-span-9">
            <SplitHeading as="h1" immediate className="font-serif text-[2.3rem] leading-[1.08] tracking-[-0.015em] text-ink sm:text-[3.1rem]">
              {p.title}
            </SplitHeading>
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-3xl text-[1.1rem] leading-relaxed text-ink-2">{p.blurb}</p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="page mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <Reveal as="aside" stagger="[data-meta]" className="lg:col-span-3">
          <dl className="space-y-6 text-sm">
            <div data-meta>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1.5 text-ink">{p.role}</dd>
            </div>
            <div data-meta>
              <dt className="eyebrow">Context</dt>
              <dd className="mt-1.5 text-ink">{p.client}</dd>
            </div>
            <div data-meta>
              <dt className="eyebrow">Tools</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="border border-line bg-surface px-2 py-0.5 text-[12.5px] text-ink-2">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {p.links && (
              <div data-meta>
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
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal className="border-l-2 border-accent pl-5">
            <p className="eyebrow">The question</p>
            <p className="mt-2 max-w-[44rem] font-serif text-[1.45rem] leading-snug text-ink md:text-[1.7rem]">{p.question}</p>
          </Reveal>
          <Reveal className="mt-10">
            <h2 className="font-serif text-[1.4rem] leading-tight text-ink">Why it matters</h2>
            <p className="mt-3 max-w-[44rem] text-[1.03rem] leading-[1.75] text-ink-2">{p.why}</p>
          </Reveal>
          <Reveal className="mt-10" stagger="li">
            <h2 className="font-serif text-[1.4rem] leading-tight text-ink">My role</h2>
            <ul className="mt-3 max-w-[44rem] space-y-3 text-[1.03rem] leading-[1.7] text-ink-2">
              {p.did.map((x) => (
                <li key={x} className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-ink-3">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="dl" stagger="[data-fig]" className="mt-12 grid grid-cols-1 gap-6 border-y border-line py-7 sm:grid-cols-3">
            {p.figures.map((f) => (
              <div key={f.label} data-fig>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-[2rem] leading-none tracking-tight text-ink">
                  {countable(f.value) ? <CountUp value={f.value} /> : f.value}
                </dd>
                <dd className="mt-2 text-sm text-ink-2">{f.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="page mt-24">
        <SectionHead index="02" title="How the analysis works">
          {p.media}. Scroll through the steps and the graphic follows.
        </SectionHead>
        <Story slug={p.slug} />
      </section>

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
