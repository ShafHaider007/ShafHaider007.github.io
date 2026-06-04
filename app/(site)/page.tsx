import { Hero } from '@/components/sections/Hero'
import { ProjectsSection } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { BentoGrid } from '@/components/sections/BentoGrid'
import { Methodology } from '@/components/sections/Methodology'
import { WhyHireMe } from '@/components/sections/WhyHireMe'
import { EarthObservation } from '@/components/sections/EarthObservation'
import { RemoteSensingScience } from '@/components/sections/RemoteSensingScience'
import { AmbientScrollLayer } from '@/components/animations/AmbientScrollLayer'

export default function HomePage() {
  return (
    <main className="relative">
      <AmbientScrollLayer />
      <Hero />
      <WhyHireMe />
      <EarthObservation />
      <RemoteSensingScience />
      <BentoGrid />
      <Methodology />
      <ProjectsSection />
      <Contact />
    </main>
  )
}
