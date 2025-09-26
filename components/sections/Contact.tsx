"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  Clock,
  Compass,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  NotebookPen,
  Send,
  Share2,
  Target
} from "lucide-react"
import Link from "next/link"

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "shaf.shafheidar@gmail.com",
    helper: "Best for detailed project briefs",
    href: "mailto:shaf.shafheidar@gmail.com"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/shaf-haider",
    helper: "Let’s connect and explore collaborations",
    href: "https://linkedin.com/in/shaf-haider"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Islamabad, Pakistan",
    helper: "Working with teams worldwide",
    href: "https://maps.app.goo.gl/"
  }
]

const specialties = [
  {
    icon: Compass,
    title: "Spatial strategy sprints",
    description: "Align product, geospatial data, and delivery milestones through rapid discovery and prioritization."
  },
  {
    icon: Layers3,
    title: "Platform modernization",
    description: "Audit, redesign, and ship GIS dashboards and services with resilient architecture and intuitive UX."
  },
  {
    icon: BarChart3,
    title: "Location intelligence enablement",
    description: "Transform raw datasets into decision-ready visuals, analytics layers, and stakeholder narratives."
  }
]

const collaborationNotes = [
  {
    icon: Calendar,
    title: "Availability",
    description: "Accepting new engagements starting May 2025. Discovery workshops can kick off within two weeks."
  },
  {
    icon: Clock,
    title: "Response cadence",
    description: "You’ll receive a tailored reply within 48 hours outlining next steps and a suggested agenda."
  },
  {
    icon: MessageCircle,
    title: "Partnering style",
    description: "Transparent rituals, documented decisions, and weekly showcases to keep teams aligned."
  }
]

const briefPrompts = [
  "What outcome or metric matters most for this initiative?",
  "Which spatial datasets, APIs, or systems should we consider?",
  "Who will review deliverables and what is the decision timeline?"
]

const focusAreas = [
  "Spatial product redesign",
  "Data storytelling & dashboards",
  "Platform modernization",
  "Advisory & team enablement"
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    focus: "",
    timeline: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

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
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[#010a0f] via-[#03111a] to-[#01070d] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute left-1/5 top-8 h-56 w-56 rounded-full bg-primary/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">05 · Contact</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Launch your next geospatial initiative with confidence
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Tell me about your opportunity—whether it’s a data platform, decision dashboard, or delivery partnership. I’ll map out a clear path forward with the right rituals, milestones, and tooling.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="space-y-8 animate-on-scroll">
            <div className="rounded-3xl border border-primary/20 bg-card/80 p-8 backdrop-blur">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                GIS PARTNERSHIPS
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-foreground">Where I create the most impact</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                From discovery through deployment, I translate complex location problems into products and programs that teams can ship and scale.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {specialties.map((item) => (
                  <div
                    key={item.title}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border/40 bg-background/50 p-4 transition hover:border-primary/60 hover:bg-primary/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-secondary/40 p-8 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">How collaboration works</h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    Expect structured kickoff, measurable milestones, and clear rituals to keep stakeholders aligned across spatial, data, and product streams.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-full border-primary/40 bg-background/60 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/5"
                >
                  <Link href="/dossier-template.pdf" target="_blank">
                    <Share2 className="h-4 w-4" /> View planning toolkit
                  </Link>
                </Button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {collaborationNotes.map((note) => (
                  <div key={note.title} className="rounded-2xl border border-border/40 bg-background/60 p-4">
                    <note.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{note.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{note.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-8 backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">Craft a focused brief</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Include the essentials below to accelerate our first session and surface the right collaborators.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {briefPrompts.map((prompt) => (
                  <li key={prompt} className="flex items-start gap-3">
                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border/60 bg-secondary/40 p-8 backdrop-blur">
              <h3 className="text-lg font-semibold text-foreground">Direct channels</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose the space that fits your timeline—I'll respond with next steps and resource requests.
              </p>
              <div className="mt-6 space-y-4">
                {channels.map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-background/60 p-4 transition hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <channel.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{channel.label}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{channel.value}</p>
                      <p className="text-xs text-muted-foreground">{channel.helper}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-on-scroll rounded-3xl border border-border/60 bg-card/80 p-8 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Project discovery form</h3>
                <p className="text-sm text-muted-foreground">
                  Share the signals you’re tracking. I’ll respond with a route map, resourcing plan, and proposed timeline.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Replies within 48h
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Alex Johnson"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Work email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-semibold text-foreground">
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="City Analytics Lab"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="timeline" className="text-sm font-semibold text-foreground">
                    Target launch or review date
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Q3 2025"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="focus" className="text-sm font-semibold text-foreground">
                  Focus area
                </label>
                <div className="relative">
                  <select
                    id="focus"
                    name="focus"
                    value={formData.focus}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        focus: event.target.value
                      })
                    }
                    className="w-full appearance-none rounded-2xl border border-border/60 bg-background/60 px-4 py-3 pr-10 text-left text-sm text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Select the best fit</option>
                    {focusAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <NotebookPen className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  What should I know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Share objectives, datasets, stakeholders, constraints, and success metrics."
                  required
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  I’ll review your message and send a tailored response with next steps within two business days.
                </p>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                  <Send className="mr-2 h-5 w-5" />
                  Submit inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
