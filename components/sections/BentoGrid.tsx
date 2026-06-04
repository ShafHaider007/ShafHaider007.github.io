'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Database, Workflow, Satellite, Boxes, BarChart3, Code2 } from 'lucide-react'
import { techStack } from '@/lib/story'

const services = [
  {
    icon: Workflow,
    title: 'Data Pipeline Engineering',
    description:
      'Design, build, and maintain ETL/ELT pipelines for satellite imagery — ingestion, processing, and publishing of analysis-ready data.',
    accent: 'from-teal-500/10 to-emerald-500/10',
    iconColor: 'text-teal-600',
  },
  {
    icon: Database,
    title: 'Spatial Database Management',
    description:
      'PostGIS modelling, cleaning, preparation, and conversion procedures that keep geospatial data accurate, efficient, and secure.',
    accent: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600',
  },
  {
    icon: Satellite,
    title: 'Remote Sensing & Analysis',
    description:
      'Raster and vector processing, transformations, change detection, and classification with Google Earth Engine, Python, and R.',
    accent: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: Code2,
    title: 'Geospatial APIs & Web',
    description:
      'Software development and documentation, plus database schemas optimised with web developers to power FastAPI services and web maps.',
    accent: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Spatial Analysis & Reporting',
    description:
      'Spatial statistics and analysis on emerging EO data, delivered as indicators, reproducible notebooks, and scientific reports.',
    accent: 'from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-600',
  },
  {
    icon: Boxes,
    title: 'Cloud & Orchestration',
    description:
      'Containerised, orchestrated workloads on GCP — Docker, Airflow/Dagster, Terraform, and CI/CD for reproducible, observable runs.',
    accent: 'from-cyan-500/10 to-sky-500/10',
    iconColor: 'text-cyan-600',
  },
]

function ServiceCard({
  service,
  index,
  progress,
}: {
  service: (typeof services)[0]
  index: number
  progress: MotionValue<number>
}) {
  const start = index / services.length
  const end = start + 1 / services.length
  const scale = useTransform(progress, [start, end], [0.92, 1])
  const opacity = useTransform(progress, [start, end], [0.5, 1])

  return (
    <motion.div
      style={{ scale, opacity }}
      className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <service.icon className={`w-6 h-6 ${service.iconColor}`} />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  )
}

export function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="stack" ref={sectionRef} className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">Services & Stack</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Geospatial engineering from
            <span className="text-gradient-primary"> ingestion to delivery</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Full-spectrum earth observation work — from satellite data pipelines and spatial databases to remote-sensing
            science, geospatial APIs, and scientific reporting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} progress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-2xl border border-border/50 bg-card"
        >
          <div className="mb-10 max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Technology Stack</h3>
            <p className="text-muted-foreground">
              The languages, geospatial libraries, and infrastructure I use to build production-grade earth-observation
              systems.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{group.group}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-muted/60 border border-border/50 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
