import type { Metadata } from 'next'
import Link from 'next/link'
import { Education } from '@/components/home/Education'
import { Experience } from '@/components/home/Experience'
import { Methods } from '@/components/home/Methods'
import { PersonJsonLd } from '@/components/JsonLd'
import { Plate, PlateImage } from '@/components/Plate'
import { ProjectList } from '@/components/ProjectList'
import { SectionHead } from '@/components/SectionHead'
import { Text } from '@/components/Text'
import { projects } from '@/lib/projects'
import { interests, outputs, profile, statement } from '@/lib/site'
import { viz } from '@/lib/viz'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />

      {/* Who, where, what */}
      <section className="page pt-10 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:gap-16">
          <div>
            <h1 className="text-[34px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[42px]">{profile.name}</h1>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-2">
              {profile.role},{' '}
              <a href={profile.employerHref} className="link" rel="noreferrer">
                {profile.employerShort}
              </a>
              , {profile.location}
              <br />
              {profile.degree}, NUST, 2025
            </p>
            <div className="prose-text mt-6 max-w-[38rem] space-y-4 sm:text-[18px]">
              {statement.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]" data-print-hide>
              <li>
                <Link href="/research/" className="button">
                  Read my research interests
                </Link>
              </li>
              <li>
                <a href={profile.cvPdf} className="link">
                  Download CV (PDF)
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="link">
                  Email me
                </a>
              </li>
            </ul>
          </div>
          <Plate
            n={1}
            caption={
              <>
                Islamabad, 16 × 12 km, on 1 October 2024. Left: Sentinel-2 true colour. Right: NDVI from the same image; darker
                green means denser vegetation. Made for this site from Copernicus Sentinel-2 data.
              </>
            }
          >
            <div className="grid grid-cols-2 gap-1">
              <PlateImage
                src={viz('hero/true.webp')}
                width={1200}
                height={900}
                alt="Satellite image of Islamabad: the Margalla Hills forest at the top, the city grid in the middle and Rawal Lake on the right."
              />
              <PlateImage
                src={viz('hero/ndvi.webp')}
                width={1200}
                height={900}
                alt="Vegetation index map of the same area: dense green over the hills and green belts, pale yellow over built-up blocks and roads."
              />
            </div>
          </Plate>
        </div>
      </section>

      {/* Research interests, short */}
      <section className="page mt-20 md:mt-24" aria-labelledby="research">
        <SectionHead id="research" title="Research interests">
          Three questions that came out of my project work. The{' '}
          <Link href="/research/" className="link">
            research page
          </Link>{' '}
          sets out each one with a possible approach.
        </SectionHead>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {interests.map((q, i) => (
            <li key={q.id} className="border-t border-line pt-4">
              <p className="eyebrow">Question {i + 1}</p>
              <h3 className="mt-1.5 text-[18px] font-semibold leading-snug text-ink">{q.question}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{q.summary}</p>
              <p className="mt-3 text-[14.5px]">
                <Link href={`/research/#${q.id}`} className="link">
                  Full statement
                </Link>
                <span className="text-ink-3"> · from </span>
                <Link href={`/projects/${q.project}/`} className="link">
                  {q.projectLabel}
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Projects */}
      <section className="page mt-20 md:mt-24" aria-labelledby="projects">
        <span id="work" />
        <SectionHead id="projects" title="Projects">
          Each project page sets out the question, my part in the work and how the analysis is done. The method figures were
          recomputed for this site from open data; they are not project results.
        </SectionHead>
        <ProjectList items={projects} firstFigure={2} />
      </section>

      {/* Outputs, short */}
      <section className="page mt-20 md:mt-24" aria-labelledby="outputs">
        <SectionHead id="outputs" title="Reports and outputs">
          Reports and other outputs from the work above. The{' '}
          <Link href="/outputs/" className="link">
            outputs page
          </Link>{' '}
          gives full details and links to the live platforms.
        </SectionHead>
        <ol className="divide-y divide-line border-y border-line">
          {outputs.map((o) => (
            <li key={o.kind + o.title} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
              <p className="text-[13px] text-ink-3">
                {o.kind}
                <span className="block font-mono">
                  <Text>{o.year}</Text>
                </span>
              </p>
              <div>
                <p className="text-[15.5px] font-medium leading-snug text-ink">
                  <Text>{o.title}</Text>
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-2">
                  <Text>{o.status}</Text>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="page mt-20 md:mt-24" aria-labelledby="experience">
        <SectionHead id="experience" title="Experience" />
        <Experience />
      </section>

      <section className="page mt-20 md:mt-24" aria-labelledby="education">
        <SectionHead id="education" title="Education" />
        <Education />
      </section>

      <section className="page mt-20 md:mt-24" aria-labelledby="methods">
        <span id="skills" />
        <SectionHead id="methods" title="Methods and tools" />
        <Methods />
      </section>

      <section className="page mb-20 mt-20 md:mb-24 md:mt-24" aria-labelledby="contact">
        <SectionHead id="contact" title="Contact" />
        <div className="max-w-prose">
          <p className="prose-text">
            I am applying to graduate programs in geography. If you work on land change, forest carbon, drylands or urban heat
            and would consider a student with this background, I would be glad to hear from you.
          </p>
          <dl className="mt-6 grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-[15px]">
            <dt className="text-ink-3">Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`} className="link break-all">
                {profile.email}
              </a>
            </dd>
            <dt className="text-ink-3">CV</dt>
            <dd>
              <a href={profile.cvPdf} className="link">
                Shaf_Haider_CV.pdf
              </a>
              <span className="text-ink-3"> · also as </span>
              <a href={profile.cvDocx} className="link" download>
                Word (.docx)
              </a>
            </dd>
            {profile.links.map((l) => (
              <div key={l.label} className="contents">
                <dt className="text-ink-3">{l.label}</dt>
                <dd>
                  <a href={l.href} className="link break-all" rel="noreferrer">
                    {l.href.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </dd>
              </div>
            ))}
            <dt className="text-ink-3">Based in</dt>
            <dd className="text-ink">{profile.location}</dd>
          </dl>
        </div>
      </section>
    </>
  )
}
