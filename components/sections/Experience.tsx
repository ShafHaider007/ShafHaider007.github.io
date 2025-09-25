"use client"

import { useEffect, useRef, useState } from "react"
import { Building, Calendar, MapPin, Globe, Users, Award, Code, Database, Layers, ExternalLink, ChevronRight, FileText, Zap, Cpu, Server, Brain, ChevronDown } from "lucide-react"

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const experiences = [
    {
      company: "GIS Plus Pvt Ltd",
      position: "GIS Business Developer",
      duration: "June 15, 2025 - Present",
      location: "Islamabad, Pakistan",
      description: "Working as a Web Developer specializing in GIS applications and business solutions.",
      achievements: [
        "Developing web applications using modern technologies",
        "Working with Next.js and React.js for frontend development",
        "Creating GIS business solutions and applications",
        "Collaborating with team on spatial data visualization projects"
      ],
      technologies: ["Next.js", "React.js", "JavaScript", "TypeScript", "Web Development", "GIS"],
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
    },
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

        {/* Experience cards - horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div key={index} className="animate-on-scroll">
              <div 
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                {/* Compact header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <exp.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground leading-tight">{exp.position}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
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
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{exp.location}</span>
                  </div>
                  {exp.website && (
                    <a 
                      href={`https://${exp.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="truncate">{exp.website}</span>
                    </a>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                      +{exp.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Expandable details */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCard === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-border pt-4 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm">
                        <Award className="w-4 h-4 mr-2 text-primary" />
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-2 p-2 bg-muted/50 rounded text-xs">
                            <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm">
                        <Code className="w-4 h-4 mr-2 text-primary" />
                        All Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
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

        {/* Technologies Section */}
        <div className="mt-20 animate-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Technologies I Work With
            </h3>
            <p className="text-lg text-muted-foreground">
              A comprehensive toolkit for GIS development and web applications
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {["Python", "JavaScript", "React", "Next.js", "TypeScript", "ArcGIS", "QGIS", "PostgreSQL", "MongoDB", "TensorFlow"].map((tech) => (
              <span key={tech} className="px-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}