'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useScrollChapter } from '@/hooks/useScrollChapter'
import { homeChapters } from '@/lib/story'

const homeNavItems = homeChapters.map((c) => ({
  label: c.label ?? c.id,
  href: `#${c.id}`,
}))

const siteNavItems = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const activeSection = useScrollChapter(homeChapters, 280, isHome)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    if (isHome) {
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
    setScrolled(true)
  }, [isHome])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = isHome ? homeNavItems : siteNavItems

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">SH</span>
          </div>
          <span className="font-display font-semibold text-foreground text-sm tracking-wide">Shaf Haider</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.startsWith('#') ? item.href.slice(1) : ''
            const isActive = isHome
              ? activeSection === sectionId
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
            const className = `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`
            const indicator = isActive ? (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            ) : null

            return item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} className={className}>
                {item.label}
                {indicator}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
                {indicator}
              </Link>
            )
          })}
          <div className="w-px h-6 bg-border mx-2" />
          <a
            href="mailto:shaf.shafheidar@gmail.com"
            className="px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Hire Me
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-full bg-foreground transition-all duration-300 ${
                isOpen ? 'top-2.5 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-full bg-foreground transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full bg-foreground transition-all duration-300 ${
                isOpen ? 'top-2.5 -rotate-45' : 'top-[18px]'
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border/30 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {navItems.map((item, i) => {
                const isHash = item.href.startsWith('#')
                const inner = (
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </motion.span>
                )
                return isHash ? (
                  <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    {inner}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    {inner}
                  </Link>
                )
              })}
              <a
                href="mailto:shaf.shafheidar@gmail.com"
                className="mt-2 px-4 py-3 bg-primary text-primary-foreground text-base font-medium rounded-lg text-center"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
