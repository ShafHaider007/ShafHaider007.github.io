'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap, reducedMotion, useGSAP } from '@/components/motion/gsap'
import { Reveal } from '@/components/motion/Reveal'
import { methodColumns, methods, tools } from '@/lib/site'

/** Methods × projects matrix; dots fill row by row as it scrolls into view. Tools follow as chips. */
export function Methods() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root || reducedMotion()) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 70%', scrub: 0.5 } })
      tl.from(root.querySelectorAll('[data-col]'), { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.3 })
        .from(root.querySelectorAll('[data-rowname]'), { autoAlpha: 0, y: 8, stagger: 0.06, duration: 0.35 }, 0.1)
        .from(root.querySelectorAll('[data-dot]'), { scale: 0, transformOrigin: '50% 50%', stagger: 0.03, duration: 0.25, ease: 'back.out(2)' }, 0.2)
    },
    { scope: ref },
  )

  return (
    <div className="grid gap-14">
      {/* phones: each method with the projects that used it */}
      <Reveal as="ul" stagger="li" y={10} className="divide-y divide-line border-y border-line sm:hidden">
        {methods.map((m) => (
          <li key={m.name} className="py-3">
            <p className="text-[14.5px] text-ink">{m.name}</p>
            <p className="mt-1.5 flex flex-wrap gap-1.5">
              {m.used.map((i) => (
                <Link
                  key={i}
                  href={`/projects/${methodColumns[i].slug}`}
                  className="flex items-center gap-1 border border-line bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {methodColumns[i].short}
                </Link>
              ))}
            </p>
          </li>
        ))}
      </Reveal>

      <div ref={ref} className="hidden sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Methods used in each project</caption>
          <thead>
            <tr>
              <th className="w-[44%] pb-3 align-bottom font-normal">
                <span className="eyebrow">Method</span>
              </th>
              {methodColumns.map((c) => (
                <th key={c.slug} data-col className="pb-3 text-center align-bottom font-normal">
                  <Link href={`/projects/${c.slug}`} className="font-mono text-[11px] text-ink-2 transition-colors hover:text-accent-ink">
                    {c.short}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {methods.map((m) => (
              <tr key={m.name} className="group border-t border-line transition-colors hover:bg-surface">
                <th scope="row" data-rowname className="py-3 pr-4 text-[14.5px] font-normal text-ink">
                  {m.name}
                </th>
                {methodColumns.map((c, i) => (
                  <td key={c.slug} className="py-3 text-center">
                    {m.used.includes(i) ? (
                      <span data-dot className="inline-block h-3 w-3 rounded-full bg-accent group-hover:bg-accent-ink" aria-label={`used in ${c.short}`} />
                    ) : (
                      <span className="inline-block h-[3px] w-[3px] rounded-full bg-line" aria-hidden />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Reveal key={t.group} stagger="[data-chip]" y={12}>
            <h3 className="eyebrow border-b border-line pb-2.5 text-ink">{t.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {t.items.map((it) => (
                <li key={it} data-chip className="border border-line bg-surface px-2 py-1 text-[13px] text-ink-2">
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function Education({ education }: { education: typeof import('@/lib/site').education }) {
  return (
    <div className="grid gap-8 border border-line bg-surface p-6 md:grid-cols-[12rem_1fr] md:gap-8 md:p-9">
      <Reveal y={10}>
        <p className="eyebrow pt-1">Degree</p>
      </Reveal>
      <div>
        <Reveal>
          <h3 className="font-serif text-[1.6rem] leading-tight text-ink">{education.degree}</h3>
          <p className="mt-1.5 text-[15px] text-ink-2">
            {education.school} · {education.dept}
          </p>
          <p className="mt-1.5 font-mono text-[12.5px] text-ink-3">
            {education.period} · {education.awarded} · {education.grade}
          </p>
        </Reveal>
        <Reveal className="mt-7 border-l-2 border-accent pl-4">
          <p className="eyebrow mb-1.5">Final-year thesis</p>
          <p className="max-w-3xl font-serif text-[1.15rem] leading-snug text-ink">{education.thesis}</p>
          <Link href="/projects/move-smart" className="link mt-2 inline-block text-sm text-ink-2">
            Grade A in both parts · see the project →
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal stagger="li" y={10}>
            <p className="eyebrow mb-3">A grades</p>
            <ul className="flex flex-wrap gap-1.5">
              {education.aGrades.map((c) => (
                <li key={c} className="flex items-center gap-1.5 border border-line bg-paper px-2 py-1 text-[13px] text-ink">
                  <span className="font-mono text-[10.5px] text-accent">A</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal stagger="li" y={10}>
            <p className="eyebrow mb-3">Other core courses</p>
            <ul className="flex flex-wrap gap-1.5">
              {education.core.map((c) => (
                <li key={c} className="border border-line bg-paper px-2 py-1 text-[13px] text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

