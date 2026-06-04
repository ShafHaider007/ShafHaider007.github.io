'use client'

import BlurText from '@/components/bits/BlurText'
import AnimatedContent from '@/components/bits/AnimatedContent'
import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'
import { AboutPortrait } from '@/components/about/AboutPortrait'
import { Experience } from '@/components/sections/Experience'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'
import { credentials, strengths, toolbelt } from '@/lib/story'
import { motion } from 'motion/react'

export function AboutStory() {
  return (
    <main className="relative">
      <section className="container-wide py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-10">
            <BlurText
              text="Engineering the pipelines behind earth observation science"
              animateBy="words"
              delay={120}
              className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight"
            />
            <div className="max-w-2xl">
              <ScrollHighlightText className="text-lg text-muted-foreground leading-relaxed">
                I sit between earth-systems science and software engineering — designing satellite-imagery data pipelines, managing spatial databases, and running remote-sensing analysis with the rigor of reproducible, well-tested code.
              </ScrollHighlightText>
            </div>
          </div>
          <AboutPortrait />
        </div>
      </section>

      <section className="container-wide pb-24">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Credentials</h2>
        <ScrollStack itemDistance={60} baseScale={0.9} innerClassName="px-0 max-w-2xl mx-auto">
          {credentials.map((credential) => (
            <ScrollStackItem key={credential.label} itemClassName="min-h-[140px]">
              <div className="h-full rounded-2xl border border-border/50 bg-card p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{credential.label}</p>
                <p className="mt-3 text-lg text-foreground font-medium">{credential.value}</p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <section className="container-wide py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-display text-3xl font-bold text-foreground">How I work</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Principles that guide every pipeline, dataset, and analysis from ingestion through reporting.
            </p>
          </div>
          <div className="grid gap-4">
            {strengths.map((strength) => (
              <AnimatedContent key={strength.title} distance={80}>
                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                  <p className="font-display text-lg font-semibold text-foreground">{strength.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <Experience />

      <section className="container-wide py-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="font-display text-2xl font-bold text-foreground">Toolbelt</h2>
          <p className="text-sm text-muted-foreground">
            The languages, geospatial libraries, and infrastructure I lean on to deliver reliable earth-observation systems.
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {toolbelt.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-muted text-muted-foreground"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}
