import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-prose flex-col justify-center px-4">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">Page not found</h1>
      <p className="prose-text mt-4 text-ink-2">The link may be out of date, or the page may have moved. These pages exist:</p>
      <ul className="mt-4 space-y-1.5 text-[15px]">
        <li>
          <Link href="/" className="link">
            Home: Shaf Haider
          </Link>
        </li>
        <li>
          <Link href="/research/" className="link">
            Research interests
          </Link>
        </li>
        <li>
          <Link href="/projects/" className="link">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/outputs/" className="link">
            Reports and outputs
          </Link>
        </li>
      </ul>
    </main>
  )
}
