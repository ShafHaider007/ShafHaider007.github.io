"use client"

import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/sections/Hero"
import { SecondaryHero } from "@/components/sections/SecondaryHero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import { ScrollCanvas } from "@/components/ui/ScrollCanvas"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollCanvas />
      <Navigation />

      <main className="relative z-[1]">
        <Hero />
        <SecondaryHero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
