'use client'

import { motion } from 'motion/react'
import { Workflow, Satellite, Database, Code2 } from 'lucide-react'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'

const benefits = [
  {
    icon: Workflow,
    title: 'Satellite Data Pipelines',
    desc: 'Design, build, and maintain ETL/ELT pipelines that turn raw satellite imagery into analysis-ready data — orchestrated, tested, and reproducible.',
  },
  {
    icon: Satellite,
    title: 'Remote Sensing Science',
    desc: 'Earth-systems science across biodiversity, geotechnical, and sector assessments — change detection, classification, and indicators from raster and vector data.',
  },
  {
    icon: Database,
    title: 'Spatial Databases',
    desc: 'Manage PostGIS databases end to end — cleaning, preparation, and conversion — for the integrity, efficiency, and security of geospatial data.',
  },
  {
    icon: Code2,
    title: 'Geospatial APIs & Web',
    desc: 'Software development and documentation, plus optimised database schemas built with web developers to power geospatial APIs and web applications.',
  },
]

export function WhyHireMe() {
  return (
    <section id="focus" className="py-32 md:py-48 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="inline-block py-1 px-3 border border-primary/20 rounded-full bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-8">
            What I Focus On
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-10">
            From orbit to insight
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-20">
          <ScrollHighlightText className="text-xl md:text-2xl text-muted-foreground leading-relaxed justify-center text-center">
            I work across the full earth-observation stack — engineering the pipelines, managing the spatial data, and doing the remote-sensing science that turns satellite imagery into trustworthy answers.
          </ScrollHighlightText>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border/20 border border-border/20 overflow-hidden rounded-3xl">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-background p-10 md:p-12 hover:bg-muted/30 transition-colors"
            >
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-all duration-500">
                <benefit.icon className="w-20 h-20 stroke-[1px]" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
