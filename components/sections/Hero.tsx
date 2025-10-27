'use client'

import { useEffect, useState } from 'react'
import { Ambulance, Home, Leaf, Mail, MapPin, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const industries = [
  {
    icon: Ambulance,
    name: 'Healthcare Transportation (NEMT)',
    emoji: '🚑',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Home,
    name: 'Real Estate',
    emoji: '🏡',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Leaf,
    name: 'Environment & EcoTech',
    emoji: '🌳',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="mx-auto w-full max-w-5xl px-6">
        {/* Main Heading */}
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <TrendingUp className="h-4 w-4" />
            <span>GIS Developer & Solutions Architect</span>
          </div>

          <h1
            className={`mb-6 text-4xl font-bold leading-tight text-foreground transition-all duration-1000 md:text-5xl lg:text-6xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Helping Companies{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Elevate Their Business
            </span>{' '}
            and Increase{' '}
            <span className="relative inline-block">
              <span className="relative z-10 font-extrabold text-primary">ROI by 30%</span>
              <span className="absolute inset-x-0 bottom-2 h-3 bg-primary/20" />
            </span>
          </h1>

          <p
            className={`mx-auto max-w-2xl text-lg text-muted-foreground transition-all delay-300 duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Transforming spatial data into powerful business solutions that drive growth and efficiency
          </p>

          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-4 text-sm transition-all delay-500 duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <MapPin className="h-4 w-4 text-primary" /> Islamabad, Pakistan
            </span>
            <Link
              href="mailto:shaf.shafheidar@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4 py-2 text-primary transition hover:bg-primary/20"
            >
              <Mail className="h-4 w-4" /> shaf.shafheidar@gmail.com
            </Link>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="mt-16 rounded-2xl border bg-card p-8 shadow-lg">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              I'm a GIS Web Developer & Solutions-Oriented Professional
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I value clear communication and am deeply committed to the long-term success of our collaboration.
            </p>
            <div className="relative mx-auto mt-6 max-w-2xl rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 p-6">
              <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                ✓
              </div>
              <p className="text-base font-medium text-foreground">
                My extensive experience in <span className="font-bold text-primary">GIS | GIS Mapping</span> and{' '}
                <span className="font-bold text-primary">Web Development</span> allows you to get your solution{' '}
                <span className="font-bold text-accent">quicker</span> and with{' '}
                <span className="font-bold text-accent">higher quality</span> than 90% of other developers.
              </p>
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Industries I've Transformed with GIS Solutions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {industries.map((industry, index) => (
              <div
                key={industry.name}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-xl"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="absolute right-4 top-4 text-4xl opacity-20 transition-all duration-300 group-hover:scale-125 group-hover:opacity-30">
                  {industry.emoji}
                </div>

                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${industry.bgColor}`}>
                  <industry.icon className={`h-7 w-7 ${industry.color}`} />
                </div>

                <h3 className="mt-4 text-lg font-semibold">{industry.name}</h3>

                <div className="mt-2 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            <div className="group cursor-default">
              <div className="text-5xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                30%
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">Average ROI Increase</div>
            </div>

            <div className="hidden h-16 w-px bg-border md:block" />

            <div className="group cursor-default">
              <div className="text-5xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                3+
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">Industries Served</div>
            </div>

            <div className="hidden h-16 w-px bg-border md:block" />

            <div className="group cursor-default">
              <div className="text-5xl font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                100%
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
