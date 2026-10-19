import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 · Off the map</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">This page isn’t on any sheet.</h1>
        <p className="mt-4 leading-relaxed text-ink-2">The link may be old, or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-block bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-ink">
          Back to home
        </Link>
      </div>
    </main>
  )
}
