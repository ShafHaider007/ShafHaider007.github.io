"use client"

import { useEffect, useRef } from "react"
import {
  Activity,
  Layers3,
  MapPinned,
  Route,
  Sparkles,
  Workflow
} from "lucide-react"

const transformationPillars = [
  {
    title: "Discovery",
    description: "Immersive workshops, rapid prototypes, and data audits uncover the problem space",
    icon: Sparkles,
    status: "Weeks 1-2"
  },
  {
    title: "Systems design",
    description: "Experience maps and service blueprints align product, policy, and infrastructure",
    icon: Workflow,
    status: "Weeks 3-6"
  },
  {
    title: "Delivery",
    description: "Composable front-ends, automated QA, and observability ensure quality in production",
    icon: Activity,
    status: "Weeks 7+"
  }
]

const capabilityHighlights = [
  {
    label: "Spatial operating picture",
    detail: "Unified dashboards for mobility, climate, and land insight",
    icon: MapPinned
  },
  {
    label: "Decision playbooks",
    detail: "Scenario explorers that help stakeholders negotiate outcomes",
    icon: Route
  },
  {
    label: "Data trust layer",
    detail: "Pipelines, governance, and QA automation to keep maps credible",
    icon: Layers3
  }
]

export function SecondaryHero() {
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
        threshold: 0.2,
        rootMargin: "-40px"
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
      className="relative overflow-hidden bg-[radial-gradient(circle_at_bottom,_rgba(8,43,70,0.8)_0%,_rgba(3,17,27,0.95)_60%,_rgba(0,7,13,1)_100%)] px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(37,170,225,0.08)_0%,rgba(15,74,117,0.12)_45%,rgba(10,30,56,0.45)_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 lg:flex-row">
        <div className="animate-on-scroll space-y-8 lg:w-[58%]">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            Operating models for spatial teams
          </span>
          <h2 className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            From raw geodata to decision-grade products with a blueprint you can iterate on
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            I embed with your product squads, planners, and analysts to translate ambiguous policy and operations goals into
            measurable service outcomes. Together we shape the rituals, artefacts, and infrastructure that sustain high-impact spatial products.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {transformationPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-3xl border border-primary/30 bg-background/70 p-5 transition hover:border-primary/60 hover:bg-primary/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary/70">{pillar.status}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-on-scroll flex flex-1 flex-col gap-6 rounded-[2.5rem] border border-border/60 bg-secondary/40 p-8 backdrop-blur">
          <div className="rounded-2xl border border-border/50 bg-background/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Engagement snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="text-3xl font-semibold text-foreground">6</p>
                <p className="uppercase tracking-[0.3em]">Teams enabled</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">4</p>
                <p className="uppercase tracking-[0.3em]">Product streams</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">24</p>
                <p className="uppercase tracking-[0.3em]">Workshops</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground">∞</p>
                <p className="uppercase tracking-[0.3em]">Iterative learning</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-primary/20 bg-background/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">What we co-create</p>
            {capabilityHighlights.map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-transparent bg-primary/5 px-4 py-4 transition hover:border-primary/40">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

