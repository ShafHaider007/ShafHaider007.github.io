import { Hero } from '@/components/sections/Hero'
import { ProjectsSection } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Methodology } from '@/components/sections/Methodology'

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <BentoGrid />
      <Methodology />
      <ProjectsSection />
      <Contact />
    </main>
  )
}
