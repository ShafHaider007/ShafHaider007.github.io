'use client'

import { motion } from 'motion/react'
import { MessageSquare, PenTool, Code2, TestTube, Rocket } from 'lucide-react'

const steps = [
  {
    id: '01',
    icon: MessageSquare,
    title: 'Discovery',
    subtitle: 'Requirements & Analysis',
    desc: 'Understanding your spatial data needs, existing infrastructure, and project objectives through in-depth consultation.',
    color: 'bg-teal-500',
  },
  {
    id: '02',
    icon: PenTool,
    title: 'Architecture',
    subtitle: 'System Design',
    desc: 'Designing scalable geospatial schemas, API workflows, data pipelines, and system architecture tailored to your requirements.',
    color: 'bg-blue-500',
  },
  {
    id: '03',
    icon: Code2,
    title: 'Development',
    subtitle: 'Agile Engineering',
    desc: 'Full-stack implementation from database optimization and spatial APIs to interactive frontend mapping visualization.',
    color: 'bg-violet-500',
  },
  {
    id: '04',
    icon: TestTube,
    title: 'Validation',
    subtitle: 'QA & Testing',
    desc: 'Rigorous validation of spatial accuracy, performance benchmarks, cross-browser testing, and security auditing.',
    color: 'bg-amber-500',
  },
  {
    id: '05',
    icon: Rocket,
    title: 'Delivery',
    subtitle: 'Deploy & Support',
    desc: 'Production launch, documentation handover, team training, and ongoing maintenance support.',
    color: 'bg-emerald-500',
  },
]

export function Methodology() {
  return (
    <section id="process" className="section-padding relative bg-muted/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            How I Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            A proven process for
            <span className="text-gradient-primary"> geospatial delivery</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every project follows a structured methodology refined over 8 years of 
            delivering enterprise GIS solutions worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="p-6 lg:p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-muted-foreground">
                    STEP {step.id}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-4">
                  {step.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
