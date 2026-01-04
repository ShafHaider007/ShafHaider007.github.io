'use client'

import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-block py-1 px-3 border border-primary/20 text-primary text-sm tracking-wider font-medium uppercase bg-white/50 backdrop-blur-sm">
            Available for freelance & consulting
          </span>
        </motion.div>

        <motion.h1
          className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-primary mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Spatial Data Engineer <br />
          <span className="text-foreground/80 font-normal italic">& GIS Specialist</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Crafting digital cartography and spatial analysis tools that transform complex geographic data into clarity.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-3 text-lg font-medium text-primary hover:text-accent transition-colors"
          >
            View Selected Works
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="hidden sm:block w-px h-8 bg-border" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-accent" />
            <span>Islamabad, Pakistan</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid Lines - Swiss Style */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border/40 hidden lg:block" />
      <div className="absolute bottom-32 left-0 w-full h-px bg-border/40" />

    </section>
  )
}

