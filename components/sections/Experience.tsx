'use client'

import { motion } from 'motion/react'
import { experienceHistory } from '@/lib/story'

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-muted/30 relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Experience</h2>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Career History</p>
          </motion.div>

          <div className="space-y-12">
            {experienceHistory.map((item, i) => (
              <motion.div
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group border-l-2 border-primary/20 pl-8"
              >
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                  <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.company}
                  </h3>
                  <span className="font-mono text-sm text-muted-foreground/60">{item.period}</span>
                </div>
                <div className="mb-3 text-primary/80 font-medium">{item.role}</div>
                <p className="text-muted-foreground leading-relaxed max-w-xl">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
