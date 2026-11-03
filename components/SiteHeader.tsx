'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '@/lib/site'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/research/', label: 'Research' },
  { href: '/projects/', label: 'Projects' },
  { href: '/outputs/', label: 'Outputs' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const current = (href: string) => href !== '/#contact' && pathname.startsWith(href.replace(/\/$/, ''))
  return (
    <header className="border-b border-line">
      <div className="page flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3 sm:py-4">
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.01em] text-ink hover:text-accent">
          {profile.name}
        </Link>
        <a href={profile.cvPdf} className="link text-[15px] sm:order-last" data-print-hide>
          CV (PDF)
        </a>
        <nav aria-label="Main" data-site-nav className="w-full sm:ml-auto sm:w-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={current(n.href) ? 'page' : undefined}
                  className={cn(
                    'text-ink-2 underline-offset-[0.25em] hover:text-accent hover:underline',
                    current(n.href) && 'font-medium text-ink underline decoration-ink decoration-2',
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
