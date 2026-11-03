import type { Metadata } from 'next'
import Link from 'next/link'
import { readHeat } from '@/components/HeatScatter'
import { Education } from '@/components/home/Education'
import { Experience } from '@/components/home/Experience'
import { Methods } from '@/components/home/Methods'
import { DrylandFigure, ForestFigure, HeatFigure } from '@/components/home/ResearchFigures'
import { PersonJsonLd } from '@/components/JsonLd'
import { ProjectList } from '@/components/ProjectList'
import { SectionHead } from '@/components/SectionHead'
import { Text } from '@/components/Text'
import { projects } from '@/lib/projects'
import { interests, outputs, profile, statement } from '@/lib/site'
import { HeroStack } from '@/components/viz/HeroStack'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const heat = readHeat()
  return (
    <>
      <PersonJsonLd />

      {/* Who, where, what */}
      <section className="page pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
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
          <figure className="lg:col-span-7">
            <HeroStack />
            <figcaption className="figure-caption mx-auto max-w-[640px]">
              <span className="font-semibold text-ink">Figure 1.</span> Islamabad, 16 × 12 km, Sentinel-2, 1 October 2024: six spectral
              bands, true colour, NDVI and a land-cover map, computed for this site. The land-cover map agrees with ESA WorldCover
              labels for 69% of test pixels.
            </figcaption>
          </figure>
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
        <ol className="divide-y divide-line border-y border-line">
          {interests.map((q, i) => (
            <li key={q.id} className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14">
              <div className="lg:col-span-7">
                <p className="eyebrow">Question {i + 1}</p>
                <h3 className="mt-2 max-w-[36rem] text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink md:text-[26px]">{q.question}</h3>
                <p className="prose-text mt-4 max-w-prose">{q.summary}</p>
                <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-2">{q.background}</p>
                <p className="mt-4 text-[14.5px]">
                  <Link href={`/research/#${q.id}`} className="link">
                    Full statement
                  </Link>
                  <span className="text-ink-3"> · from </span>
                  <Link href={`/projects/${q.project}/`} className="link">
                    {q.projectLabel}
                  </Link>
                </p>
              </div>
              <div className={q.id === 'forest' ? 'mx-auto w-full max-w-[24rem] lg:col-span-5' : 'lg:col-span-5'}>
                {q.id === 'forest' && <ForestFigure n={2} />}
                {q.id === 'drylands' && <DrylandFigure n={3} />}
                {q.id === 'heat' && <HeatFigure n={4} d={heat} />}
              </div>
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
        <ProjectList items={projects} firstFigure={5} />
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
