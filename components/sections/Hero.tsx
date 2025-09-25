"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowRight, MapPin, Mail, Github, Linkedin, ExternalLink, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            observer.unobserve(entry.target) // Stop observing once animated
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        {/* Main heading */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-primary font-mono text-sm tracking-wider uppercase">
              Hello, I'm
            </p>
            <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-none tracking-tight">
              Muhammad Shaf
              <span className="block text-primary">Haider</span>
            </h1>
          </div>

          <p className="text-2xl lg:text-3xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            GIS Developer & Spatial Solutions Consultant
          </p>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "GIS is a toolbox—unlocking a world of geospatial possibilities."
          </p>

          {/* Location & Contact */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <span>shaf.shafheidar@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            size="lg"
            className="group px-8 py-4 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
            asChild
          >
            <Link href="#projects">
              View My Work
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-medium border-primary/20 hover:border-primary/40 hover:bg-primary/5"
            asChild
          >
            <Link href="/resume.pdf" target="_blank">
              <Download size={20} className="mr-2" />
              Resume
            </Link>
          </Button>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 pt-8">
          <Link
            href="https://github.com"
            target="_blank"
            className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={24} />
          </Link>
          <Link
            href="mailto:shaf.shafheidar@gmail.com"
            className="p-3 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Mail size={24} />
          </Link>
        </div>


      </div>
    </section>
  )
}
