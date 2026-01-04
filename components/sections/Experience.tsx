"use client"

import { motion } from "motion/react"

const history = [
  {
    role: "GIS Business Developer",
    company: "GIS Plus Pvt Ltd",
    period: "2025 — Present",
    description: "Leading product strategy and shipping geospatial shells for enterprise clients. Bridging the gap between raw spatial data and actionable business insights."
  },
  {
    role: "Team Lead",
    company: "Jugrafiya",
    period: "2024",
    description: "Orchestrated large-scale spatial rendering pilots. Benchmarked deck.gl performance on heavy point clouds for mobility datasets."
  },
  {
    role: "Research Intern",
    company: "IGIS – NUST",
    period: "2023",
    description: "Developed IoT-driven disease surveillance systems. Integrated sensor streams with live mapping dashboards for dengue hotspot monitoring."
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-secondary/30 relative">
      <div className="mx-auto w-full max-w-5xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif-display font-medium text-primary mb-6">Experience</h2>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Career History</p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-12">
            {history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">{item.company}</h3>
                  <span className="font-mono text-sm text-muted-foreground/60">{item.period}</span>
                </div>
                <div className="mb-3 text-primary/80 font-medium">{item.role}</div>
                <p className="text-muted-foreground leading-relaxed max-w-xl">{item.description}</p>

                {/* Divider */}
                <div className="mt-8 h-px w-full bg-border/40 group-last:hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

