'use client'

import { useRef } from 'react'
import { EASE, gsap, reducedMotion, SplitText, useGSAP } from '@/components/motion/gsap'
import { scrollToId } from '@/components/motion/SmoothScroll'
import { HeroStack } from '@/components/viz/HeroStack'
import { profile } from '@/lib/site'

/** Hero with a short GSAP intro: headline words rise, text and stack follow. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const intro = root.querySelectorAll<HTMLElement>('[data-intro]')
      if (reducedMotion()) {
        gsap.set(intro, { opacity: 1 })
        return
      }
      // make the end state visible first: `from` tweens record their end values when created
      gsap.set(intro, { opacity: 1, animation: 'none' })
      const h1 = root.querySelector('h1')!
      const split = SplitText.create(h1, { type: 'lines,words', mask: 'lines' })
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.from(root.querySelector('[data-intro="eyebrow"]'), { y: 12, autoAlpha: 0, duration: 0.7 })
        .from(split.words, { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.045 }, '-=0.45')
        .from(root.querySelectorAll('[data-intro="text"]'), { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, '-=0.7')
        .from(root.querySelector('[data-intro="stack"]'), { y: 40, autoAlpha: 0, scale: 0.96, duration: 1.4, ease: 'power3.out' }, 0.25)
      return () => split.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="page pb-14 pt-10 md:pb-20 md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-intro="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 data-intro="h1" className="mt-6 font-serif text-[2.6rem] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[3.4rem] lg:text-[3.6rem]">
            Mapping Pakistan’s forests, land and cities from <em className="italic text-accent-ink">satellite data</em>.
          </h1>
          <p data-intro="text" className="mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-ink-2">
            {profile.summary}
          </p>
          <div data-intro="text" className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => scrollToId('work') && e.preventDefault()}
              className="bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-ink"
            >
              See the work
            </a>
            <a
              href="#research"
              onClick={(e) => scrollToId('research') && e.preventDefault()}
              className="border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Research interests
            </a>
          </div>
          <div data-intro="text" className="mt-12 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-2">
            <p className="eyebrow mb-1.5 text-ink-3">Currently</p>
            {profile.current}
          </div>
        </div>
        <div className="lg:col-span-7" data-intro="stack">
          <HeroStack />
          <p className="mx-auto mt-3 max-w-[640px] font-mono text-[10.5px] leading-snug text-ink-3">
            Islamabad, 16 × 12 km · Sentinel-2, 1 October 2024 · bands, index and land-cover map computed for this site
          </p>
        </div>
      </div>
    </section>
  )
}
