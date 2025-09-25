"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Route, Shield, Satellite, Code, Database, Globe, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const projects = [
    {
      title: "Shortest Route Finder using Dijkstra's Algorithm",
      description: "Developed a shortest route finder using Dijkstra's Algorithm, integrating geospatial data. Automated vector file downloads, graph creation, and route calculation based on user provided latitudes and longitudes.",
      technologies: ["Python", "Dijkstra Algorithm", "Geospatial Data", "Graph Theory"],
      category: "Algorithm & GIS",
      icon: Route,
      year: "2024",
      featured: true
    },
    {
      title: "Incident Reporting System with GIS",
      description: "Designed a platform for residents to report incidents and visualize clusters on a map, supporting data-driven community safety initiatives. Built with Django framework.",
      technologies: ["Django", "PostgreSQL", "Leaflet", "Geospatial Analysis"],
      category: "Web GIS Application",
      icon: Shield,
      year: "2024"
    },
    {
      title: "Land Use and Land Cover Classification Using Deep Learning",
      description: "Implemented a CNN-based solution to classify Sentinel-2 imagery into land cover classes, achieving high accuracy with multispectral data.",
      technologies: ["Python", "PyTorch", "CNN", "Sentinel-2", "Remote Sensing"],
      category: "Machine Learning & Remote Sensing",
      icon: Satellite,
      year: "2024"
    }
  ]

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
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            03. Projects
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary block">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Key projects showcasing GIS and web development skills.
          </p>
        </div>

        {/* Projects cards - horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project, index) => (
            <div key={index} className="animate-on-scroll">
              <div 
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                {/* Compact header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <project.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground leading-tight">{project.title}</h3>
                    <p className="text-sm text-primary font-medium">{project.category}</p>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`} 
                  />
                </div>

                {/* Basic info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{project.year}</span>
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Expandable details */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCard === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-border pt-4 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-primary" />
                        All Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Call to action */}
        <div className="text-center animate-on-scroll">
          <div className="p-8 bg-card border border-border rounded-lg">
            <h3 className="text-2xl font-bold text-foreground mb-4">Interested in My Work?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These projects showcase my expertise in GIS, web development, and machine learning. 
              Let's discuss how we can work together on your next project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="#contact">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Let's Collaborate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}