import { experience } from '@/lib/site'

/** Roles as a plain list, most recent first. */
export function Experience() {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {experience.map((r) => (
        <li key={r.org} className="grid gap-1.5 py-6 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8">
          <p className="font-mono text-[13px] text-ink-3 md:pt-0.5">{r.period}</p>
          <div>
            <h3 className="text-[17px] font-semibold leading-snug text-ink">{r.title}</h3>
            <p className="mt-0.5 text-[14.5px] text-ink-2">
              {r.orgHref ? (
                <a href={r.orgHref} className="link" rel="noreferrer">
                  {r.org}
                </a>
              ) : (
                r.org
              )}
              , {r.place}
            </p>
            <ul className="mt-3 max-w-prose list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-ink-3">
              {r.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}
