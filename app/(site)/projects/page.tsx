import type { Metadata } from 'next'
import { ProjectList } from '@/components/ProjectList'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Seven GIS and remote sensing projects by Shaf Haider: forest-change data for a forest-carbon study, land degradation for UNCCD reporting, a national forest monitoring pipeline, field-level crop monitoring, heat-aware routing, recycling logistics and property web GIS.',
  alternates: { canonical: '/projects/' },
}

export default function ProjectsPage() {
  return (
    <section className="page pb-20 pt-10 md:pb-24 md:pt-14">
      <header className="mb-10 max-w-prose">
        <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[40px]">Projects</h1>
        <p className="prose-text mt-4 text-ink-2">
          Each project page sets out the question, my part in the work and how the analysis is done. The method figures were
          recomputed for this site from open data; they are not project results.
        </p>
      </header>
      <ProjectList items={projects} headingLevel={2} />
    </section>
  )
}
