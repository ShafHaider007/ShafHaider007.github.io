"use client"

import { useEffect, useRef } from "react"
import {
  Globe2,
  Compass,
  Smartphone,
  Workflow,
  LineChart,
  Puzzle,
  Database,
  Satellite
} from "lucide-react"

const expertiseAreas = [
  {
    title: "Web GIS Development",
    description:
      "GIS web development combines GIS with web technologies to create interactive maps and data visualizations.",
    icon: Globe2
  },
  {
    title: "GIS Consultancy",
    description:
      "We provide expert guidance and support for clients in leveraging GIS technology for their business needs.",
    icon: Compass
  },
  {
    title: "Mobile GIS App Development",
    description:
      "We create such apps that allow users to access and analyze geographic data on mobile devices",
    icon: Smartphone
  },
  {
    title: "Automation",
    description:
      "We provides cutting-edge automation solutions that improve efficiency and productivity in a variety of industries.",
    icon: Workflow
  },
  {
    title: "GIS Analysis",
    description:
      "We offers comprehensive GIS analysis services to help clients gain insights and make informed decisions about spatial data",
    icon: LineChart
  },
  {
    title: "Integrations",
    description:
      "We provide expert integration services to help clients seamlessly integrate GIS technology with their existing systems and workflows.",
    icon: Puzzle
  },
  {
    title: "Database Design",
    description:
      "We offer professional database design services to help clients create efficient and scalable data management solutions",
    icon: Database
  },
  {
    title: "Remote Sensing",
    description:
      "We provide advanced remote sensing solutions for clients to gather and analyze data about the Earth's surface from afar.",
    icon: Satellite
  }
]

export function Expertise() {
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
      id="expertise"
      className="relative overflow-hidden bg-gradient-to-br from-[#01070d] via-[#03101a] to-[#010a14] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute left-1/4 top-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/5 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">02 · Expertise</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We strive to provide our customers with unparalleled service and exceed their expectations with our exceptional solutions
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="animate-on-scroll group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 backdrop-blur transition hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
