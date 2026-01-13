'use client'

import { ArrowRight, Globe, Layers, Server, Code, Building, Network } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Timeline
  // 0.0 - 0.3: Main Headline (Full Stack WebGIS)
  // 0.3 - 0.6: Business Apps (Industry Grade)
  // 0.6 - 1.0: Geoportals (Scale/International)

  const opacityStage1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
  const opacityStage2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0])
  const opacityStage3 = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1])

  const yStage1 = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const yStage2 = useTransform(scrollYProgress, [0.3, 0.4, 0.6], [50, 0, -50])
  const yStage3 = useTransform(scrollYProgress, [0.6, 0.7, 1], [50, 0, 0])

  return (
    <section ref={containerRef} className="relative h-[400vh] font-mono">

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pointer-events-none">

        {/* Background Overlays - Clean Technical Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-8 left-8 text-[10px] text-muted-foreground tracking-widest border border-slate-200 px-3 py-1 bg-white/50 backdrop-blur-sm shadow-sm">
            SYSTEM: ONLINE // GEO-SPATIAL CORE ACTIVE
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full z-10 relative px-6 lg:px-12 pointer-events-auto">

          {/* Stage 1: Full Stack WebGIS Developer */}
          <motion.div style={{ opacity: opacityStage1, y: yStage1 }} className="absolute inset-0 top-1/2 -translate-y-1/2 flex flex-col justify-center max-w-4xl">
            <div className="mb-6 flex items-center gap-4 text-primary text-sm uppercase tracking-[0.3em] font-bold">
              <Globe className="w-5 h-5 animate-spin-slow text-primary" />
              <span>Location Intelligence Specialist</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.95] mb-8 font-serif-display">
              FULL STACK<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">WEBGIS</span><br />
              DEVELOPER
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Architecting the intersection of modern <span className="text-foreground font-medium">web technology</span> and <span className="text-foreground font-medium">spatial data</span>.
            </p>
          </motion.div>

          {/* Stage 2: Industry Grade Web Applications */}
          <motion.div style={{ opacity: opacityStage2, y: yStage2 }} className="absolute inset-0 top-1/2 -translate-y-1/2 flex flex-col items-end justify-center text-right ml-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-end gap-3 text-secondary text-sm uppercase tracking-[0.3em] font-bold">
              <Building className="w-5 h-5" />
              <span>Enterprise Solutions</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-none mb-8 font-serif-display">
              INDUSTRY<br />
              GRADE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-800">APPLICATIONS</span>
            </h2>
            <div className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              <ScrollHighlightText className="text-right text-slate-600">
                Building robust, scalable business tools that drive decision-making. From logistics dashboards to asset management systems.
              </ScrollHighlightText>
            </div>
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full bg-white/60 backdrop-blur-md shadow-sm">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-slate-700">Scalable Backend</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-full bg-white/60 backdrop-blur-md shadow-sm">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-slate-700">Type-Safe</span>
              </div>
            </div>
          </motion.div>

          {/* Stage 3: National & International Geoportals */}
          <motion.div style={{ opacity: opacityStage3, y: yStage3 }} className="absolute inset-0 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-3 text-accent text-sm uppercase tracking-[0.3em] font-bold">
              <Network className="w-5 h-5 animate-pulse" />
              <span>Global Infrastructure</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.9] mb-8 font-serif-display">
              NATIONAL &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">INTERNATIONAL</span><br />
              GEOPORTALS
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-12">
              Empowering organizations with centralized spatial data hubs. Interactive, performant, and secure.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link
                href="#projects"
                className="group relative px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase overflow-hidden hover:bg-primary/90 transition-all shadow-md rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolios <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border border-slate-300 hover:bg-slate-50 transition-colors font-mono text-sm tracking-widest uppercase flex items-center justify-center rounded-sm text-slate-700"
              >
                Initiate Contact
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
