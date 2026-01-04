'use client'

import { MagneticButton } from '@/components/MagneticButton'
import { ArrowUpRight, Mail } from 'lucide-react'
import Link from 'next/link'

export function Contact() {
  return (
    <section id="contact" className="py-32 lg:py-40 bg-secondary/20 relative overflow-hidden">
      <div className="mx-auto w-full max-w-5xl px-6 lg:px-12 text-center">

        <h2 className="text-4xl md:text-6xl font-serif-display font-bold text-primary mb-12">
          Ready to build?
        </h2>

        {/* Large Magnetic Email Link */}
        <div className="flex justify-center mb-16">
          <MagneticButton>
            <Link
              href="mailto:shaf.shafheidar@gmail.com"
              className="group relative inline-flex items-center justify-center w-64 h-64 rounded-full bg-primary text-primary-foreground text-xl font-medium tracking-wide transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2 z-10">
                <span>Say Hello</span>
                <Mail className="w-6 h-6" />
              </div>
              <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
            </Link>
          </MagneticButton>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-lg font-medium text-muted-foreground">
          <Link href="https://linkedin.com/in/shaf-haider" className="hover:text-primary transition-colors flex items-center gap-2">
            LinkedIn <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link href="https://github.com" className="hover:text-primary transition-colors flex items-center gap-2">
            GitHub <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 opacity-60">
            Islamabad, Pakistan
          </div>
        </div>

      </div>
    </section>
  )
}

