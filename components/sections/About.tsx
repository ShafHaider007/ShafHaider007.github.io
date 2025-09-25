"use client"

import { useEffect, useRef } from "react"
import { GraduationCap, Award, Users, Target, TrendingUp, Calendar, Star, Code, Database, Globe, Zap, Brain, MapPin } from "lucide-react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  const skills = [
    { name: "GIS Development", level: 90, icon: Globe },
    { name: "Web Development", level: 85, icon: Code },
    { name: "Machine Learning", level: 80, icon: Brain },
    { name: "Database Management", level: 75, icon: Database }
  ]

  const achievements = [
    {
      icon: Award,
      title: "Vice President Operations",
      description: "GIS Day 2024 at NUST - Led event coordination and management"
    },
    {
      icon: Target,
      title: "Research Focus",
      description: "AR Applications for Urban Mobility Mapping"
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Team Lead at Jugrafiya - Managed 3-member development team"
    },
    {
      icon: Star,
      title: "Academic Excellence",
      description: "Graduated with distinction - Consistent high performance"
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
    <section ref={sectionRef} id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            01. About Me
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About
            <span className="text-primary block">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Geoinformatics Engineering graduate creating GIS solutions and web applications.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left column - About text */}
          <div className="space-y-6 animate-on-scroll">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Graduated with Geoinformatics Engineering from <span className="text-primary font-medium">NUST</span>, 
                specializing in spatial analysis, web GIS development, and machine learning applications.
              </p>
              
              <p>
                Experience includes developing <span className="text-foreground font-medium">GIS solutions</span>, 
                <span className="text-foreground font-medium"> web applications</span>, and 
                <span className="text-foreground font-medium"> AR applications for urban mobility</span>.
              </p>
            </div>

            {/* Education */}
            <div className="p-6 bg-card border border-border rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Education</h3>
                  <p className="text-sm text-muted-foreground">Bachelor of Science</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Geoinformatics Engineering</h4>
                <p className="text-primary font-medium">National University of Science and Technology (NUST)</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Islamabad, Pakistan</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Graduated May 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills */}
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-bold text-foreground mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <skill.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">Technologies I work with</h4>
              <div className="flex flex-wrap gap-2">
                {["Python", "JavaScript", "React", "Next.js", "TypeScript", "ArcGIS", "QGIS", "PostgreSQL", "MongoDB", "TensorFlow"].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key highlights */}
        <div className="animate-on-scroll">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">BSc</div>
              <div className="text-sm text-muted-foreground">Degree</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">2</div>
              <div className="text-sm text-muted-foreground">Internships</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">3+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">2025</div>
              <div className="text-sm text-muted-foreground">Graduated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}