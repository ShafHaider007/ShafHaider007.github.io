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
    title: 'Human-centred strategy',
    description: 'Pairing stakeholder workshops with service blueprints to align spatial systems with daily decision-making.',
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
  'Cloud Functions',
]

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <BlurText text="Building spatial products that marry clarity with context" animateBy="words" delay={120} className="text-balance text-4xl font-semibold text-foreground md:text-5xl" />
          <ScrollReveal enableBlur baseOpacity={0.2} className="text-lg text-muted-foreground">
            I combine geospatial engineering, UX strategy, and full-stack development to craft digital experiences that make maps feel intuitive, actionable, and trustworthy.
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {credentials.map((credential) => (
              <AnimatedContent key={credential.label} distance={80}>
                <div className="rounded-2xl border border-border/30 bg-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{credential.label}</p>
                  <p className="mt-2 text-sm text-foreground">{credential.value}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Ways I work</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {strengths.map((strength) => (
                <AnimatedContent key={strength.title} distance={80}>
                  <div className="rounded-2xl border border-border/30 bg-background/60 p-5">
                    <p className="text-base font-semibold text-foreground">{strength.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{strength.description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Toolbelt</h2>
            <p className="text-sm text-muted-foreground">The platforms and libraries I lean on to deliver reliable spatial products.</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {toolbelt.map((tool) => (
                <span key={tool} className="rounded-full border border-border/40 bg-background/60 px-3 py-1">
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
