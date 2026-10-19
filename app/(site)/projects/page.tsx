import type { Metadata } from 'next'
import { ProjectRow } from '@/components/ProjectRow'
import { SectionHead } from '@/components/SectionHead'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Earth-observation, forest-monitoring, land-degradation and WebGIS projects by Shaf Haider.',
}

export default function ProjectsPage() {
  return (
    <section className="page pb-24 pt-16 md:pt-24">
      <SectionHead index="01" title="All projects">
        Each case study is paired with a Sentinel-2 plate of the landscape it deals with.
      </SectionHead>
      <div className="divide-y divide-line">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
