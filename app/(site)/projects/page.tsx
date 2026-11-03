import type { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
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
        Each case study walks through how the work is done, with figures computed from open data.
      </SectionHead>
      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
