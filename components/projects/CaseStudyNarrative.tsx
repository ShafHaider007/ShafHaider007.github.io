'use client'

import { useState } from 'react'
import BlurText from '@/components/bits/BlurText'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { PinnedProcess, type ProcessStep } from '@/components/animations/PinnedProcess'
import type { Project } from '@/lib/projects'
interface CaseStudyNarrativeProps {
  project: Project
}

export function CaseStudyNarrative({ project }: CaseStudyNarrativeProps) {
  const [activeStep, setActiveStep] = useState(0)

  const steps: ProcessStep[] = [
    { title: 'Problem', description: project.problem, indexLabel: '01' },
    { title: 'Approach', description: project.approach, indexLabel: '02' },
    { title: 'Outcome', description: project.outcome, indexLabel: '03' },
  ]

  return (
    <main className="relative">
      <section className="container-wide py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-8">
            <BlurText
              text={project.title}
              animateBy="words"
              delay={120}
              className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight"
            />
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
                    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                </AnimatedContent>
              ))}
            </div>

            <ProjectGallery slides={project.gallery} />
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <nav className="rounded-2xl border border-border/50 bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Story progress</p>
              <ul className="space-y-3">
                {steps.map((step, i) => (
                  <li key={step.title}>
                    <span
                      className={`text-sm transition-colors ${
                        activeStep === i ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      {step.indexLabel} — {step.title}
                    </span>
                    <div
                      className={`mt-1 h-0.5 rounded-full transition-all duration-300 ${
                        activeStep === i ? 'w-full bg-primary' : 'w-0 bg-transparent'
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <section id="case-study-pinned" className="relative bg-muted/20">
        <div className="container-wide section-padding pb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">The story</h2>
          <p className="text-muted-foreground mt-2">Scroll through problem, approach, and outcome.</p>
        </div>
        <PinnedProcess steps={steps} pinMultiplier={700} onActiveStepChange={setActiveStep} />
      </section>

      <section className="container-wide py-24 pb-32">
        <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
