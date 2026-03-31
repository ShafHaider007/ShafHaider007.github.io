'use client'

import { motion } from 'motion/react'
import { Mail, ArrowUpRight, Linkedin, Github, MapPin } from 'lucide-react'
import Link from 'next/link'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/shaf-haider',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
]

export function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="container-wide">
        <div className="relative rounded-3xl bg-foreground text-background overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />

          <div className="relative z-10 p-10 md:p-16 lg:p-20">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-primary uppercase tracking-widest mb-6 block"
              >
                Get in Touch
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                Have a geospatial project in mind?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-background/60 max-w-xl mb-10 leading-relaxed"
              >
                Whether you need a web mapping platform, spatial data pipeline, or 
                enterprise GIS solution — I&apos;d love to discuss how I can help.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-16"
              >
                <Link
                  href="mailto:shaf.shafheidar@gmail.com"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <Mail className="w-4 h-4" />
                  shaf.shafheidar@gmail.com
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 pt-8 border-t border-background/10"
              >
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ))}
                <div className="flex items-center gap-2 text-sm text-background/40">
                  <MapPin className="w-4 h-4" />
                  Islamabad, Pakistan
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shaf Haider. All rights reserved.</p>
          <p className="text-xs">
            GIS Engineer &middot; Web GIS Developer &middot; Geospatial Expert
          </p>
        </footer>
      </div>
    </section>
  )
}
