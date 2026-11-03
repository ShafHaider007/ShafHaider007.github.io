'use client'

import { useRef } from 'react'
import { EASE, gsap, reducedMotion, ScrollTrigger, useGSAP } from '@/components/motion/gsap'
import { experience } from '@/lib/site'

/** Timeline: the line fills with scroll, each dot lights up as its role reaches the reading line. */
export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const items = root.querySelectorAll<HTMLElement>('[data-role]')
      if (reducedMotion()) {
        items.forEach((el) => el.classList.add('is-on'))
        return
      }
      gsap.fromTo(
        root.querySelector('[data-fill]'),
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top 65%', end: 'bottom 65%', scrub: 0.4 } },
      )
      items.forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 65%', onEnter: () => el.classList.add('is-on'), onLeaveBack: () => el.classList.remove('is-on') })
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
        tl.from(el.querySelectorAll('[data-head]'), { x: 28, autoAlpha: 0, duration: 0.8, ease: EASE, stagger: 0.08 }).from(
          el.querySelectorAll('li'),
          { y: 14, autoAlpha: 0, duration: 0.6, ease: EASE, stagger: 0.08 },
          '-=0.45',
        )
      })
    },
    { scope: ref },
  )

  return (
    <ol ref={ref} className="relative">
      {/* track and fill */}
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:left-[calc(11rem+7px)]" />
      <span
        aria-hidden
        data-fill
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(11rem+7px)]"
        style={{ transform: 'scaleY(1)' }}
      />
      {experience.map((r) => (
        <li key={r.org} data-role className="group relative grid gap-2 pb-14 pl-9 last:pb-2 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
          <p data-head className="font-mono text-[12.5px] text-ink-3 md:pr-8 md:pt-1.5 md:text-right">
            {r.period}
          </p>
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-line bg-paper transition-colors duration-500 group-[.is-on]:border-accent group-[.is-on]:bg-accent md:left-[11rem]"
          />
          <div className="md:pl-12">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-10">
              <div data-head>
                <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{r.title}</h3>
                <p className="mt-1 text-sm text-ink-2">
                  {r.orgHref ? (
                    <a href={r.orgHref} target="_blank" rel="noreferrer" className="link">
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                  <span className="text-ink-3"> · {r.place}</span>
                </p>
              </div>
              <ul className="space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                {r.points.map((pt) => (
                  <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-3">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
