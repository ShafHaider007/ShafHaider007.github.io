'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Expertise', href: '#expertise', number: '01' },
  { label: 'Process', href: '#process', number: '02' },
  { label: 'Projects', href: '#projects', number: '03' },
  { label: 'Testimonials', href: '#testimonials', number: '04' },
  { label: 'Contact', href: '/contact', number: '05' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 40)

      const sections = ['home', 'expertise', 'process', 'projects', 'testimonials', 'contact']
      const offset = 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue
        const top = element.offsetTop - offset
        const bottom = top + element.offsetHeight
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section)
          break
        }
      }
    }

    if (pathname === '/') {
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setScrolled(true)
    }
  }, [pathname])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md border-b border-border/30 bg-background/80' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          SHAF HAIDER
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith('#')
            const isActive = isAnchor ? activeSection === item.href.slice(1) : pathname === item.href

            if (isAnchor) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm uppercase tracking-[0.25em] transition ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="mr-2 text-[0.65rem] text-primary/70">{item.number}</span>
                  {item.label}
                </a>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm uppercase tracking-[0.25em] transition ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="mr-2 text-[0.65rem] text-primary/70">{item.number}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <button
          type="button"
          className="md:hidden text-muted-foreground"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 h-0.5 w-full bg-current transition ${
                isOpen ? 'top-2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full bg-current transition ${
                isOpen ? 'opacity-0' : 'top-2'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full bg-current transition ${
                isOpen ? 'top-2 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
      </div>
      <div
        className={`md:hidden transition ${
          isOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {navItems.map((item) => {
            const isAnchor = item.href.startsWith('#')
            const isActive = isAnchor ? activeSection === item.href.slice(1) : pathname === item.href

            if (isAnchor) {
              return (
                <a key={item.label} href={item.href} className={isActive ? 'text-primary' : ''}>
                  {item.number} · {item.label}
                </a>
              )
            }

            return (
              <Link key={item.label} href={item.href} className={isActive ? 'text-primary' : ''}>
                {item.number} · {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
