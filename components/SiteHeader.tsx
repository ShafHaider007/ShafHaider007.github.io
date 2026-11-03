'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { scrollToId } from '@/components/motion/SmoothScroll'
import { profile } from '@/lib/site'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience', wide: true },
  { id: 'skills', label: 'Methods', wide: true },
  { id: 'contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const home = pathname === '/'
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="page flex h-14 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-[1.2rem] font-medium tracking-tight text-ink">{profile.name}</span>
          <span className="hidden font-mono text-[10.5px] text-ink-3 xl:inline">{profile.coords}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-6">
          {NAV.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              onClick={(e) => {
                if (home && scrollToId(n.id)) e.preventDefault()
              }}
              className={cn('text-ink-2 transition-colors hover:text-ink', n.wide && 'hidden md:inline')}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={profile.cv}
            download
            className="hidden border border-ink px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-block"
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  )
}
