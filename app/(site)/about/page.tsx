import BlurText from '@/components/bits/BlurText'
import AnimatedContent from '@/components/bits/AnimatedContent'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { AboutPortrait } from '@/components/about/AboutPortrait'

const credentials = [
  { label: 'Degree', value: 'BSc Geoinformatics Engineering' },
  { label: 'Leadership', value: 'Vice President Operations – GIS Day 2024' },
  { label: 'Research', value: 'AR experiences for urban mobility' },
]

const strengths = [
  {
    title: 'Spatial thinking',
    description: 'Pairing stakeholder workshops with service blueprints to align spatial systems with real-world decision-making.',
  },
  {
    title: 'Analytical rigor',
    description: 'Modeling complex datasets with reproducible notebooks, versioned schemas, and automated QA checks.',
  },
  {
    title: 'End-to-end delivery',
    description: 'Prototyping, shipping, and maintaining production-ready GIS platforms across cross-functional teams.',
  },
]

const toolbelt = [
  'ArcGIS Pro',
  'QGIS',
  'PostGIS',
  'deck.gl',
  'Mapbox GL',
  'Next.js',
  'TypeScript',
  'Python',
  'GeoServer',
  'Google Earth Engine',
]

export default function AboutPage() {
  return (
    <main className="container-wide py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-10">
          <BlurText text="Building spatial products that marry clarity with context" animateBy="words" delay={120} className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight" />
          <ScrollReveal enableBlur baseOpacity={0.2} className="text-lg text-muted-foreground leading-relaxed">
            I combine geospatial engineering, UX strategy, and full-stack development to craft digital experiences that make maps feel intuitive, actionable, and trustworthy.
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {credentials.map((credential) => (
              <AnimatedContent key={credential.label} distance={80}>
                <div className="rounded-2xl border border-border/50 bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{credential.label}</p>
                  <p className="mt-2 text-sm text-foreground">{credential.value}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>

          <section className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground">How I work</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {strengths.map((strength) => (
                <AnimatedContent key={strength.title} distance={80}>
                  <div className="rounded-2xl border border-border/50 bg-card p-6">
                    <p className="font-display text-base font-semibold text-foreground">{strength.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Toolbelt</h2>
            <p className="text-sm text-muted-foreground">The platforms and libraries I lean on to deliver reliable spatial products.</p>
            <div className="flex flex-wrap gap-2">
              {toolbelt.map((tool) => (
                <span key={tool} className="text-xs font-medium px-3 py-1.5 rounded-full border border-border/50 bg-muted text-muted-foreground">
                  {tool}
                </span>
              ))}
            </div>
          </section>
        </div>

        <AboutPortrait />
      </div>
    </main>
  )
}
