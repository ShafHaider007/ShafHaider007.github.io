"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Mail, Github, Linkedin, ExternalLink } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Muhammad Shaf Haider
              </h1>
              <p className="text-xl text-muted-foreground font-medium">Developer & GIS Engineer</p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                I'm a developer passionate about crafting spatial solutions that blend thoughtful design with robust
                engineering. My work lies at the intersection of geospatial technology and web development, creating
                experiences that are both functional and beautiful.
              </p>
            </div>

            {/* Current Status */}
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Currently, I'm a <span className="text-primary font-medium">Geoinformatics Engineering Student</span> at{" "}
                <span className="text-foreground font-medium">NUST</span>, specializing in spatial analysis and web GIS
                development. I contribute to projects that bridge the gap between complex geospatial data and
                user-friendly interfaces.
              </p>

              <p className="text-muted-foreground">
                In the past, I've had the opportunity to develop software across a variety of domains — from{" "}
                <span className="text-foreground font-medium">machine learning applications</span> and{" "}
                <span className="text-foreground font-medium">web development</span> to{" "}
                <span className="text-foreground font-medium">GIS solutions</span>. Additionally, I also work on{" "}
                <span className="text-foreground font-medium">spatial data analysis</span> projects, exploring the
                intersection of geography and technology.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>shaf.shafheidar@gmail.com</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Download CV
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Experience</h3>

              {/* Current Position */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-foreground">Geoinformatics Engineering Student</h4>
                    <p className="text-primary font-medium">NUST</p>
                    <p className="text-sm text-muted-foreground">
                      Focusing on spatial analysis, web GIS development, and machine learning applications in geospatial
                      domains. Working on projects that integrate modern web technologies with geospatial data
                      processing.
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">2021 — Present</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "React", "Next.js", "ArcGIS", "QGIS"].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-8">
              <Link href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
