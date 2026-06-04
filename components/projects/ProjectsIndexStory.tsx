'use client'

import Link from 'next/link'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import { projects } from '@/lib/projects'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

export function ProjectsIndexStory() {
  return (
    <main className="relative">
      <section className="container-wide py-32">
        <div className="flex flex-col gap-4 max-w-3xl mb-8">
          <ScrollReveal enableBlur baseOpacity={0.2} className="text-sm font-semibold uppercase tracking-widest text-primary">
            Project Index
          </ScrollReveal>
          <h1 className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight">
            Earth observation projects, engineered end to end
          </h1>
        </div>
        <div className="max-w-3xl mb-16">
          <ScrollHighlightText className="text-lg text-muted-foreground leading-relaxed">
            Each case study pairs resilient satellite-data pipelines with sound remote-sensing science, so teams can trust every dataset and decision.
          </ScrollHighlightText>
        </div>
      </section>

      <section className="container-wide pb-24">
        <ScrollStack itemDistance={70} baseScale={0.88} innerClassName="px-0">
          {projects.map((project) => (
            <ScrollStackItem key={project.slug} itemClassName="min-h-[320px]">
              <article className="h-full group flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-8 md:p-10 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
                    {project.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{project.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.blurb}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View case study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <section className="container-wide py-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border/50 bg-card p-10 md:p-14 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to start your next project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your data sources, timelines, and the science or pipeline outcomes you need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
