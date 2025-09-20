"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  const navItems = [
    { name: "About", href: "#about", number: "01" },
    { name: "Experience", href: "#experience", number: "02" },
    { name: "Projects", href: "#projects", number: "03" },
    { name: "Contact", href: "#contact", number: "04" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="#home"
            className="text-2xl font-playfair font-bold text-foreground hover:text-primary transition-colors duration-300"
          >
            SH
          </Link>

          {/* Desktop Navigation - Inspired by Brittany Chiang's style */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-2 text-sm font-mono transition-all duration-300 hover:text-primary ${
                  activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-primary text-xs">{item.number}.</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
              </Link>
            ))}

            {/* Resume Button */}
            <Link
              href="/resume.pdf"
              target="_blank"
              className="ml-8 px-4 py-2 border border-primary text-primary text-sm font-mono hover:bg-primary/10 transition-all duration-300 rounded"
            >
              Resume
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 text-lg font-mono transition-colors duration-300 hover:text-primary ${
                    activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-primary text-sm">{item.number}.</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-block mt-8 px-6 py-3 border border-primary text-primary font-mono hover:bg-primary/10 transition-all duration-300 rounded"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
