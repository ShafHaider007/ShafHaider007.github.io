import { Fragment } from 'react'
import { NEEDS } from '@/lib/site'

/**
 * Renders a string, marking any "[NEEDS REAL CONTENT: …]" part as a visible placeholder so missing facts
 * cannot be mistaken for real ones.
 */
export function Text({ children }: { children: string }) {
  if (!children.includes(NEEDS)) return <>{children}</>
  const parts = children.split(/(\[NEEDS REAL CONTENT:[^\]]*\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith(NEEDS) ? (
          <span key={i} className="placeholder">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
