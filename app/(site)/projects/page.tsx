import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { projects } from '@/lib/projects'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects — Shaf Haider | GIS Engineer',
  description: 'Case studies covering LiDAR processing, supply chain optimization, and urban heat island monitoring.',
}

export default function ProjectsPage() {
  return (
    <main className="container-wide py-32">
      <div className="flex flex-col gap-4 max-w-3xl mb-16">
        <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm font-semibold uppercase tracking-widest text-primary">
          Project Index
        </ScrollReveal>
        <h1 className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight">
          Geospatial projects engineered for impact
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Each case study pairs resilient data pipelines with crafted interaction so teams can trust every spatial decision.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <AnimatedContent key={project.slug} distance={120}>
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-card p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                  {project.category}
                </span>
                <h2 className="font-display text-2xl font-bold text-foreground">{project.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.blurb}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View case study
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          </AnimatedContent>
        ))}
      </div>
    </main>
  )
}
