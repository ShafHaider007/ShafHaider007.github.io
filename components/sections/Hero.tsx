'use client'

import { MapPin, ArrowRight, Layers, Satellite } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // GIS Parallax Layers
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[900px] flex flex-col justify-center px-4 lg:px-8 overflow-hidden font-mono">

      {/* Background Grid & GIS Data Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-10 left-10 text-[10px] text-primary/40 tracking-widest border border-primary/20 px-2 py-1">
          SYS.STATUS: ONLINE
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full z-10 relative">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col relative"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 self-start"
          >
            <div className="flex items-center gap-3 text-secondary text-xs uppercase tracking-[0.2em] font-bold">
              <Satellite className="w-4 h-4 animate-spin-slow" />
              <span>Geospatial Intelligence Verified</span>
            </div>
          </motion.div>

          {/* Technical Typography */}
          <div className="relative mb-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.9]"
            >
              SPATIAL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">ARCHITECT</span>
            </motion.h1>

            <div className="mt-6 flex flex-col gap-1 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4 max-w-sm">
              <span>LAT: 33.6844° N // LNG: 73.0479° E</span>
              <span>BASE: ISLAMABAD, PK</span>
              <span>ROLE: FULL STACK + GIS</span>
            </div>
          </div>

          {/* Interactive Scroll Text */}
          <div className="border-t border-white/10 pt-8 max-w-2xl">
            <ScrollHighlightText className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
              Engineer of scalable digital twins and location intelligence. Translating raw spatial data into actionable high-performance web solutions.
            </ScrollHighlightText>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link
              href="#projects"
              className="group inline-flex items-center gap-4 text-primary hover:text-white transition-colors text-lg font-bold tracking-wider"
            >
              [ VIEW OPERATION LOG ]
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scale Bar */}
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="w-32 h-2 border-b-2 border-r-2 border-primary/30 relative">
          <span className="absolute bottom-2 right-0 text-[10px] text-primary/50">1:10000</span>
        </div>
      </div>
    </section>
  )
}
