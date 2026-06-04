'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Satellite } from 'lucide-react'

const EARTH_OBS_IMAGE = '/images/imaginearth-la-terre-en-images-opZ--yE1-hg-unsplash.jpg'

export function EarthObservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12])

  return (
    <section
      id="pipelines"
      ref={sectionRef}
      aria-label="Satellite imagery data pipelines"
      className="relative overflow-hidden min-h-[480px] md:min-h-[620px] lg:min-h-[72vh] flex items-center"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 origin-center"
      >
        <Image
          src={EARTH_OBS_IMAGE}
          alt="High-resolution satellite view of a coastal river delta with sediment plumes and urban development"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={92}
          priority
        />
      </motion.div>

      {/* Light vignette — image stays vivid */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/15"
        aria-hidden
      />

      <div className="container-wide relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-lg md:max-w-xl rounded-2xl border border-white/10 bg-slate-950/75 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/20 text-teal-300 ring-1 ring-teal-400/30">
              <Satellite className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-teal-300 uppercase tracking-widest">
              Satellite Data Pipelines
            </span>
          </div>

          <h2
            className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight mb-5 leading-[1.15] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
          >
            From raw scenes to{' '}
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-200 bg-clip-text text-transparent">
              analysis-ready data
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-200/90 leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
            Ingest, cloud-mask, reproject, and publish — orchestrated pipelines (GDAL, Rasterio, Airflow) that turn raw
            Sentinel and Landsat scenes into cloud-optimised, reproducible data the whole team can trust.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
