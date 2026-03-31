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
    return { title: 'Project not found' }
  }

  return {
    title: `${project.title} — Case Study | Shaf Haider`,
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
    <main className="container-wide py-32">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <BlurText text={project.title} animateBy="words" delay={120} className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full inline-block">
            {project.category}
          </span>
          <ScrollReveal enableBlur baseOpacity={0.2} className="text-lg text-muted-foreground leading-relaxed">
            {project.summary}
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <AnimatedContent key={metric.label} distance={60}>
                <div className="rounded-2xl border border-border/50 bg-card p-5 text-center">
                  <p className="text-2xl font-display font-bold text-primary">{metric.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">{metric.label}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>

          <ProjectGallery slides={project.gallery} />
        </div>

        <aside className="space-y-10 lg:sticky lg:top-32">
          <nav className="rounded-2xl border border-border/50 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">On this page</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {narrative.map((item) => (
                <li key={item.id}>
                  <a className="hover:text-primary transition-colors" href={`#${item.id}`}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {narrative.map((section) => (
              <section key={section.id} id={section.id} className="space-y-3">
                <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {section.title}
                </ScrollReveal>
                <ScrollReveal enableBlur baseOpacity={0.2} className="text-base text-muted-foreground leading-relaxed">
                  {section.content}
                </ScrollReveal>
              </section>
            ))}
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
