"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, GraduationCap, Briefcase, Github, Linkedin, Send, Download, MessageCircle, Clock, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "shaf.shafheidar@gmail.com",
      link: "mailto:shaf.shafheidar@gmail.com"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Islamabad, Pakistan"
    },
    {
      icon: GraduationCap,
      title: "University",
      value: "NUST - Expected Graduation: May 2025"
    },
    {
      icon: Briefcase,
      title: "Status",
      value: "Open to Opportunities"
    }
  ]

  const socialLinks = [
    {
      name: "GitHub",
      username: "ShafHaider007",
      url: "https://github.com/ShafHaider007",
      icon: Github
    },
    {
      name: "LinkedIn",
      username: "Shaf Haider",
      url: "https://linkedin.com/in/shaf-haider",
      icon: Linkedin
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
    <section ref={sectionRef} id="contact" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 animate-on-scroll">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            04. Contact
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary block">Contact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Open to new opportunities and collaborations.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact form */}
          <div className="animate-on-scroll">
            <div className="p-8 bg-card border border-border rounded-lg">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Send Message</h3>
                  <p className="text-muted-foreground">Let's start a conversation</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or opportunity..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact information */}
          <div className="space-y-8 animate-on-scroll">
            <div className="p-8 bg-card border border-border rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 bg-card border border-border rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Github className="w-6 h-6 mr-3 text-primary" />
                Connect With Me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <social.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {social.name}
                      </h4>
                      <p className="text-muted-foreground">{social.username}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-on-scroll">
          <div className="text-center p-8 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Send Email</h4>
            <p className="text-muted-foreground mb-4">Get in touch directly</p>
            <Button asChild>
              <Link href="mailto:shaf.shafheidar@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Email Me
              </Link>
            </Button>
          </div>
          
          <div className="text-center p-8 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">View GitHub</h4>
            <p className="text-muted-foreground mb-4">Check out my code</p>
            <Button variant="outline" asChild>
              <Link href="https://github.com/ShafHaider007" target="_blank">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
          
          <div className="text-center p-8 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Download CV</h4>
            <p className="text-muted-foreground mb-4">Get my resume</p>
            <Button variant="outline" asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Availability status */}
        <div className="text-center animate-on-scroll">
          <div className="p-8 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-foreground">Currently Available</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Available for GIS development, web applications, and machine learning projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Response Time</h4>
                <p className="text-muted-foreground text-sm">Within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Availability</h4>
                <p className="text-muted-foreground text-sm">Flexible schedule</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Focus Areas</h4>
                <p className="text-muted-foreground text-sm">GIS & Web Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}