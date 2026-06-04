'use client'

import { motion } from 'motion/react'
import { projects } from '@/lib/projects'
import Link from 'next/link'
import { ArrowUpRight, Workflow, Satellite, Database, Mountain, Map } from 'lucide-react'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'

const categoryIcons: Record<string, typeof Map> = {
  'Data Pipeline': Workflow,
  'Remote Sensing Science': Satellite,
  'Spatial Database & API': Database,
  'Geotechnical / Earth Systems': Mountain,
}

export function ProjectsSection() {
  return (
    <section id="work" className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">Selected Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Earth observation,
            <span className="text-gradient-primary"> engineered</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scroll through case studies — from satellite data pipelines to remote-sensing science and geospatial APIs.
          </p>
        </motion.div>

        <ScrollStack
          itemDistance={80}
          itemScale={0.04}
          baseScale={0.88}
          blurAmount={0}
          innerClassName="px-0"
        >
          {projects.map((project, i) => {
            const Icon = categoryIcons[project.category] || Map
            const isHero = i === 0
            return (
              <ScrollStackItem
                key={project.slug}
                itemClassName={isHero ? 'min-h-[420px]' : 'min-h-[360px]'}
              >
                <Link href={`/projects/${project.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col md:flex-row">
                    <div
                      className={`relative bg-gradient-to-br from-primary/5 via-muted to-accent/5 flex items-center justify-center overflow-hidden ${
                        isHero ? 'md:w-2/5 min-h-[200px]' : 'h-40 md:h-auto md:w-1/3'
                      }`}
                    >
                      <Icon className="w-12 h-12 text-primary/30 group-hover:text-primary/60 transition-colors" />
                    </div>
                    <div className={`p-8 flex flex-col justify-center flex-1 ${isHero ? 'md:p-10' : ''}`}>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1 bg-primary/10 rounded-full w-fit mb-4">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{project.blurb}</p>
                      <div className="flex flex-wrap gap-4">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-lg font-display font-bold text-foreground">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollStackItem>
            )
          })}
        </ScrollStack>
      </div>
    </section>
  )
}
