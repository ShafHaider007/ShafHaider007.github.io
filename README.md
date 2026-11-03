# Shaf Haider — portfolio

Live at **https://shafhaider007.github.io/**

Personal site of Shaf Haider, GIS & remote-sensing specialist. Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run type-check
```

## Deploy

The site is a static export (`output: 'export'`) published to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. The workflow passes the
Pages base path and URL to the build through `NEXT_PUBLIC_BASE_PATH` and
`NEXT_PUBLIC_SITE_URL`. As a `<user>.github.io` repository the site is served
from the root, so the base path is empty.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Content

- `lib/site.ts`: profile, experience, skills, education
- `lib/projects.ts`: case studies (one page each under `/projects/[slug]`)
- `components/stories/*`: the scroll-driven "how it works" visual for each case study
- `components/viz/*`: the home-page spectral stack
- `components/home/*`: home sections (research questions, experience timeline, methods matrix)
- `components/motion/*`: Lenis smooth scrolling and GSAP scroll animations

## Figures and data

Every image and number in the visuals is computed from open data by the scripts in `scripts/viz`
(Python; `pip install -r scripts/viz/requirements.txt`), then exported to `public/viz` by `export.py`:

| Script | Visual | Sources |
| --- | --- | --- |
| `hero.py` | Spectral stack (bands, true colour, NDVI, land cover) | Sentinel-2 L2A, ESA WorldCover |
| `jfrel.py` | Forest-carbon activity-data walk-through | Sentinel-2 L2A, ESA WorldCover, Hansen GFC |
| `unccd.py` | SDG 15.3.1 sub-indicators and one-out-all-out | Sentinel-2 L2A (2017–2024), ESA WorldCover |
| `nfms.py` | Tile pyramid and live map tiles | Copernicus GLO-90, ESA WorldCover |
| `geofasal.py` | Season time-lapse and crop calendars | Sentinel-2 L2A |
| `movesmart.py` | Surface temperature, scatter, routes, isochrones | Landsat 8, Sentinel-2, Overture Maps |
| `mottainai.py` | Pickup route optimisation | Overture Maps, Sentinel-2 |
| `dha.py` | Axonometric building search | Overture Maps |

Imagery is read straight from the cloud-optimised open archives on AWS and Google Cloud (no downloads of
whole scenes); Overture Maps GeoParquet is read with HTTP range requests. The visuals are method
demonstrations on open data: they reproduce how each project works, not its confidential results.

Contains modified Copernicus Sentinel data (2017–2025). Landsat courtesy of the U.S. Geological Survey.
ESA WorldCover © ESA WorldCover project, CC BY 4.0. Overture Maps data under ODbL/CDLA as applicable.
