import { Hero } from '@/components/sections/Hero'
import { Expertise } from '@/components/sections/Expertise'
import { Story } from '@/components/sections/Story'
import { ProjectsSection } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <main className="relative z-10">
        <Hero />
        <Expertise />
        <Story />
        <ProjectsSection />
        <Testimonials />
        <CTA />
      </main>
    </div>
  )
}
