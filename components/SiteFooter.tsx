import { credits, profile } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="page grid gap-8 py-10 text-[13px] leading-relaxed text-ink-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-14">
        <div>
          <p className="font-medium text-ink">{profile.name}</p>
          <p>Full name: {profile.fullName}</p>
          <p>
            {profile.role}, {profile.location}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1" data-print-hide>
            <li>
              <a className="link" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            {profile.links.map((l) => (
              <li key={l.label}>
                <a className="link" href={l.href} rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a className="link" href={profile.cvPdf}>
                CV (PDF)
              </a>
            </li>
          </ul>
          <p className="mt-3">© {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div>
          <p className="font-medium text-ink">Figure data and credits</p>
          <p className="mt-1">
            The figures were made for this site from open data with the scripts in{' '}
            <a className="link" href="https://github.com/ShafHaider007/ShafHaider007.github.io/tree/main/scripts/viz" rel="noreferrer">
              scripts/viz
            </a>
            . They show methods; they are not project results.
          </p>
          <ul className="mt-2 list-disc space-y-0.5 pl-4 marker:text-ink-3">
            {credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
