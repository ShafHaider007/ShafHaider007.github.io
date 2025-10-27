import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section id="contact" className="border-t py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-semibold">Ready to ship spatial products?</h2>
        <p className="max-w-2xl text-muted-foreground">
          Let's discuss how geospatial solutions can move your roadmap forward.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="mailto:shaf.shafheidar@gmail.com">Start a project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Book a chat</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
