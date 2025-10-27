import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { projects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects — Muhammad Shaf Haider',
  description: 'Case studies covering routing toolkits, civic reporting platforms, and analytics pipelines.',
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-32">
      <div className="flex flex-col gap-4">
        <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm uppercase tracking-[0.4em] text-primary/80">
          Project index
        </ScrollReveal>
        <h1 className="text-balance text-4xl font-semibold text-foreground md:text-5xl">
          Mapping products engineered for clarity and momentum
        </h1>
        <p data-reveal className="max-w-3xl text-lg text-muted-foreground">
          Each case study pairs resilient data pipelines with crafted interaction so your teams can trust every spatial decision.
        </p>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        {projects.map((project) => (
          <AnimatedContent key={project.slug} distance={120}>
            <article className="flex h-full flex-col justify-between rounded-3xl border border-border/30 bg-card/70 p-8 shadow-lg shadow-black/25 backdrop-blur">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{project.category}</p>
                <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
                <p className="text-sm text-muted-foreground">{project.blurb}</p>
                <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm text-muted-foreground">
                  {project.summary}
                </ScrollReveal>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-border/40 bg-background/60 px-3 py-1">
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm text-primary transition hover:text-primary/80"
              >
                View project
                <span aria-hidden>→</span>
              </Link>
            </article>
          </AnimatedContent>
        ))}
      </div>
    </main>
  )
}
