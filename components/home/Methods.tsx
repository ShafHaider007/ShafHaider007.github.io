import Link from 'next/link'
import { methodColumns, methods, tools } from '@/lib/site'

/** Methods by project as a table on wider screens and a list on phones; tools as plain lists under labels. */
export function Methods() {
  return (
    <div className="grid gap-12">
      {/* phones: each method with the projects that used it */}
      <ul className="divide-y divide-line border-y border-line sm:hidden">
        {methods.map((m) => (
          <li key={m.name} className="py-3">
            <p className="text-[15px] text-ink">{m.name}</p>
            <p className="mt-1 text-[14px] text-ink-2">
              Used in:{' '}
              {m.used.map((i, k) => (
                <span key={i}>
                  {k > 0 && ', '}
                  <Link href={`/projects/${methodColumns[i].slug}/`} className="link">
                    {methodColumns[i].short}
                  </Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>

      <div className="hidden sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="mb-3 text-left text-[13px] text-ink-2">
            <span className="font-semibold text-ink">Table 1.</span> Methods used in each project, as listed in the CV. A filled
            square means the method was part of my work on that project.
          </caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="w-[40%] py-2 pr-4 text-[13px] font-medium text-ink-2">
                Method
              </th>
              {methodColumns.map((c) => (
                <th key={c.slug} scope="col" className="px-1 py-2 text-center align-bottom text-[12.5px] font-medium leading-tight text-ink-2">
                  <Link href={`/projects/${c.slug}/`} className="title-link">
                    {c.short}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {methods.map((m) => (
              <tr key={m.name} className="border-b border-line">
                <th scope="row" className="py-2.5 pr-4 text-[14.5px] font-normal text-ink">
                  {m.name}
                </th>
                {methodColumns.map((c, i) => (
                  <td key={c.slug} className="px-1 py-2.5 text-center">
                    {m.used.includes(i) ? (
                      <>
                        <span aria-hidden className="inline-block h-2.5 w-2.5 bg-ink" />
                        <span className="sr-only">Used in {c.short}</span>
                      </>
                    ) : (
                      <span className="sr-only">Not used in {c.short}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <div key={t.group}>
            <dt className="text-[13px] font-semibold text-ink">{t.group}</dt>
            <dd className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{t.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
