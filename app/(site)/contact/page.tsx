import Link from 'next/link'
import BlurText from '@/components/bits/BlurText'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-32">
      <div className="space-y-6">
        <BlurText text="Let’s plan your next spatial delivery" animateBy="words" delay={120} className="text-balance text-4xl font-semibold text-foreground md:text-5xl" />
        <p className="text-lg text-muted-foreground">
          I respond within one business day. Share goals, timelines, and anything that helps me understand the spatial outcomes you’re aiming for.
        </p>
        <div className="space-y-4 rounded-3xl border border-border/30 bg-card/70 p-8 shadow-lg shadow-black/20 backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Direct line</p>
            <Link href="mailto:shaf.shafheidar@gmail.com" className="mt-2 inline-flex items-center text-primary transition hover:text-primary/80">
              shaf.shafheidar@gmail.com
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Calendly</p>
            <Link href="https://cal.com" className="mt-2 inline-flex items-center text-primary transition hover:text-primary/80">
              Book a 20 min introduction
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="mailto:shaf.shafheidar@gmail.com">Start a project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">Browse case studies</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
