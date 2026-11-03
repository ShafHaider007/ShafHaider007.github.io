'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { EASE, gsap, reducedMotion, useGSAP } from '@/components/motion/gsap'
import { Reveal, ScrubText } from '@/components/motion/Reveal'
import { outputs, questions, type Question } from '@/lib/site'
import { useVizJson, viz } from '@/lib/viz'

type Home = {
  forest: { hansen_loss_ha: number; local_loss_ha: number; local_gain_ha: number; years_hansen: string; years_local: string }
  heat: { ndvi: number[]; lst: number[]; r: number; slope: number; intercept: number }
}

export function Questions() {
  const data = useVizJson<Home>('home.json')
  return (
    <div>
      <div className="divide-y divide-line border-y border-line">
        {questions.map((q, i) => (
          <QuestionRow key={q.id} q={q} n={i + 1} data={data} />
        ))}
      </div>
      <Outputs />
    </div>
  )
}

function QuestionRow({ q, n, data }: { q: Question; n: number; data: Home | null }) {
  return (
    <article className="grid gap-8 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <Reveal y={12}>
          <p className="font-mono text-[12px] text-accent">Question {String(n).padStart(2, '0')}</p>
        </Reveal>
        <ScrubText as="h3" className="mt-4 font-serif text-[1.9rem] leading-[1.15] tracking-tight text-ink md:text-[2.5rem]">
          {q.question}
        </ScrubText>
        <Reveal stagger="p" className="mt-6 max-w-[40rem] space-y-4 text-[1.03rem] leading-[1.75] text-ink-2">
          {q.body.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </Reveal>
        <Reveal className="mt-6">
          <Link href={`/projects/${q.project}`} className="link inline-flex items-center gap-2 text-sm font-medium text-ink">
            {q.evidence} <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
      <div className="lg:col-span-5 lg:pt-10">
        {q.id === 'forest' && <ForestFigure d={data} />}
        {q.id === 'drylands' && <DrylandFigure />}
        {q.id === 'heat' && <HeatFigure d={data} />}
      </div>
    </article>
  )
}

/* ---- forest: global product vs local map ---- */

function ForestFigure({ d }: { d: Home | null }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!d || reducedMotion() || !ref.current) return
      gsap.from(ref.current.querySelectorAll('[data-bar]'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.inOut',
        stagger: 0.25,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    },
    { scope: ref, dependencies: [d] },
  )
  if (!d) return <div className="h-56 animate-pulse bg-line/40" />
  const f = d.forest
  const max = Math.max(f.local_gain_ha, f.local_loss_ha)
  const rows = [
    { label: `Hansen Global Forest Change, loss ${f.years_hansen}`, value: f.hansen_loss_ha, color: '#7c8481', digits: 1 },
    { label: `Local map, forest to other land ${f.years_local}`, value: f.local_loss_ha, color: '#b8452a', digits: 0 },
    { label: `Local map, other land to forest ${f.years_local}`, value: f.local_gain_ha, color: '#3c78a0', digits: 0 },
  ]
  return (
    <figure ref={ref} className="border border-ink/80 bg-surface p-5">
      <p className="eyebrow">Same 15 × 17 km area near Murree, hectares</p>
      <div className="mt-5 space-y-5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-3 text-[13px] text-ink-2">
              <span>{r.label}</span>
              <span className="font-mono text-ink">{r.value.toLocaleString('en-GB', { maximumFractionDigits: r.digits })}</span>
            </div>
            <div className="mt-1.5 h-3 bg-line/60">
              <div data-bar className="h-full" style={{ width: `${Math.max(0.6, (r.value / max) * 100)}%`, background: r.color }} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-[12px] leading-snug text-ink-3">
        Local figures are from the refined classification before any field check, so part of the difference is map
        error. Measuring how much is the research question.
      </figcaption>
    </figure>
  )
}

/* ---- drylands: new fields and the one-out-all-out result ---- */

