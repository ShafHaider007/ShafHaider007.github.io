"use client"

import { useEffect, useRef } from "react"
import {
  Award,
  Calendar,
  ExternalLink,
  LineChart,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow
} from "lucide-react"

const experiences = [
  {
    company: "GIS Plus Pvt Ltd",
    role: "GIS Business Developer",
    duration: "Jun 2025 – Present",
    location: "Islamabad, Pakistan",
    website: "https://www.gisplus.com",
    summary:
      "Designing and launching spatial web applications for public-sector and enterprise partners, leading delivery from product framing to deployment.",
    highlights: [
      "Architected modular Next.js mapping templates to accelerate proof-of-concept delivery by 40%",
      "Directed stakeholder discovery for provincial land-use dashboards and mobility wayfinding tools",
      "Standardised QA workflows for geospatial datasets, improving data reliability across teams"
    ],
    stack: ["Next.js", "React", "deck.gl", "PostGIS", "ArcGIS Enterprise"]
  },
  {
    company: "Jugrafiya",
    role: "Team Lead",
    duration: "Jun – Aug 2024",
    location: "Islamabad, Pakistan",
    website: "https://www.jugrafiya.com",
    summary:
      "Led a skunkworks team exploring large-scale spatial rendering, delivering prototypes that shaped client strategy and future investment decisions.",
    highlights: [
      "Evaluated deck.gl, kepler.gl, and loaders.gl for massive point clouds and geofencing at scale",
      "Built routing experiments combining traffic, safety, and accessibility datasets for smart city pilots",
      "Presented roadmap recommendations to C-level stakeholders with live, data-driven demos"
    ],
    stack: ["React", "deck.gl", "Kepler.gl", "GeoJSON", "Geofencing"]
  },
  {
    company: "IGIS – NUST",
    role: "Research Intern",
    duration: "Jul – Aug 2023",
    location: "Islamabad, Pakistan",
    website: "https://igis.nust.edu.pk",
    summary:
      "Supported an IoT-powered disease surveillance initiative by bridging field sensors, GeoServer, and analytical dashboards.",
    highlights: [
      "Developed web GIS interfaces to monitor dengue vector distribution in near real-time",
      "Automated preprocessing of OpenCV outputs for epidemiological visualisation layers",
      "Collaborated with researchers to transform complex metrics into actionable public health insights"
    ],
    stack: ["GeoServer", "Python", "OpenCV", "Leaflet", "PostgreSQL"]
  }
]

const strengths = [
  {
    title: "Delivery Leadership",
    description: "Facilitating product rituals, aligning multi-disciplinary squads, and keeping outcomes measurable.",
    icon: Workflow
  },
  {
    title: "Data Stewardship",
    description: "Implementing governance for spatial data pipelines spanning sensors, imagery, and analytics.",
    icon: Server
  },
  {
    title: "Impact Mapping",
    description: "Tracking KPIs and social outcomes to prove value for mobility, climate, and civic programs.",
    icon: LineChart
  }
]

export function Experience() {
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
      id="experience"
      className="relative overflow-hidden bg-gradient-to-br from-[#020b13] via-[#041726] to-[#031521] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-25">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute left-16 top-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/5 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">03 · Experience</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Connecting spatial insight with measurable outcomes
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            From research labs to production launches, I translate complex geodata into tools that empower teams to decide faster
            and act smarter.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
          <div className="relative space-y-10">
            <span className="absolute left-[17px] top-6 bottom-6 hidden w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent lg:block" />

            {experiences.map((experience, index) => (
              <article
                key={experience.company}
                className="animate-on-scroll relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur transition hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                      {String(index + 1).padStart(2, "0")} · {experience.role}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground">{experience.company}</h3>
                  </div>
                  <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground lg:items-end">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" /> {experience.duration}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> {experience.location}
                    </span>
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary transition hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" /> Visit site
                    </a>
                  </div>
                </div>

                <p className="mt-6 text-base text-muted-foreground">{experience.summary}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {experience.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-border/50 bg-background/50 p-4 text-sm text-muted-foreground"
                    >
                      <Sparkles className="mb-2 h-4 w-4 text-primary" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="absolute -left-3 top-8 hidden h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-lg font-semibold text-primary lg:flex">
                  {index + 1}
                </span>
              </article>
            ))}
          </div>

          <aside className="space-y-8 animate-on-scroll">
            <div className="rounded-3xl border border-border/60 bg-secondary/50 p-7 backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">Where I add the most value</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Partnering with teams at the intersection of design, engineering, and policy to bring clarity to complex spatial
                initiatives.
              </p>
              <div className="mt-6 space-y-4">
                {strengths.map((strength) => (
                  <div key={strength.title} className="rounded-3xl border border-border/40 bg-background/50 p-5">
                    <strength.icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 text-base font-semibold text-foreground">{strength.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{strength.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-card/80 p-7 backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">Recognition</h3>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4">
                  <Award className="mt-1 h-5 w-5 text-primary" />
                  <p>
                    Selected to co-lead <span className="text-foreground font-medium">GIS Day 2024</span>, orchestrating workshops, speaker programming, and sponsor
                    partnerships for 400+ attendees.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4">
                  <ShieldCheck className="mt-1 h-5 w-5 text-primary" />
                  <p>
                    Earned recognition for building <span className="text-foreground font-medium">risk-aware routing</span> pilots that improved commute safety metrics
                    for urban planners.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.35em] text-muted-foreground">Always learning, always mapping.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
