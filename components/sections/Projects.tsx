"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Map, Orbit, Route, Satellite, Sparkles } from "lucide-react"
import Link from "next/link"

const portfolio = [
  {
    title: "Shortest Route Intelligence",
    category: "Routing toolkit",
    description: "Turns raw street data into lightweight routing helpers for field crews.",
    results: ["Automates OSM ingestion", "Exports clean GeoJSON routes"],
    tech: ["Python", "NetworkX"],
    icon: Route,
    link: "#contact"
  },
  {
    title: "Incident Reporting Atlas",
    category: "Civic reporting",
    description: "Maps citizen reports with clustering so responders can triage faster.",
    results: ["Live moderation views", "Priority queues for planners"],
    tech: ["Django", "Leaflet"],
    icon: Map,
    link: "#contact"
  }
]

const explorations = [
  {
    title: "Land cover intelligence",
    description: "Deep learning workflows that classify Sentinel-2 imagery to monitor peri-urban expansion.",
    tech: "PyTorch · Rasterio · FastAPI",
    icon: Satellite
  },
  {
    title: "Augmented reality for wayfinding",
    description: "AR prototypes guiding commuters through multi-modal journeys using location anchors.",
    tech: "Unity · AR Foundation",
    icon: Orbit
  }
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

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

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-gradient-to-br from-[#011019] via-[#041826] to-[#03111d] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-25">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute left-1/4 top-0 h-52 w-52 rounded-full bg-primary/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-16 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">03 · Projects</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Product experiences that elevate spatial insight
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            A selection of platforms and experiments that blend rigorous geospatial engineering with crafted storytelling.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <div className="space-y-6 animate-on-scroll">
            {portfolio.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur transition hover:border-primary/60 hover:bg-primary/5 sm:p-7 lg:p-8"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  <project.icon className="h-5 w-5" /> {project.category}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{project.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.results.map((result) => (
                    <div
                      key={result}
                      className="min-h-[92px] rounded-2xl border border-border/50 bg-background/50 p-4 text-sm text-muted-foreground"
                    >
                      <Sparkles className="mb-2 h-4 w-4 text-primary" />
                      <span className="text-foreground">{result}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button
                  asChild
                  variant="ghost"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-transparent px-0 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  <Link href={project.link}>
                    Discuss this build
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition group-hover:scale-125 lg:block" />
              </article>
            ))}
          </div>

          <aside className="space-y-6 animate-on-scroll">
            <div className="rounded-3xl border border-primary/20 bg-card/80 p-6 backdrop-blur sm:p-7 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground">Rapid explorations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Short-form experiments and research probes that inform where I take client platforms next.
              </p>
              <div className="mt-6 space-y-5">
                {explorations.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border/40 bg-background/50 p-5">
                    <item.icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-primary/80">{item.tech}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-secondary/50 p-6 backdrop-blur sm:p-7 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground">What collaboration looks like</h3>
              <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Discovery & research</p>
                  <p className="mt-1 text-xs">Spatial audits, user interviews, and success metrics aligned to your roadmap.</p>
                </li>
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Design & prototyping</p>
                  <p className="mt-1 text-xs">Interactive mapping interfaces, data stories, and stakeholder workshops.</p>
                </li>
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Delivery & iteration</p>
                  <p className="mt-1 text-xs">Production-ready builds, analytics instrumentation, and continuous improvement.</p>
                </li>
              </ul>

              <Button asChild size="lg" className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#contact">
                  Share your brief
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
