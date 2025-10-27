'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Ambulance,
  Building2,
  Code,
  Database,
  Globe,
  Layers,
  Map,
  Monitor,
  Route,
  Shield,
  Zap,
} from 'lucide-react'
import StackIcon from 'tech-stack-icons'

const industries = [
  {
    title: 'Transportation & Healthcare (NEMT)',
    icon: Ambulance,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    highlights: [
      {
        icon: Map,
        title: 'Interactive GIS Mapping',
        description: 'Mapbox, Google Maps, ArcGIS integration with real-time vehicle tracking',
      },
      {
        icon: Route,
        title: 'Route Optimization (DARP)',
        description: 'Automated trip routing, scheduling, and ETA calculation',
      },
      {
        icon: Zap,
        title: 'Cost Optimization',
        description: 'Minimized API costs for geocoding and routing services',
      },
      {
        icon: Shield,
        title: 'HIPAA Compliance',
        description: 'Secure handling of health information, EDI billing (837, 835)',
      },
    ],
    tech: ['JavaScript', 'Vue.js', 'PHP', 'Laravel', 'ArcGIS', 'RESTful API'],
  },
  {
    title: 'Real Estate',
    icon: Building2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    highlights: [
      {
        icon: Database,
        title: 'Geodata Management',
        description: 'Scraping, processing, and analysis of large-scale geospatial data',
      },
      {
        icon: Layers,
        title: 'Advanced Mapping',
        description: 'Cadastral data, zones, polygons with multi-layer visualization',
      },
      {
        icon: Globe,
        title: 'Geospatial Analysis',
        description: 'Automatic frontage calculation, property search, PDF reports',
      },
      {
        icon: Code,
        title: 'Full-Stack Integration',
        description: 'Payment systems (Stripe), user management, affiliate programs',
      },
    ],
    tech: ['Python', 'JavaScript', 'Mapbox', 'PostGIS', 'Stripe API'],
  },
]

const coreSkills: Array<{
  iconName?: string
  customImage?: string
  largerIcon?: boolean
  icon?: typeof Route
  label: string
  category: string
}> = [
    { customImage: '/Mapbox.png', label: 'Mapbox', category: 'Mapping' },
    { customImage: '/google-maps.png', label: 'Google Maps', category: 'Mapping' },
    { customImage: '/arcgis-pro.webp', largerIcon: true, label: 'ArcGIS', category: 'GIS' },
    { iconName: 'postgresql', label: 'PostGIS', category: 'Database' },
    { iconName: 'js', label: 'JavaScript', category: 'Frontend' },
    { iconName: 'python', label: 'Python', category: 'Backend' },
    { iconName: 'vuejs', label: 'Vue.js', category: 'Frontend' },
    { customImage: '/react.svg', label: 'React.js', category: 'Frontend' },
    { iconName: 'nodejs', label: 'Node.js', category: 'Backend' },
    { iconName: 'php', label: 'PHP/Laravel', category: 'Backend' },
    { icon: Route, label: 'Route Optimization', category: 'Algorithm' },
    { customImage: '/qgis-icon.webp', largerIcon: true, label: 'QGIS', category: 'GIS' },
  ]

const additionalExpertise = [
  'Fast clustering algorithms for millions of markers',
  'Custom polygon library handling 10M+ polygons',
  'GIS framework for geospatial data processing',
  'ArcGIS tools (ArcMap, ArcCatalog) implementation',
  'Geo-data format conversion libraries',
  'Remote sensing & AutoCAD integration',
  'Mobile & web map development',
  'Map illustration & cartography',
]

export function Expertise() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(index))
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="expertise" className="border-t py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Industry Expertise</h2>
          <p className="mt-4 text-muted-foreground">
            Specialized GIS solutions across healthcare, transportation, and real estate sectors
          </p>
        </div>

        {/* Industry Experience */}
        <div className="mt-12 space-y-12">
          {industries.map((industry, industryIndex) => (
            <div
              key={industry.title}
              ref={(el) => {
                sectionRefs.current[industryIndex] = el
              }}
              className={`rounded-3xl border-2 ${industry.borderColor} bg-card p-8 shadow-lg transition-all duration-1000 ${visibleSections.has(industryIndex)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
                }`}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${industry.bgColor}`}>
                  <industry.icon className={`h-8 w-8 ${industry.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{industry.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {industry.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {industry.highlights.map((highlight, index) => (
                  <div
                    key={highlight.title}
                    className="group rounded-2xl border bg-background/50 p-5 transition-all duration-300 hover:border-primary hover:shadow-md"
                    style={{
                      transitionDelay: visibleSections.has(industryIndex) ? `${index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${industry.color}`}>
                        <highlight.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{highlight.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Skills */}
        <div
          ref={(el) => {
            sectionRefs.current[industries.length] = el
          }}
          className={`mt-16 transition-all duration-1000 ${visibleSections.has(industries.length) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
        >
          <h3 className="mb-6 text-center text-2xl font-semibold">Core Technology Stack</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {coreSkills.map((skill, index) => (
              <div
                key={skill.label}
                className="group rounded-xl border bg-card p-4 text-center transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg"
                style={{
                  transitionDelay: visibleSections.has(industries.length) ? `${index * 50}ms` : '0ms',
                }}
              >
                {skill.customImage ? (
                  <div
                    className={`mx-auto transition-transform duration-300 group-hover:scale-110 ${skill.largerIcon ? 'h-12 w-12' : 'h-8 w-8'
                      }`}
                  >
                    <Image
                      src={skill.customImage}
                      alt={skill.label}
                      width={skill.largerIcon ? 48 : 32}
                      height={skill.largerIcon ? 48 : 32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : skill.iconName ? (
                  <div className="mx-auto h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                    <StackIcon name={skill.iconName} />
                  </div>
                ) : skill.icon ? (
                  <skill.icon className="mx-auto h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                ) : null}
                <p className="mt-2 text-sm font-semibold">{skill.label}</p>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Expertise */}
        <div
          ref={(el) => {
            sectionRefs.current[industries.length + 1] = el
          }}
          className={`mt-16 rounded-2xl border bg-secondary/30 p-8 transition-all duration-1000 ${visibleSections.has(industries.length + 1)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
            }`}
        >
          <h3 className="mb-6 text-center text-xl font-semibold">Additional Capabilities</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {additionalExpertise.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-all duration-300 hover:border-primary"
                style={{
                  transitionDelay: visibleSections.has(industries.length + 1) ? `${index * 50}ms` : '0ms',
                }}
              >
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
