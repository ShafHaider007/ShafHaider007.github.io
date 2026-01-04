import { Hero } from '@/components/sections/Hero'
import { Expertise } from '@/components/sections/Expertise'
import { ProjectsSection } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

import { AnimatedBackground } from '@/components/AnimatedBackground'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10">
        <Hero />
        <Expertise />
        <ProjectsSection />
        <Contact />
      </main>
      <div className="fixed bottom-6 right-6 z-50 mix-blend-difference text-xs font-mono text-white opacity-40 pointer-events-none">
        LAT: 33.6844° N | LNG: 73.0479° E
      </div>
    </div>
  )
}
