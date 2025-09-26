"use client"

import { useEffect, useRef } from "react"
import {
  BadgeCheck,
  Brain,
  Building2,
  Compass,
  FlaskConical,
  GraduationCap,
  MapPin,
  Sparkles,
  Workflow
} from "lucide-react"

const strengths = [
  {
    icon: Compass,
    title: "Human-centred strategy",
    description: "Pairing stakeholder workshops with service blueprints to align spatial systems with daily decision-making."
  },
  {
    icon: Brain,
    title: "Analytical rigor",
    description: "Modeling complex datasets with reproducible notebooks, versioned schemas, and automated QA checks."
  },
  {
    icon: Workflow,
    title: "End-to-end delivery",
    description: "Prototyping, shipping, and maintaining production-ready GIS platforms across cross-functional teams."
  }
]

const credentials = [
  { label: "Degree", value: "BSc Geoinformatics Engineering", icon: GraduationCap },
  { label: "Leadership", value: "Vice President Operations – GIS Day 2024", icon: Building2 },
  { label: "Research", value: "AR experiences for urban mobility", icon: FlaskConical }
]

const toolbelt = [
  "ArcGIS Pro",
  "QGIS",
  "PostGIS",
  "deck.gl",
  "Mapbox GL",
  "Next.js",
  "TypeScript",
  "Python",
  "GeoServer",
  "Cloud Functions"
]

export function About() {
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
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-[#061929]/70 via-[#04131f]/80 to-[#020a12]/90 px-6 py-28"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute -top-16 left-1/3 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">01 · About</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Building spatial products that marry clarity with context
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            I combine geospatial engineering, UX strategy, and full-stack development to craft digital experiences that make maps
            feel intuitive, actionable, and trustworthy for the people who depend on them.
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 animate-on-scroll">
            <div className="rounded-3xl border border-primary/25 bg-card/80 p-6 backdrop-blur sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-primary">
                  <MapPin className="h-4 w-4" /> Islamabad, Pakistan
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-muted/40 bg-muted/30 px-4 py-1">
                  <Sparkles className="h-4 w-4 text-accent" /> Curious about climate resilience & mobility futures
                </span>
              </div>

              <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                During my time at <span className="text-foreground font-semibold">NUST</span>, I immersed myself in spatial data science—from remote sensing labs to
                hackathons on smart city design. Today I translate that foundation into web platforms that help leaders see their
                territory clearly and act confidently.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {credentials.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border/60 bg-background/60 p-4 text-left shadow-inner shadow-black/10"
                  >
                    <item.icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="animate-on-scroll rounded-3xl border border-border/50 bg-background/50 p-5 backdrop-blur transition hover:border-primary/50 hover:bg-primary/5 sm:p-6"
                >
                  <strength.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{strength.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{strength.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 animate-on-scroll">
            <div className="rounded-3xl border border-border/60 bg-secondary/50 p-6 backdrop-blur sm:p-7 lg:p-8">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ways I work</h3>
                  <p className="text-sm text-muted-foreground">Design sprints, spatial data pipelines, and iterative delivery.</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Discovery to deployment</p>
                  <p className="mt-1 text-xs">From stakeholder interviews to CI/CD for modern web GIS stacks.</p>
                </li>
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Systems thinking</p>
                  <p className="mt-1 text-xs">Connecting field data, satellite imagery, and dashboards into clear narratives.</p>
                </li>
                <li className="rounded-2xl border border-border/40 bg-background/60 p-4">
                  <p className="font-semibold text-foreground">Inclusive collaboration</p>
                  <p className="mt-1 text-xs">Working with multidisciplinary teams to balance precision with clarity.</p>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-card/80 p-6 backdrop-blur sm:p-7 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground">Toolbelt</h3>
              <p className="mt-2 text-sm text-muted-foreground">The platforms and libraries I lean on to deliver reliable spatial products.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {toolbelt.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
