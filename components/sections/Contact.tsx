"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Share2
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

const availability = [
  {
    icon: Calendar,
    title: "Project timeline",
    description: "Booking new engagements for Q2 2025. Short discovery sprints available sooner."
  },
  {
    icon: Clock,
    title: "Response time",
    description: "48-hour turnaround on new inquiries with tailored next steps."
  },
  {
    icon: MessageCircle,
    title: "Working style",
    description: "Collaborative and transparent—weekly rituals, documented decisions, and measurable milestones."
  }
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      className="relative overflow-hidden bg-gradient-to-br from-[#010a0f] via-[#04131d] to-[#02070c] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="geo-grid" />
      </div>
      <div className="pointer-events-none absolute left-1/5 top-8 h-56 w-56 rounded-full bg-primary/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-6 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="animate-on-scroll text-center">
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-primary/90">04 · Contact</p>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Let’s co-create the next spatial product
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Share your opportunity—whether it’s a product overhaul, a data platform, or a research partnership—and I’ll respond
            with a tailored collaboration plan.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="space-y-8 animate-on-scroll">
            <div className="rounded-3xl border border-primary/20 bg-card/80 p-6 backdrop-blur sm:p-7 lg:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                OPEN FOR PARTNERSHIPS
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-foreground">What you can expect</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                A guided process from discovery to deployment. I translate complex requirements into product roadmaps, wireframes,
                and production-ready GIS solutions.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {availability.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border/40 bg-background/50 p-4">
                    <item.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-base font-semibold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-secondary/50 p-6 backdrop-blur sm:p-7 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground">Preferred channels</h3>
              <p className="mt-2 text-sm text-muted-foreground">Reach out directly or schedule time to walk through your brief.</p>
              <div className="mt-6 space-y-4">
                {channels.map((channel) => (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-4 rounded-2xl border border-border/40 bg-background/60 p-4 transition hover:border-primary/50 hover:bg-primary/5 sm:flex-row sm:items-start"
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

          <div className="animate-on-scroll rounded-3xl border border-border/60 bg-card/80 p-6 backdrop-blur sm:p-7 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Project inquiry</h3>
                <p className="text-sm text-muted-foreground">
                  Share context, constraints, and ambition. I’ll follow up with a strategy session invite.
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

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                  Project or role
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="GIS dashboard for smart cities"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">
                  How can I help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-foreground transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Share context, timelines, and success metrics."
                  required
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  I’ll review your message and reply with next steps within two business days.
                </p>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
                  <Send className="mr-2 h-5 w-5" />
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
