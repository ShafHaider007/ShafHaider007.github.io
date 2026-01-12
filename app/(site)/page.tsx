import { Hero } from '@/components/sections/Hero'
import { ProjectsSection } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { Scene } from '@/components/Scene'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Methodology } from '@/components/sections/Methodology'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Scene />
      <main className="relative z-10">
        <Hero />
        <BentoGrid />
        <Methodology />
        <ProjectsSection />
        <Contact />
      </main>
      <div className="fixed bottom-6 right-6 z-50 mix-blend-difference text-xs font-mono text-white opacity-40 pointer-events-none">
        LAT: 33.6844° N | LNG: 73.0479° E
      </div>
    </div>
  )
}
