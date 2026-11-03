'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { viz } from '@/lib/viz'
import type { Project } from '@/lib/projects'

const POSTER: Record<string, string> = {
  'forest-carbon-activity-data': 'jfrel',
  'unccd-2026-national-reporting': 'unccd',
  'national-forest-monitoring-system': 'nfms',
  geofasal: 'geofasal',
  'move-smart': 'movesmart',
  'mottainai-recycling': 'mottainai',
  'dha-property-webgis': 'dha',
}

const LABELS: Record<string, [string, string]> = {
  jfrel: ['Sentinel-2 composite', 'Classified land cover'],
  unccd: ['Sentinel-2, 2024', 'SDG 15.3.1 status'],
  nfms: ['Relief tiles', 'Relief + forest tiles'],
  geofasal: ['True colour', 'NDVI + field boundaries'],
  movesmart: ['True colour', 'Surface temperature + routes'],
  mottainai: ['Street network', 'Optimised pickup route'],
  dha: ['Footprints', 'Extruded in 3D'],
}

/** Poster wipes from the input data to the analysis as the card scrolls into view; hover shows the input. */
function Poster({ id, large }: { id: string; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.55 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const b = shown && !hover
  const [la, lb] = LABELS[id]
  return (
    <div
      ref={ref}
      className="relative border border-ink/80 bg-surface p-[5px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={cn('relative overflow-hidden', large ? 'aspect-[16/10]' : 'aspect-[16/10]')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={viz(`posters/${id}_a.webp`)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={viz(`posters/${id}_b.webp`)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(.65,0,.35,1)]"
          style={{ clipPath: b ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' }}
        />
        <span className="absolute bottom-2.5 left-2.5 rounded-[2px] bg-surface/90 px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink transition-opacity duration-500">
          {b ? lb : la}
        </span>
      </div>
    </div>
  )
}

export function ProjectCard({ project: p, index, large }: { project: Project; index: number; large?: boolean }) {
  const no = String(index + 1).padStart(2, '0')
  const id = POSTER[p.slug]
  return (
    <article className={cn('group flex flex-col', large && 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-10')}>
      <Link href={`/projects/${p.slug}`} tabIndex={-1} aria-hidden className={cn('block', large && 'lg:col-span-7')}>
        <Poster id={id} large={large} />
      </Link>
      <div className={cn('mt-5', large && 'lg:col-span-5 lg:mt-0')}>
        <p className="eyebrow">
          <span className="text-accent">{no}</span> · {p.period}
        </p>
        <h3 className={cn('mt-2 font-serif leading-[1.18] tracking-tight text-ink', large ? 'text-[1.7rem] md:text-[2.1rem]' : 'text-[1.5rem]')}>
          <Link href={`/projects/${p.slug}`} className="transition-colors hover:text-accent-ink">
            {p.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-ink-3">{p.client}</p>
        <p className="mt-3 leading-relaxed text-ink-2">{p.blurb}</p>
        <p className="mt-4 border-l-2 border-line pl-3 text-[13px] leading-snug text-ink-3">
          <span className="text-ink-2">Inside:</span> {p.media}
        </p>
        <Link href={`/projects/${p.slug}`} className="link mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink">
          Read how it works <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  )
}
