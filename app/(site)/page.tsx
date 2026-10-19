import Link from 'next/link'
import { LocatorMap } from '@/components/LocatorMap'
import { Plate } from '@/components/Plate'
import { ProjectCard, ProjectRow } from '@/components/ProjectRow'
import { SectionHead } from '@/components/SectionHead'
import { projects } from '@/lib/projects'
import { education, experience, facts, profile, skills } from '@/lib/site'

const FEATURED = 3

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="page pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pt-6">
            <p className="eyebrow">{profile.role} · {profile.location}</p>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[3.4rem] lg:text-[3.6rem]">
              Mapping Pakistan’s forests, land and cities from <em className="italic text-accent-ink">satellite data</em>.
            </h1>
            <p className="mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-ink-2">{profile.summary}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#work" className="bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-ink">
                See selected work
              </Link>
              <a href={`mailto:${profile.email}`} className="border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper">
                Get in touch
              </a>
            </div>
            <div className="mt-12 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-2">
              <p className="eyebrow mb-1.5 text-ink-3">Currently</p>
              GIS &amp; RS Expert at GISPLUS, leading the geospatial workstream for Pakistan’s UNCCD 2026 national reporting with IUCN Pakistan.
            </div>
          </div>
          <div className="pt-5 lg:col-span-7">
            <Plate id="skardu" number="Fig. 1" priority sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-y border-line bg-surface">
        <dl className="page grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`py-8 pr-4 md:py-10 ${i % 2 === 1 ? 'pl-5 border-l border-line' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-5' : ''}`}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-serif text-[2rem] leading-none tracking-tight text-ink md:text-[2.5rem]">{f.value}</dd>
              <dd className="mt-3 max-w-[15rem] text-[13.5px] leading-snug text-ink-2">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Work */}
      <section id="work" className="page pt-20 md:pt-28">
        <SectionHead index="01" title="Selected work">
          National reporting, forest monitoring, agriculture and field operations. Each plate is a Sentinel-2 scene of the landscape the work is about.
        </SectionHead>
        <div className="divide-y divide-line">
          {projects.slice(0, FEATURED).map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
        <div className="grid gap-x-10 gap-y-16 border-t border-line pt-12 md:grid-cols-2 md:pt-16">
          {projects.slice(FEATURED).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + FEATURED} />
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="page pt-24 md:pt-32">
        <SectionHead index="02" title="Where the work sits">
          From the Margalla foothills to the Cholistan desert, and one fleet in Lagos.
        </SectionHead>
        <LocatorMap />
      </section>

      {/* Experience */}
      <section id="experience" className="page pt-24 md:pt-32">
        <SectionHead index="03" title="Experience" />
        <ol>
          {experience.map((r) => (
            <li key={r.org} className="grid gap-3 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-8">
              <p className="font-mono text-[12.5px] text-ink-3 md:pt-1.5">{r.period}</p>
              <div className="grid gap-4 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
                <div>
                  <h3 className="font-serif text-[1.4rem] leading-tight text-ink">{r.title}</h3>
                  <p className="mt-1 text-sm text-ink-2">
                    {r.orgHref ? (
                      <a href={r.orgHref} target="_blank" rel="noreferrer" className="link">
                        {r.org}
                      </a>
                    ) : (
                      r.org
                    )}
                    <span className="text-ink-3"> · {r.place}</span>
                  </p>
                </div>
                <ul className="space-y-2.5 text-[15px] leading-relaxed text-ink-2">
                  {r.points.map((pt) => (
                    <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-3">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills + education */}
      <section id="skills" className="page pt-24 md:pt-32">
        <SectionHead index="04" title="Tools and methods" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="eyebrow border-b border-line pb-3 text-ink">{s.group}</h3>
              <ul className="mt-4 space-y-1.5 text-[15px] text-ink-2">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 border-t border-line bg-surface p-6 md:grid-cols-[12rem_1fr] md:gap-8 md:p-8">
          <p className="eyebrow pt-1">Education</p>
          <div>
            <h3 className="font-serif text-[1.5rem] leading-tight text-ink">{education.degree}</h3>
            <p className="mt-1 text-sm text-ink-2">
              {education.school} · {education.dept}
            </p>
            <p className="mt-1 font-mono text-[12.5px] text-ink-3">
              {education.period} · {education.grade}
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">{education.project}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">{education.coursework.join(' · ')}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="page pb-24 pt-24 md:pb-32 md:pt-32">
        <SectionHead index="05" title="Contact" />
        <div className="grid gap-10 md:grid-cols-[12rem_1fr] md:gap-8">
          <div />
          <div>
            <p className="max-w-2xl text-[1.075rem] leading-relaxed text-ink-2">
              Open to Earth-observation, land-monitoring and WebGIS work: consultancies, research collaborations and full-time roles.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block break-all font-serif text-[1.7rem] leading-tight text-ink underline decoration-accent decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent-ink sm:text-[2.6rem]"
            >
              {profile.email}
            </a>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link text-ink">
                    {l.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cv} download className="link text-ink">
                  Download CV (.docx)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
