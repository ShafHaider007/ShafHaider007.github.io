import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { HeatScatter, heatR } from '@/components/HeatScatter'
import { Plate, PlateImage } from '@/components/Plate'
import { interests, profile, type Interest } from '@/lib/site'
import { viz } from '@/lib/viz'

export const metadata: Metadata = {
  title: 'Research interests',
  description:
    'Three research questions from Shaf Haider’s work in GIS and remote sensing: undetected forest degradation, land degradation when deserts are irrigated, and how well satellite heat maps describe street-level heat.',
  alternates: { canonical: '/research/' },
}

export default function ResearchPage() {
  const r = heatR()
  const figures: Record<Interest['id'], ReactNode> = {
    forest: (
      <Plate
        n={1}
        caption={
          <>
            Canopy density estimated by spectral unmixing, open-data test area near Murree, September 2018 (left) and September
            2024 (right). Darker green means denser canopy. Degradation shows up as a fall in density inside forest, which a forest
            or non-forest map does not record. Made for this site from Sentinel-2 data; not results from the forest-carbon study.
          </>
        }
      >
        <div className="grid grid-cols-2 gap-1">
          <PlateImage src={viz('jfrel/canopy_2018.webp')} width={883} height={1000} alt="Canopy density map for 2018: dense forest in dark green along the ridges, open land in off-white." />
          <PlateImage src={viz('jfrel/canopy_2024.webp')} width={883} height={1000} alt="Canopy density map for 2024 of the same hills, with a similar pattern of dense and open canopy." />
        </div>
      </Plate>
    ),
    drylands: (
      <Plate
        n={2}
        caption={
          <>
            Edge of the Cholistan desert, 24 × 15 km, in single cloud-free Sentinel-2 images from October or November 2017 (left)
            and 2024 (right). New rectangular fields appear in the sand between the two dates. Made for this site from Copernicus
            Sentinel-2 data.
          </>
        }
      >
        <div className="grid grid-cols-2 gap-1">
          <PlateImage src={viz('unccd/rgb_2017.webp')} width={800} height={500} alt="Satellite image from 2017: irrigated farmland in the upper left and open sand across the lower right." />
          <PlateImage src={viz('unccd/rgb_2024.webp')} width={800} height={500} alt="The same area in 2024, with new dark green rectangular fields scattered across the sand." />
        </div>
      </Plate>
    ),
    heat: (
      <Plate
        n={3}
        caption={
          <>
            Vegetation (NDVI, Sentinel-2, 10 June 2019) against land-surface temperature (Landsat 8, 27 June 2019) for 600 sampled
            pixels in Islamabad. Recomputed for this site from open data: r = {r.toFixed(2)}. The Move Smart project’s own analysis
            found r = −0.72.
          </>
        }
      >
        <HeatScatter />
      </Plate>
    ),
  }

  return (
    <article className="pb-20 md:pb-24">
      <header className="page pt-10 md:pt-14">
        <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[40px]">Research interests</h1>
        <div className="prose-text mt-4 max-w-prose space-y-4 text-ink-2">
          <p>
            My work so far has been applied: maps and data for reports, platforms and planning. Three of those projects left me
            with questions they could not answer within their scope. These are the questions I would like to study in graduate
            school.
          </p>
          <p className="font-sans text-[14px] leading-relaxed text-ink-3">
            The approaches are plans, not results. The figures were made for this site from open data to illustrate each question.
          </p>
        </div>
        <nav aria-label="Questions on this page" className="mt-6 max-w-prose" data-print-hide>
          <ol className="list-decimal space-y-1 pl-5 text-[15px] marker:text-ink-3">
            {interests.map((q) => (
              <li key={q.id}>
                <a href={`#${q.id}`} className="link">
                  {q.question}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {interests.map((q, i) => (
        <section key={q.id} aria-labelledby={q.id} className="page mt-16 md:mt-20">
          <div className="border-t border-ink pt-4">
            <p className="eyebrow">Question {i + 1}</p>
            <h2 id={q.id} className="mt-1 max-w-[46rem] text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink md:text-[28px]">
              {q.question}
            </h2>
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
            <div className="max-w-prose space-y-7">
              <Part title="What I have done">
                {q.background}{' '}
                <Link href={`/projects/${q.project}/`} className="link font-sans text-[0.9em]">
                  {q.projectLabel} case study
                </Link>
              </Part>
              <Part title="Why it is still open">{q.gap}</Part>
              <Part title="What I want to find out">{q.aim}</Part>
              <Part title="Possible approach">{q.approach}</Part>
            </div>
            <div>{figures[q.id]}</div>
          </div>
        </section>
      ))}

      <section className="page mt-16 md:mt-20">
        <div className="max-w-prose border-t border-line pt-6 text-[15px] leading-relaxed text-ink-2">
          <p>
            To talk about any of these questions, email{' '}
            <a href={`mailto:${profile.email}`} className="link break-all">
              {profile.email}
            </a>{' '}
            or{' '}
            <a href={profile.cvPdf} className="link">
              download my CV (PDF)
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  )
}

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-ink">{title}</h3>
      <p className="prose-text mt-1">{children}</p>
    </div>
  )
}
