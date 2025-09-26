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
  Radar
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#071f32] to-[#03111b] px-6 pb-28 pt-32"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute -top-32 right-1/3 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 lg:flex-row lg:items-center">
        <div className="space-y-10 lg:w-[58%] animate-on-scroll">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
            <Radar className="h-4 w-4" /> Spatial product designer & GIS developer
          </div>

          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[3.9rem]">
              Mapping intelligence into experiences that move cities forward
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              I help product teams, public agencies, and researchers transform geospatial data into actionable web applications.
              From mobility simulations to climate dashboards, I design resilient systems that scale insight across organisations.
            </p>
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
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-[42%]">
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
