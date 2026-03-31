import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">404</p>
        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-display font-semibold">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  )
}
