import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { SectionHead } from '@/components/SectionHead'
import { Story } from '@/components/stories/Story'
import { siteUrl } from '@/lib/paths'
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
    description: `${project.question} ${project.role}.`,
    alternates: { canonical: `/projects/${slug}/` },
    openGraph: {
      title: `${project.title} · Shaf Haider`,
      description: project.question,
      images: [{ url: `${siteUrl}/viz/${project.thumb.src}`, width: 1200, height: 750, alt: project.thumb.alt }],
    },
  }
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const index = projects.indexOf(p)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pb-20 md:pb-24">
      <header className="page pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="text-[14px] text-ink-3" data-print-hide>
          <Link href="/projects/" className="link">
            Projects
          </Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{p.short}</span>
        </nav>
        <h1 className="mt-4 max-w-[48rem] text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[40px]">
          {p.title}
        </h1>
        <p className="prose-text mt-5 max-w-prose sm:text-[19px]">
          <span className="font-sans text-[15px] font-semibold sm:text-[16px]">Question: </span>
          {p.question}
        </p>
      </header>

      <div className="page mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        <div className="max-w-prose">
          <p className="prose-text">{p.summary}</p>
          <h2 className="mt-9 text-[19px] font-semibold text-ink">Why it matters</h2>
          <p className="prose-text mt-2">{p.why}</p>
          <h2 className="mt-9 text-[19px] font-semibold text-ink">My part</h2>
          <ul className="prose-text mt-2 list-disc space-y-2 pl-5 marker:text-ink-3">
            {p.did.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <aside aria-label="Project details" className="lg:border-l lg:border-line lg:pl-8">
          <dl className="grid gap-4 text-[14.5px] leading-relaxed">
            <Item label="Role">{p.role}</Item>
            <Item label="Setting">{p.context}</Item>
            {p.when && <Item label="When">{p.when}</Item>}
            {p.facts.map((f) => (
              <Item key={f.label} label={f.label}>
                {f.value}
              </Item>
            ))}
            <Item label="Methods and tools">{p.tools.join(', ')}</Item>
            {p.links && (
              <Item label="Links">
                <ul className="space-y-1">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="link" rel="noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Item>
            )}
          </dl>
        </aside>
      </div>

      <section className="page mt-16 md:mt-20" aria-labelledby="method">
        <SectionHead id="method" title="How the analysis works">
          {p.walkthrough} The figures were recomputed for this site from open data to show the method. They are not results from
          the project. On wide screens the figure stays in view while the steps scroll past it.
        </SectionHead>
        <Story slug={p.slug} />
      </section>

      <nav aria-label="More projects" className="page mt-16 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2" data-print-hide>
        <Link href={`/projects/${prev.slug}/`} className="group block">
          <span className="text-[13px] text-ink-3">Previous project</span>
          <span className="title-link mt-1 block text-[17px] font-semibold leading-snug text-ink">{prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}/`} className="group block sm:text-right">
          <span className="text-[13px] text-ink-3">Next project</span>
          <span className="title-link mt-1 block text-[17px] font-semibold leading-snug text-ink">{next.title}</span>
        </Link>
      </nav>
    </article>
  )
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[13px] font-medium text-ink-3">{label}</dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  )
}