function DrylandFigure() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root || reducedMotion()) return
      gsap.fromTo(
        root.querySelector('[data-wipe]'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', ease: 'none', scrollTrigger: { trigger: root, start: 'top 75%', end: 'center 45%', scrub: 0.6 } },
      )
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'center 70%', once: true } })
      tl.from(root.querySelectorAll('[data-chip]'), { x: -16, autoAlpha: 0, duration: 0.6, stagger: 0.25, ease: EASE }).from(
        root.querySelector('[data-result]'),
        { scale: 0.85, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)' },
        '+=0.15',
      )
    },
    { scope: ref },
  )
  const chips = [
    { label: 'Plant growth (productivity)', v: 'Improved', up: true },
    { label: 'Land cover', v: 'Improved', up: true },
    { label: 'Soil organic carbon', v: 'Degraded', up: false },
  ]
  return (
    <figure ref={ref} className="border border-ink/80 bg-surface p-[5px]">
      <div className="relative aspect-[8/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={viz('unccd/rgb_2017.webp')} alt="Cholistan desert edge in 2017" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div data-wipe className="absolute inset-0" style={{ clipPath: 'inset(0 0% 0 0)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={viz('unccd/rgb_2024.webp')} alt="The same area in 2024 with new irrigated fields" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <span className="absolute left-2 top-2 bg-surface/90 px-1.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink">2017 → 2024</span>
      </div>
      <div className="space-y-2 p-4">
        {chips.map((c) => (
          <div data-chip key={c.label} className="flex items-center justify-between gap-3 text-[13px]">
            <span className="text-ink-2">{c.label}</span>
            <span className={c.up ? 'font-mono text-[#347684]' : 'font-mono text-accent-ink'}>
              {c.up ? '↑' : '↓'} {c.v}
            </span>
          </div>
        ))}
        <div data-result className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="text-[13px] text-ink">SDG 15.3.1 result (one out, all out)</span>
          <span className="bg-accent px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-white">Degraded</span>
        </div>
      </div>
    </figure>
  )
}

/* ---- heat: vegetation vs surface temperature ---- */

function HeatFigure({ d }: { d: Home | null }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (!d || reducedMotion() || !ref.current) return
      const st = { trigger: ref.current, start: 'top 80%', once: true }
      gsap.from(ref.current.querySelectorAll('circle'), {
        attr: { r: 0 },
        duration: 0.5,
        ease: 'power2.out',
        stagger: { amount: 1.2, from: 'random' },
        scrollTrigger: st,
      })
      gsap.from(ref.current.querySelector('[data-fit]'), { strokeDashoffset: 1, duration: 1.2, delay: 1.1, ease: 'power2.inOut', scrollTrigger: st })
    },
    { scope: ref, dependencies: [d] },
  )
  if (!d) return <div className="h-64 animate-pulse bg-line/40" />
  const h = d.heat
  const W = 420
  const H = 300
  const m = { l: 36, r: 10, t: 12, b: 30 }
  const X = (v: number) => m.l + ((v + 0.1) / 0.9) * (W - m.l - m.r)
  const Y = (v: number) => H - m.b - ((v - 28) / 18) * (H - m.t - m.b)
  return (
    <figure ref={ref} className="border border-ink/80 bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Vegetation against surface temperature, Islamabad">
        {[30, 34, 38, 42].map((v) => (
          <g key={v}>
            <line x1={m.l} x2={W - m.r} y1={Y(v)} y2={Y(v)} stroke="#eeeae1" />
            <text x={m.l - 6} y={Y(v) + 4} textAnchor="end" fontSize={10} className="fill-ink-3 font-mono">
              {v}°
            </text>
          </g>
        ))}
        {[0, 0.4, 0.8].map((v) => (
          <text key={v} x={X(v)} y={H - 10} textAnchor="middle" fontSize={10} className="fill-ink-3 font-mono">
            NDVI {v.toFixed(1)}
          </text>
        ))}
        {h.ndvi.map((v, i) => {
          const k = Math.max(0, Math.min(1, (h.lst[i] - 31) / 13))
          return <circle key={i} cx={X(v)} cy={Y(h.lst[i])} r={2.1} fill={`hsl(${210 - 200 * k} 50% ${47 - 6 * k}%)`} opacity={0.6} />
        })}
        <line
          data-fit
          x1={X(-0.1)}
          y1={Y(h.intercept + h.slope * -0.1)}
          x2={X(0.8)}
          y2={Y(h.intercept + h.slope * 0.8)}
          stroke="#1b2220"
          strokeWidth={2}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={0}
        />
      </svg>
      <figcaption className="mt-2 flex items-baseline justify-between gap-3 text-[12px] text-ink-3">
        <span>Islamabad, 27 June 2019 · Landsat 8 and Sentinel-2</span>
        <span className="font-mono text-ink">r = {h.r.toFixed(2)}</span>
      </figcaption>
    </figure>
  )
}

/* ---- outputs list ---- */

function Outputs() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-[12rem_1fr] md:gap-8">
      <Reveal y={10}>
        <p className="eyebrow pt-1">Research outputs</p>
      </Reveal>
      <Reveal as="ol" stagger="li" className="divide-y divide-line border-y border-line">
        {outputs.map((o) => (
          <li key={o.title} className="grid gap-1 py-4 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
            <span className="font-mono text-[12.5px] text-ink-3">{o.year}</span>
            <span>
              <span className="block font-medium text-ink">{o.title}</span>
              <span className="mt-0.5 block text-[14px] text-ink-2">{o.detail}</span>
            </span>
          </li>
        ))}
      </Reveal>
    </div>
  )
}
