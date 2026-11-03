import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** A numbered figure: thin neatline frame, caption underneath stating place, date, source and who made it. */
export function Plate({ n, caption, children, className }: { n: number; caption: ReactNode; children: ReactNode; className?: string }) {
  return (
    <figure className={className}>
      <div className="border border-ink/70 bg-surface p-1">{children}</div>
      <figcaption className="figure-caption">
        <span className="font-semibold text-ink">Figure {n}.</span> {caption}
      </figcaption>
    </figure>
  )
}

/** Plain image inside a plate. Width and height reserve space so the page does not jump while it loads. */
export function PlateImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={cn('block h-auto w-full bg-plate', className)} />
  )
}
