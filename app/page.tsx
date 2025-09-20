"use client"
import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main content with sidebar layout inspired by design */}
      <div className="lg:flex">
        {/* Left sidebar - Fixed on large screens */}
        <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-1/2 lg:overflow-y-auto">
          <Hero />
        </div>

        {/* Right content - Scrollable sections */}
        <div className="lg:ml-[50%] lg:w-1/2">
          <main className="space-y-0">
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </div>
  )
}
