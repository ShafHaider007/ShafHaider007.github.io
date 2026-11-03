import Link from 'next/link'
import { education } from '@/lib/site'

/** Degree details from the NUST transcript and CV. */
export function Education() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
      <div>
        <h3 className="text-[19px] font-semibold leading-snug text-ink">{education.degree}</h3>
        <p className="mt-1 text-[15px] text-ink-2">
          {education.school}, {education.dept}
        </p>
        <dl className="mt-5 grid grid-cols-[9rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-[14.5px]">
          <dt className="text-ink-3">Studied</dt>
          <dd className="text-ink">{education.period}</dd>
          <dt className="text-ink-3">Degree awarded</dt>
          <dd className="text-ink">{education.awarded}</dd>
          <dt className="text-ink-3">CGPA</dt>
          <dd className="font-mono text-[14px] text-ink">{education.grade}</dd>
        </dl>
        <div className="mt-6 border-l-2 border-ink pl-4">
          <p className="text-[13px] font-semibold text-ink">Final-year design project (group), grade A in parts I and II</p>
          <p className="prose-text mt-1">{education.project}</p>
          <Link href="/projects/move-smart/" className="link mt-2 inline-block text-[14.5px]">
            Move Smart case study
          </Link>
        </div>
      </div>
      <div className="grid gap-6">
        <div>
          <h3 className="text-[13px] font-semibold text-ink">Courses with grade A</h3>
          <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{education.aGrades.join(', ')}.</p>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-ink">Other core courses</h3>
          <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{education.core.join(', ')}.</p>
        </div>
      </div>
    </div>
  )
}
