'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Mail, ArrowUpRight, MapPin } from 'lucide-react'
import BlurText from '@/components/bits/BlurText'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'
import { Button } from '@/components/ui/Button'

export function ContactPageStory() {
  return (
    <main className="relative min-h-screen">
      <section className="min-h-screen flex items-center justify-center section-padding">
        <div className="container-wide w-full">
          <div className="relative rounded-3xl bg-foreground text-background overflow-hidden min-h-[75vh] flex items-center">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

            <div className="relative z-10 p-10 md:p-16 lg:p-20 w-full max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-semibold text-primary uppercase tracking-widest mb-6 block"
              >
                Contact
              </motion.span>

              <BlurText
                text="Let's plan your next Earth Observation project"
                animateBy="words"
                delay={100}
                className="text-balance font-display text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight mb-8 text-background"
              />

              <div className="mb-12">
                <ScrollHighlightText className="text-lg md:text-xl text-background/70 leading-relaxed">
                  I respond within one business day. Share your data sources, timelines, and the science or pipeline outcomes you are aiming for.
                </ScrollHighlightText>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 rounded-2xl border border-background/10 bg-background/5 p-8 mb-10"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Direct line</p>
                  <Link
                    href="mailto:shaf.shafheidar@gmail.com"
                    className="text-lg text-background font-medium hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    shaf.shafheidar@gmail.com
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Calendly</p>
                  <Link
                    href="https://cal.com"
                    className="text-lg text-background font-medium hover:text-primary transition-colors"
                  >
                    Book a 20 min introduction
                    <ArrowUpRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm text-background/50 pt-2">
                  <MapPin className="w-4 h-4" />
                  Islamabad, Pakistan
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-display font-semibold">
                  <Link href="mailto:shaf.shafheidar@gmail.com">Start a project</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl font-display font-semibold border-background/20 text-background hover:bg-background/10">
                  <Link href="/projects">Browse case studies</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
