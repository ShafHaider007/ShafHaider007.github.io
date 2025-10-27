import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/projects'

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <p className="mt-4 text-muted-foreground">
          Selected platforms that blend geospatial engineering with design.
        </p>

        <div className="mt-8 space-y-6">
          {projects.slice(0, 2).map((project) => (
            <article key={project.slug} className="rounded-2xl border bg-card p-6 transition hover:border-primary">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.blurb}</p>
              <p className="mt-4 text-xs text-muted-foreground">{project.tech.join(' · ')}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
              >
                View case study <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
