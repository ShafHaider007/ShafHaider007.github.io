import Link from 'next/link'
import BlurText from '@/components/bits/BlurText'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  return (
    <main className="container-wide py-32">
      <div className="max-w-3xl space-y-8">
        <BlurText text="Let's plan your next geospatial project" animateBy="words" delay={120} className="text-balance font-display text-4xl font-bold text-foreground md:text-5xl tracking-tight" />
        <p className="text-lg text-muted-foreground leading-relaxed">
          I respond within one business day. Share your goals, timelines, and any details that help me understand the spatial outcomes you are aiming for.
        </p>
        <div className="space-y-6 rounded-2xl border border-border/50 bg-card p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Direct line</p>
            <Link href="mailto:shaf.shafheidar@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">
              shaf.shafheidar@gmail.com
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Calendly</p>
            <Link href="https://cal.com" className="text-foreground font-medium hover:text-primary transition-colors">
              Book a 20 min introduction
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-display font-semibold">
            <Link href="mailto:shaf.shafheidar@gmail.com">Start a project</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl font-display font-semibold">
            <Link href="/projects">Browse case studies</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
