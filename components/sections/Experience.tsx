"use client"

import { useEffect, useRef } from "react"
import { Building, Calendar, MapPin, Globe, Users, Award, Code, Database, Layers, ExternalLink, ChevronRight } from "lucide-react"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  const experiences = [
    {
      company: "Institute of Geographical Information Systems (IGIS) - NUST",
      position: "Research Intern",
      duration: "July 15 - August 31, 2023",
      location: "NUST (H-12 Campus), Islamabad, Pakistan",
      description: "Worked on the project 'An Autonomous IoT Based Approach Toward Monitoring and Identifying Invasive Dengue/Zika Vectors Prevalence and Possible Dengue Outbreak Areas.'",
      achievements: [
        "Focused on web GIS and computer vision applications",
        "Received weekly training sessions on GeoServer and OpenCV",
        "Completed internship with demonstrated regularity and commitment",
        "Gained hands-on experience in IoT-based monitoring systems"
      ],
      technologies: ["GeoServer", "OpenCV", "IoT", "Computer Vision", "Web GIS"],
      icon: Building
    },
    {
      company: "Jugrafiya",
      position: "Team Lead",
      duration: "June 24 - August 2, 2024",
      location: "Islamabad, Pakistan",
      website: "www.jugrafiya.com",
      description: "Led a team of three in exploring technologies for rendering large spatial datasets and developing experimental applications.",
      achievements: [
        "Explored technologies for rendering large spatial datasets (point clouds, large GeoJSONs, raster datasets)",
        "Utilized VisGL suite tools (Deck.gl, Kepler.gl, Loader.gl)",
        "Developed experimental applications using React, presented to clients",
        "Created a routing application with geofencing to alert users in high-traffic and high-crime zones"
      ],
      technologies: ["React", "Deck.gl", "Kepler.gl", "Loader.gl", "Geofencing", "Routing"],
      icon: Globe
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
    <section ref={sectionRef} id="experience" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            02. Experience
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary block">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional experience in GIS development and web technologies.
          </p>
        </div>

        {/* Experience timeline */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="animate-on-scroll">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Timeline indicator */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <exp.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="hidden lg:block w-px h-full bg-border ml-8 mt-4" />
                </div>

                {/* Experience content */}
                <div className="lg:col-span-10">
                  <div className="p-8 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{exp.position}</h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-lg text-primary font-medium mb-2">{exp.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                        {exp.website && (
                          <a 
                            href={`https://${exp.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            <span>{exp.website}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary" />
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <Code className="w-5 h-5 mr-2 text-primary" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
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


      </div>
    </section>
  )
}