import type { Metadata } from 'next'
import Link from 'next/link'
import { Text } from '@/components/Text'
import { getProject } from '@/lib/projects'
import { outputs, platforms, profile } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Reports and outputs',
  description:
    'Reports, national reporting work, workshops, the final-year design project and live platforms that Shaf Haider contributed to.',
  alternates: { canonical: '/outputs/' },
}

export default function OutputsPage() {
  return (
    <article className="page pb-20 pt-10 md:pb-24 md:pt-14">
      <header className="max-w-prose">
        <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[40px]">Reports and outputs</h1>
        <p className="prose-text mt-4 text-ink-2">
          Reports I contributed to, workshops, my final-year design project, and the live platforms and apps I worked on. Each entry
          gives my role as stated in my CV.
        </p>
      </header>

      <section aria-labelledby="reports" className="mt-12">
        <h2 id="reports" className="border-t border-ink pt-4 text-[22px] font-semibold tracking-[-0.01em] text-ink md:text-[24px]">
          Reports, workshops and the design project
        </h2>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {outputs.map((o) => (
            <li key={o.kind + o.title} className="grid gap-2 py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
              <div className="text-[13.5px] text-ink-3">
                <p>{o.kind}</p>
                <p className="mt-0.5 font-mono text-ink-2">
                  <Text>{o.year}</Text>
                </p>
              </div>
              <div className="max-w-prose">
                <h3 className="prose-text font-medium leading-snug">
                  <Text>{o.title}</Text>
                </h3>
                <dl className="mt-3 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-[14.5px] leading-relaxed">
                  {o.authors && (
                    <>
                      <dt className="text-ink-3">Authors</dt>
                      <dd className="text-ink-2">
                        <Text>{o.authors}</Text>
                      </dd>
                    </>
                  )}
                  {o.where && (
                    <>
                      <dt className="text-ink-3">Setting</dt>
                      <dd className="text-ink-2">
                        <Text>{o.where}</Text>
                      </dd>
                    </>
                  )}
                  <dt className="text-ink-3">Status</dt>
                  <dd className="text-ink-2">
                    <Text>{o.status}</Text>
                  </dd>
                  <dt className="text-ink-3">My part</dt>
                  <dd className="text-ink-2">{o.detail}</dd>
                </dl>
                {o.link && (
                  <p className="mt-3 text-[14.5px]">
                    <Link href={o.link.href} className="link">
                      {o.link.label}
                    </Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="platforms" className="mt-14">
        <h2 id="platforms" className="border-t border-ink pt-4 text-[22px] font-semibold tracking-[-0.01em] text-ink md:text-[24px]">
          Live platforms and apps
        </h2>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">
          Production systems I contributed to as part of a team or as a freelancer. The links go to external sites.
        </p>
        <table className="mt-6 w-full border-collapse text-left text-[14.5px]">
          <caption className="sr-only">Live platforms and apps, with the project each belongs to</caption>
          <thead>
            <tr className="border-b border-ink text-[13px] text-ink-2">
              <th scope="col" className="py-2 pr-4 font-medium">
                Platform or app
              </th>
              <th scope="col" className="hidden py-2 pr-4 font-medium sm:table-cell">
                Where
              </th>
              <th scope="col" className="py-2 font-medium">
                Project
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((p) => (
              <tr key={p.href} className="border-b border-line align-top">
                <td className="py-2.5 pr-4">
                  <a href={p.href} className="link" rel="noreferrer">
                    {p.name}
                  </a>
                  <span className="block text-[13px] text-ink-3 sm:hidden">{p.host}</span>
                </td>
                <td className="hidden py-2.5 pr-4 text-ink-2 sm:table-cell">{p.host}</td>
                <td className="py-2.5">
                  <Link href={`/projects/${p.project}/`} className="link">
                    {getProject(p.project)?.short}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-14 max-w-prose border-t border-line pt-6 text-[15px] leading-relaxed text-ink-2">
        <p>
          My full record is in my CV:{' '}
          <a href={profile.cvPdf} className="link">
            Shaf_Haider_CV.pdf
          </a>
          .
        </p>
      </section>
    </article>
  )
}
