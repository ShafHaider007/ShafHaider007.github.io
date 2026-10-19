import Image from 'next/image'
import { cn } from '@/lib/utils'
import { formatDeg, plateWidthKm, plates, type PlateKey } from '@/lib/plates'

const NICE_KM = [0.5, 1, 2, 5, 10]

function scaleBar(widthKm: number) {
  // Aim for a bar near a fifth of the frame width.
  const km = NICE_KM.reduce((best, k) => (Math.abs(k - widthKm / 5) < Math.abs(best - widthKm / 5) ? k : best))
  return { km, pct: (km / widthKm) * 100 }
}

type Props = {
  id: PlateKey
  number?: string
  className?: string
  sizes?: string
  priority?: boolean
  caption?: boolean
  note?: string
  /** Crop to this width/height ratio (centred); graticule and scale follow the crop. */
  aspect?: number
}

/** A satellite image framed like a map sheet: graticule ticks, scale bar and source line. */
export function Plate({ id, number, className, sizes = '100vw', priority, caption = true, note, aspect }: Props) {
  const p = plates[id]
  const natural = p.src.width / p.src.height
  // Fraction of the image kept on each axis after a centred crop.
  const fx = aspect && aspect < natural ? aspect / natural : 1
  const fy = aspect && aspect > natural ? natural / aspect : 1
  const [w0, s0, e0, n0] = p.bounds
  const [cx, cy] = [(w0 + e0) / 2, (s0 + n0) / 2]
  const [w, e] = [cx - ((e0 - w0) * fx) / 2, cx + ((e0 - w0) * fx) / 2]
  const [s, n] = [cy - ((n0 - s0) * fy) / 2, cy + ((n0 - s0) * fy) / 2]
  const bar = scaleBar(plateWidthKm(p) * fx)

  return (
    <figure className={cn('group', className)}>
      <div className="relative border border-ink/80 bg-surface p-[5px]">
        <div className="relative overflow-hidden" style={aspect ? { aspectRatio: aspect } : undefined}>
          <Image
            src={p.src}
            alt={`Sentinel-2 true-colour image of ${p.place}, ${p.region}`}
            placeholder="blur"
            sizes={sizes}
            priority={priority}
            className={aspect ? 'h-full w-full object-cover' : 'h-auto w-full'}
          />
          {/* width is calc(pct + padding) so the bar itself spans exactly bar.km on the image */}
          <div
            className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-[2px] bg-surface/90 px-2 pb-1 pt-1.5 font-mono text-[9.5px] leading-none text-ink sm:bottom-3 sm:left-3"
            style={{ width: `calc(${bar.pct}% + 1rem)` }}
          >
            <div className="grid h-[5px] grid-cols-4 border border-ink">
              <span className="bg-ink" />
              <span />
              <span className="bg-ink" />
              <span />
            </div>
            <div className="mt-1 flex justify-between">
              <span>0</span>
              <span>{bar.km} km</span>
            </div>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 20 28"
            className="pointer-events-none absolute right-3 top-3 h-7 w-5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
          >
            <path d="M10 1 L17 22 L10 17 L3 22 Z" fill="#fffefb" stroke="#1b2220" strokeWidth="1" />
            <path d="M10 1 L10 17 L3 22 Z" fill="#1b2220" />
          </svg>
        </div>
        {/* graticule labels on the frame */}
        <span className="absolute -top-[1.15rem] left-0 font-mono text-[10px] text-ink-3">{formatDeg(w, 'lon')}</span>
        <span className="absolute -top-[1.15rem] right-0 font-mono text-[10px] text-ink-3">{formatDeg(e, 'lon')}</span>
        <span className="absolute -right-[1.05rem] top-0 hidden font-mono text-[10px] text-ink-3 [writing-mode:vertical-rl] md:block">
          {formatDeg(n, 'lat')}
        </span>
        <span className="absolute -right-[1.05rem] bottom-0 hidden font-mono text-[10px] text-ink-3 [writing-mode:vertical-rl] md:block">
          {formatDeg(s, 'lat')}
        </span>
      </div>
      {caption && (
        <figcaption className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="text-ink-2">
            {number && <span className="mr-2 font-mono text-[11px] text-accent">{number}</span>}
            <span className="font-medium text-ink">{p.place}</span>, {p.region}
            {note && <span className="text-ink-3"> · {note}</span>}
          </span>
          <span className="shrink-0 font-mono text-[11px] text-ink-3">Sentinel-2 L2A · {p.date}</span>
        </figcaption>
      )}
    </figure>
  )
}
