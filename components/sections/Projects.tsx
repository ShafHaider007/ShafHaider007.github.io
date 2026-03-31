'use client'

import { motion } from 'motion/react'
import { projects } from '@/lib/projects'
import Link from 'next/link'
import { ArrowUpRight, Map, Network, Satellite } from 'lucide-react'

const categoryIcons: Record<string, typeof Map> = {
  'Computer Vision': Map,
  'Network Analysis': Network,
  'Remote Sensing': Satellite,
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Projects that moved
            <span className="text-gradient-primary"> the needle</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From LiDAR processing pipelines to real-time urban monitoring dashboards — 
            geospatial solutions that create measurable impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const Icon = categoryIcons[project.category] || Map
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block"
                >
                  <div className={`rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 ${
                    i === 0 ? 'md:flex' : ''
                  }`}>
                    <div className={`relative bg-gradient-to-br from-primary/5 via-muted to-accent/5 ${
                      i === 0 ? 'md:w-1/2 min-h-[280px]' : 'h-48'
                    } flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
                      <div className="relative flex flex-col items-center gap-3 text-center p-6">
                        <Icon className="w-10 h-10 text-primary/30 group-hover:text-primary/60 transition-colors duration-500" />
                        <span className="text-3xl md:text-4xl font-display font-bold text-foreground/10 group-hover:text-primary/30 transition-colors duration-500">
                          {project.metrics[0]?.value}
                        </span>
                      </div>
                    </div>

                    <div className={`p-8 ${i === 0 ? 'md:w-1/2 md:p-10 flex flex-col justify-center' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1 bg-primary/10 rounded-full">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.blurb}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-lg font-display font-bold text-foreground">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
