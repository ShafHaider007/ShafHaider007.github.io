'use client'

import { useEffect, useState } from 'react'

export interface ScrollChapter {
  id: string
  label?: string
}

export function useScrollChapter(chapters: ScrollChapter[], offset = 200, enabled = true) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '')

  useEffect(() => {
    if (!enabled) return

    const handleScroll = () => {
      const scrollY = window.scrollY + offset

      for (let i = chapters.length - 1; i >= 0; i--) {
        const element = document.getElementById(chapters[i].id)
        if (!element) continue
        if (scrollY >= element.offsetTop) {
          setActiveId(chapters[i].id)
          return
        }
      }
      if (chapters[0]) setActiveId(chapters[0].id)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapters, offset, enabled])

  return activeId
}
