'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['services', 'process', 'projects', 'contact']
      const offset = 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue
        const top = element.offsetTop - offset
        const bottom = top + element.offsetHeight
        if (window.scrollY >= top && window.scrollY < bottom) {
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
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">SH</span>
          </div>
          <span className="font-display font-semibold text-foreground text-sm tracking-wide">
            Shaf Haider
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
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
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
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
