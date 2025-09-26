"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import {
  ArrowRight,
  Download,
  Compass,
  Globe2,
  Layers,
  MapPin,
  Mail,
  Radar,
  Sparkles,
  Trophy
} from "lucide-react"
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

const trustedPartners = ["UrbanFlow Lab", "CityWorks", "Geoverse", "MobilityX"]

const featuredProject = {
  name: "Transit Sense",
  summary: "Adaptive ridership insights for multi-modal mobility planning",
  highlights: ["Live GTFS integration", "Rider sentiment overlays", "Scenario forecasting"],
  result: "Reduced corridor analysis time by 40%"
}

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(24,92,142,0.25)_0%,_rgba(5,28,44,0.92)_55%,_rgba(2,13,21,1)_100%)] px-6 pb-28 pt-32"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute -top-32 right-1/3 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-primary/10 bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 lg:flex-row lg:items-center">
        <div className="animate-on-scroll space-y-10 lg:w-[58%]">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
            <Radar className="h-4 w-4" /> Spatial product designer & GIS developer
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[3.9rem]">
              Mapping intelligence into experiences that move
              <span className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-foreground">
                <Sparkles className="h-5 w-5 text-primary" /> cities forward
              </span>
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              I help product teams, public agencies, and researchers transform geospatial data into actionable web applications.
              From mobility simulations to climate dashboards, I design resilient systems that scale insight across organisations.
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

          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              size="lg"
              className="group flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              asChild
            >
              <Link href="#projects">
                View live case studies
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center justify-center gap-2 rounded-xl border-primary/40 bg-background/60 px-8 py-4 text-base font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/5"
              asChild
            >
              <Link href="/resume.pdf" target="_blank">
                <Download className="h-5 w-5" /> Download resume
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

          <div className="animate-on-scroll flex flex-wrap items-center gap-6 text-sm text-muted-foreground/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-muted/40 bg-muted/20 px-3 py-1 font-medium uppercase tracking-[0.35em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> Trusted by
            </span>
            {trustedPartners.map((partner) => (
              <span
                key={partner}
                className="text-xs font-semibold uppercase tracking-[0.45em] text-muted-foreground/70 transition hover:text-primary"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-[42%]">
          <div className="animate-on-scroll overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/25 via-background/80 to-background/90 p-8 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Featured delivery</p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">{featuredProject.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{featuredProject.summary}</p>
              </div>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {featuredProject.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-background/60 px-4 py-3 text-sm text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {highlight}
                </div>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {featuredProject.result}
            </div>
          </div>

          <div className="animate-on-scroll overflow-hidden rounded-3xl border border-primary/20 bg-card/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground">Focus areas</p>
            <div className="mt-6 space-y-5">
              {focusSignals.map((signal, index) => (
                <div key={signal.label} className="group flex items-start gap-4 rounded-2xl border border-transparent bg-background/40 p-4 transition hover:border-primary/50 hover:bg-primary/5">
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
            <div className="grid gap-4 sm:grid-cols-3">
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
