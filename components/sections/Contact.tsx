"use client";

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Mail, MapPin, GraduationCap, Briefcase, Github, Linkedin, Send, Download, Phone, Globe } from 'lucide-react'
import SplitText from '@/components/SplitText'
import PixelTransition from '@/components/PixelTransition'
import GradualBlur from '@/components/GradualBlur'

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "shaf.shafheidar@gmail.com",
      link: "mailto:shaf.shafheidar@gmail.com",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Islamabad, Pakistan",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      icon: GraduationCap,
      title: "University",
      value: "NUST - Expected Graduation: May 2025",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Briefcase,
      title: "Status",
      value: "Open to Opportunities",
      color: "from-orange-600 to-orange-700"
    }
  ]

  const socialLinks = [
    {
      name: "GitHub",
      username: "ShafHaider007",
      url: "https://github.com/ShafHaider007",
      icon: Github,
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "LinkedIn",
      username: "Shaf Haider",
      url: "https://linkedin.com/in/shaf-haider",
      icon: Linkedin,
      color: "from-blue-600 to-blue-800"
    }
  ]

  return (
    <section id="contact" className="relative py-20 px-4 bg-slate-800 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <SplitText
            text="Get In Touch"
            className="text-5xl font-bold text-white mb-6"
            splitType="chars"
            delay={0.2}
            duration={0.6}
            ease="power3.out"
            from={{ opacity: 0, y: 40, rotationY: 90 }}
            to={{ opacity: 1, y: 0, rotationY: 0 }}
            trigger="#contact"
          />
          <SplitText
            text="I'm always interested in new opportunities and collaborations. Let's connect!"
            className="text-2xl text-slate-300 max-w-4xl mx-auto"
            splitType="words"
            delay={0.8}
            duration={0.5}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            trigger="#contact"
          />
        </div>

        {/* Interactive Contact Showcase */}
        <div className="mb-16">
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <PixelTransition
              firstContent={
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Mail className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Let's Connect</h3>
                    <p className="text-2xl opacity-90">Ready to collaborate?</p>
                  </div>
                </div>
              }
              secondContent={
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-cyan-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Globe className="w-24 h-24 mx-auto mb-8" />
                    <h3 className="text-4xl font-bold mb-6">Open to Opportunities</h3>
                    <p className="text-2xl opacity-90">GIS & Web Development</p>
                  </div>
                </div>
              }
              gridSize={12}
              pixelColor='#ffffff'
              animationStepDuration={0.8}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <Card className="p-10 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xl">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-blue-400 hover:underline text-lg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-lg">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Social Links */}
          <Card className="p-10 bg-slate-700/50 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-3xl font-bold text-white mb-8">Connect With Me</h3>
            <div className="space-y-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-6 p-6 rounded-2xl hover:bg-slate-600/50 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <social.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xl group-hover:text-blue-400 transition-colors">
                      {social.name}
                    </h4>
                    <p className="text-slate-300 text-lg">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center hover:shadow-2xl transition-all duration-300">
          <h3 className="text-4xl font-bold mb-6">Ready to Collaborate?</h3>
          <p className="text-2xl mb-8 opacity-90">
            I'm passionate about GIS, web development, and machine learning. Let's work together on something amazing!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              asChild
            >
              <a href="mailto:shaf.shafheidar@gmail.com" className="flex items-center">
                <Send className="w-6 h-6 mr-3" />
                Send Email
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              asChild
            >
              <a href="https://github.com/ShafHaider007" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="w-6 h-6 mr-3" />
                View GitHub
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              asChild
            >
              <a href="#" className="flex items-center">
                <Download className="w-6 h-6 mr-3" />
                Download CV
              </a>
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-lg">
            © 2024 Muhammad Shaf Haider. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Gradual Blur Effect */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="10rem"
        strength={3}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={0.8}
      />
    </section>
  )
}
