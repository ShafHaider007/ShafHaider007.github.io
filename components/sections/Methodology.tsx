'use client'

import { motion } from 'motion/react'
import { MessageSquare, Download, Cpu, Database, Server, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PinnedProcess, type ProcessStep } from '@/components/animations/PinnedProcess'

const steps: {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  desc: string
  color: string
}[] = [
  {
    id: '01',
    icon: MessageSquare,
    title: 'Discovery',
    subtitle: 'Objectives & Data',
    desc: 'Understanding the science question, data sources, and delivery objectives — scoping the imagery, AOIs, and outputs that matter.',
    color: 'bg-teal-500',
  },
  {
    id: '02',
    icon: Download,
    title: 'Ingestion',
    subtitle: 'ETL & Acquisition',
    desc: 'Automated discovery and ingestion of satellite scenes and vector data into orchestrated, reproducible pipelines.',
    color: 'bg-blue-500',
  },
  {
    id: '03',
    icon: Cpu,
    title: 'Processing & QA',
    subtitle: 'Transform & Validate',
    desc: 'Cloud masking, reprojection, transformations, and spatial analysis with GDAL, Rasterio, and GEE — with automated QA at every step.',
    color: 'bg-violet-500',
  },
  {
    id: '04',
    icon: Database,
    title: 'Spatial Database',
    subtitle: 'Model & Store',
    desc: 'Modelling clean PostGIS schemas with validated geometries and indexes for integrity, efficiency, and secure access.',
    color: 'bg-amber-500',
  },
  {
    id: '05',
    icon: Server,
    title: 'API & Delivery',
    subtitle: 'Serve & Integrate',
    desc: 'Documented FastAPI services and schemas built with web developers to power APIs and web mapping applications.',
    color: 'bg-cyan-500',
  },
  {
    id: '06',
    icon: FileText,
    title: 'Reporting',
    subtitle: 'Analysis & Deliverables',
    desc: 'Indicators, reproducible notebooks, and scientific reports delivered within the agreed objectives of quality and time.',
    color: 'bg-emerald-500',
  },
]

const processSteps: ProcessStep[] = steps.map((s) => ({
  title: s.title,
  description: s.desc,
  indexLabel: s.id,
}))

export function Methodology() {
  return (
    <section id="process" className="relative bg-muted/30">
      <div className="container-wide section-padding pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            How I Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            The data pipeline
            <span className="text-gradient-primary"> lifecycle</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scroll through each phase — every project follows the same path from raw satellite scenes to analysis-ready
            data, spatial databases, APIs, and scientific reporting.
          </p>
        </motion.div>
      </div>

      <PinnedProcess
        steps={processSteps}
        pinMultiplier={800}
        renderStep={(step, index) => {
          const meta = steps[index]
          const Icon = meta.icon
          return (
            <div className="space-y-4 pl-0 md:pl-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${meta.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-foreground">STEP {meta.id}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">{meta.subtitle}</p>
              <h3 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">{step.title}</h3>
              <p className="text-sm text-muted-foreground md:text-base">{step.description}</p>
            </div>
          )
        }}
      />
    </section>
  )
}
