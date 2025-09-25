"use client"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/sections/Hero"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="relative">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
