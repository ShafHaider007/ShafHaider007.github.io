"use client"

import { useEffect, useRef } from "react"
import { Compass, Globe2, Layers, MapPin, Mail, Radar, Sparkles } from "lucide-react"
import Link from "next/link"

const focusSignals = [
  { icon: Globe2, label: "Spatial analytics", description: "Interactive dashboards for location intelligence" },
  { icon: Layers, label: "Data engineering", description: "Reliable pipelines for raster, vector & IoT feeds" },
  { icon: Compass, label: "Decision support", description: "Scenario planning for mobility & urban resilience" }
]

const deliveryMetrics = [
  { label: "Projects deployed", value: "12", helper: "Web & GIS solutions" },
  { label: "Cities mapped", value: "18", helper: "Across 3 regions" },
  { label: "Toolset", value: "ArcGIS · deck.gl · Next.js", helper: "Primary stack" }
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    )

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(24,92,142,0.25)_0%,_rgba(5,28,44,0.92)_55%,_rgba(2,13,21,1)_100%)] px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:flex-row lg:items-start lg:justify-center lg:pb-24 lg:pt-24"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute -top-32 right-1/3 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-primary/10 bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-14 lg:flex-row lg:items-start lg:gap-16">
        <div className="space-y-8 md:space-y-10 lg:w-[58%] animate-on-scroll">
          <div className="h-10"></div>

          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[3.9rem]">
              Crafting GIS that turns Geospatial data into confident decisions
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            I help product teams, public agencies, and researchers transform geospatial data into actionable web applications
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-muted-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">Core strengths</p>
                <p className="mt-2 text-foreground">
                  Service design, geospatial architecture, and front-end systems working together to release fast, reliable tools.
                </p>
              </div>
              <div className="rounded-2xl border border-border/40 bg-background/70 p-4 text-sm text-muted-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary/60">Delivery mindset</p>
                <p className="mt-2 text-foreground">Continuous discovery loops, rapid prototyping, and production handoffs your team can trust.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-muted/40 bg-muted/30 px-3 py-1">
              <MapPin className="h-4 w-4 text-primary" /> Islamabad, Pakistan
            </span>
            <Link
              href="mailto:shaf.shafheidar@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary transition hover:border-primary/60 hover:bg-primary/15"
            >
              <Mail className="h-4 w-4" /> shaf.shafheidar@gmail.com
            </Link>
          </div>

        </div>

        <div className="flex w-full flex-col gap-6 lg:w-[42%] lg:pt-10">
          <div className="animate-on-scroll overflow-hidden rounded-3xl border border-primary/20 bg-card/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">Focus areas</p>
            <div className="mt-6 space-y-5">
              {focusSignals.map((signal, index) => (
                <div
                  key={signal.label}
                  className="group flex flex-col gap-4 rounded-2xl border border-transparent bg-background/40 p-4 transition hover:border-primary/50 hover:bg-primary/5 sm:flex-row sm:items-start"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <signal.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="text-lg font-semibold text-foreground">{signal.label}</h3>
                    <p className="text-sm text-muted-foreground">{signal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-on-scroll grid gap-4 rounded-3xl border border-border/60 bg-secondary/40 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Delivery snapshots</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliveryMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/60 bg-background/60 p-4">
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary/80">{metric.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
