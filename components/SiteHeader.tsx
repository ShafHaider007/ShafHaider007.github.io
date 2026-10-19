import Link from 'next/link'
import { profile } from '@/lib/site'

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="page flex h-14 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-[1.2rem] font-medium tracking-tight text-ink">{profile.name}</span>
          <span className="hidden font-mono text-[10.5px] text-ink-3 sm:inline">{profile.coords}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-ink-2 transition-colors hover:text-ink ${n.label === 'Skills' || n.label === 'Experience' ? 'hidden md:inline' : ''}`}
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
