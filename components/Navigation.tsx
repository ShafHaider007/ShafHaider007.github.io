"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: "About", href: "#about", number: "01" },
    { name: "Experience", href: "#experience", number: "02" },
    { name: "Projects", href: "#projects", number: "03" },
    { name: "Contact", href: "#contact", number: "04" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      const sections = ["home", "about", "experience", "projects", "contact"]
      const offset = 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop - offset && scrollPosition < offsetTop + offsetHeight - offset) {
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border/20 shadow-lg" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="#home"
            className="text-2xl font-bold text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <span className="font-mono">Shaf Haider</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-2 text-sm font-mono transition-all duration-300 hover:text-primary relative ${
                  activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-primary text-xs opacity-70">{item.number}.</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                {activeSection === item.href.slice(1) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors duration-300 relative z-10"
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${
                isOpen ? 'rotate-45 top-3' : 'top-1'
              }`} />
              <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 top-3 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`absolute block w-full h-0.5 bg-current transition-all duration-300 ${
                isOpen ? '-rotate-45 top-3' : 'top-5'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 ${
          isOpen 
            ? "opacity-100 visible bg-background/95 backdrop-blur-md border-b border-border/20" 
            : "opacity-0 invisible"
        }`}>
          <div className="px-6 py-8 space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 text-lg font-mono transition-all duration-300 hover:text-primary transform ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${activeSection === item.href.slice(1) ? "text-primary" : "text-muted-foreground"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-primary text-sm opacity-70">{item.number}.</span>
                <span>{item.name}</span>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </nav>
  )
}
