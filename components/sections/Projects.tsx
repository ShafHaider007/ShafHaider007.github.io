"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Route, Shield, Satellite, ExternalLink, Github, Code, Database, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

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

        {/* Featured project */}
        <div className="mb-20 animate-on-scroll">
          <div className="p-8 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <Route className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-2 inline-block">
                      Featured Project
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">Shortest Route Finder</h3>
                    <p className="text-muted-foreground">Algorithm & GIS</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Route optimization system using Dijkstra's algorithm with geospatial data integration 
                  and automated vector file processing.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Python", "Dijkstra Algorithm", "Geospatial Data", "Graph Theory"].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
                  <Button variant="outline">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </Button>
                </div>
              </div>
              
              <div className="lg:pl-8">
                <div className="bg-muted/50 rounded-lg p-6 border border-border">
                  <h4 className="font-semibold text-foreground mb-4">Project Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Algorithm Efficiency</span>
                      <span className="text-primary font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="h-2 bg-primary rounded-full" style={{width: '95%'}} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Data Processing Speed</span>
                      <span className="text-primary font-semibold">90%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="h-2 bg-primary rounded-full" style={{width: '90%'}} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Accuracy Rate</span>
                      <span className="text-primary font-semibold">98%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="h-2 bg-primary rounded-full" style={{width: '98%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.slice(1).map((project, index) => (
            <div key={index} className="animate-on-scroll">
              <div className="p-6 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
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
              <Button variant="outline" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  View GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}