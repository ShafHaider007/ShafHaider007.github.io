'use client'

import { motion, useScroll } from 'motion/react'
import { usePathname } from 'next/navigation'
import { homeChapters } from '@/lib/story'
import { useScrollChapter } from '@/hooks/useScrollChapter'

export function TopProgress() {
  const { scrollYProgress } = useScroll()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const activeChapter = useScrollChapter(homeChapters, 280, isHome)
  const activeIndex = homeChapters.findIndex((c) => c.id === activeChapter)

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-primary"
      />
      {isHome && (
        <div className="fixed right-4 top-24 z-50 hidden lg:flex flex-col gap-2" aria-hidden>
          {homeChapters.map((chapter, i) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-primary scale-125' : 'bg-border hover:bg-primary/40'
              }`}
              title={chapter.label}
            />
          ))}
        </div>
      )}
    </>
  )
}
