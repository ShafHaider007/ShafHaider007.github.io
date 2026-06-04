'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'

const roles = ['Data Engineer', 'Remote Sensing Scientist', 'Spatial Databases']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const blobYReverse = useTransform(scrollYProgress, [0, 1], [0, -120])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <motion.div
          style={{ y: blobY }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: blobYReverse }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]"
        />
      </motion.div>

      <div className="container-wide relative z-10 pt-32 pb-20">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for projects</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-8"
          >
            I build the pipelines
            <br />
            <span className="text-gradient-primary">that turn satellites into science</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6"
          >
            Geospatial data engineer and earth observation scientist. I design, build, and maintain satellite-imagery
            data pipelines, manage spatial databases, and run remote-sensing science for biodiversity, geotechnical,
            and earth-systems work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {roles.map((role) => (
              <span
                key={role}
                className="px-4 py-1.5 text-sm font-medium text-foreground/70 border border-border rounded-full bg-card"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#work"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm tracking-wide rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-display font-semibold text-sm tracking-wide rounded-xl hover:bg-muted transition-colors"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-20 max-w-3xl">
          <ScrollHighlightText className="text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed">
            From raw orbital scenes to analysis-ready data and documented APIs — I turn satellite imagery into science teams can act on.
          </ScrollHighlightText>
        </div>
      </div>
    </section>
  )
}
