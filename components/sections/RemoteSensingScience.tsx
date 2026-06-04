'use client'

import { motion } from 'motion/react'
import { Leaf, Mountain, LineChart, FileText } from 'lucide-react'

const areas = [
  {
    icon: Leaf,
    title: 'Biodiversity & habitat',
    desc: 'Land-cover classification and habitat-change detection to support biodiversity assessments of products, portfolios, and sectors.',
  },
  {
    icon: Mountain,
    title: 'Geotechnical & earth systems',
    desc: 'InSAR and terrain analysis for ground-deformation and stability screening across assets, sites, and sectors.',
  },
  {
    icon: LineChart,
    title: 'Change detection & monitoring',
    desc: 'Multi-temporal analysis of optical and radar imagery to quantify change and track environmental trends over time.',
  },
  {
    icon: FileText,
    title: 'Scientific reporting',
    desc: 'Reproducible notebooks in R and Python, with clear reports and deliverables that stand up to scrutiny and ship on time.',
  },
]

export function RemoteSensingScience() {
  return (
    <section id="science" className="section-padding relative bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Remote Sensing Science
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Earth-systems science,
            <span className="text-gradient-primary"> end to end</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Leveraging emerging Earth Observation data with R, Python, and GIS to deliver biodiversity, geotechnical,
            and sector assessments — grounded in earth systems science and backed by reproducible methods.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 md:p-10 rounded-2xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <area.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{area.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
