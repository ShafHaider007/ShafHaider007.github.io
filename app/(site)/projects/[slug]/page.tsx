import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlurText from '@/components/bits/BlurText'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) {
    return {
      title: 'Project not found',
    }
  }

  return {
    title: `${project.title} — Case study`,
    description: project.summary,
  }
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  const narrative = [
    { id: 'problem', title: 'Problem', content: project.problem },
    { id: 'approach', title: 'Approach', content: project.approach },
    { id: 'outcome', title: 'Outcome', content: project.outcome },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-32">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <BlurText text={project.title} animateBy="words" delay={120} className="text-balance text-4xl font-semibold text-foreground md:text-5xl" />
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{project.category}</p>
          <ScrollReveal enableBlur baseOpacity={0.2} className="text-lg text-muted-foreground">
            {project.summary}
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <AnimatedContent key={metric.label} distance={60}>
                <div className="rounded-3xl border border-border/30 bg-card/70 p-4 text-center">
                  <p className="text-2xl font-semibold text-primary">{metric.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{metric.label}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>

          <ProjectGallery slides={project.gallery} />
        </div>

        <aside className="space-y-10 lg:sticky lg:top-32">
          <nav className="rounded-3xl border border-border/30 bg-card/70 p-6 shadow-lg shadow-black/25 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">On this page</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {narrative.map((item) => (
                <li key={item.id}>
                  <a className="transition hover:text-primary" href={`#${item.id}`}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {narrative.map((section) => (
              <section key={section.id} id={section.id} className="space-y-3">
                <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm uppercase tracking-[0.35em] text-primary/80">
                  {section.title}
                </ScrollReveal>
                <ScrollReveal enableBlur baseOpacity={0.2} className="text-base text-muted-foreground">
                  {section.content}
                </ScrollReveal>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
