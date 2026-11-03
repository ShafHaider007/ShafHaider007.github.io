# Shaf Haider: personal site

Live at **https://shafhaider007.github.io/**

The site of Shaf Haider, a geoinformatics engineer working in GIS and remote sensing. It is built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS.

## Pages

| Route | Content |
| --- | --- |
| `/` | Who Shaf is, research interests in brief, projects, outputs, experience, education, methods, contact |
| `/research/` | Three research questions, each with background, open problem, aim and a possible approach |
| `/projects/` | All projects |
| `/projects/<slug>/` | One case study per project, with a step-by-step method walk-through |
| `/outputs/` | Reports, national reporting, workshops, the final-year design project, live platforms |

The CV is available in two formats:

- `/Shaf_Haider_CV.pdf`, generated from the Word file with LibreOffice
- `/Shaf_Haider_CV.docx`, the source file

## Develop

```bash
npm install
npm run dev         # http://localhost:3000
npm run lint        # ESLint (.eslintrc.json), no warnings allowed
npm run type-check  # TypeScript
npm run build       # static export to out/
```

## Deploy

The site is a static export (`output: 'export'`). `.github/workflows/deploy.yml` publishes it to GitHub Pages on every push to `main`.

The workflow passes the Pages base path and URL to the build through `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL`. A `<user>.github.io` repository is served from the root, so the base path is empty.

## Content and its sources

**`lib/site.ts`** holds:

- the profile
- research interests
- outputs and platforms
- experience
- methods and tools
- education
- data credits

**`lib/projects.ts`** holds the project content.

Every statement about Shaf comes from the CV, the NUST transcript, or what Shaf has said directly. The comments in `lib/site.ts` name the source for each statement.

Missing facts are written as `[NEEDS REAL CONTENT: …]`. The site shows these as highlighted placeholders, so they cannot be mistaken for real information.

The other folders are:

- `components/stories/*`: the method walk-through for each case study
- `docs/AUDIT.md` and `docs/DESIGN-DIRECTION.md`: the editorial audit and the design rules the site follows

## Figures and data

Every image and number in the figures is computed from open data by the Python scripts in `scripts/viz`. Install their dependencies with `pip install -r scripts/viz/requirements.txt`. `export.py` then exports the results to `public/viz`.

| Script | Figure | Sources |
| --- | --- | --- |
| `hero.py` | Spectral band stack, true colour, NDVI and land cover for Islamabad (home, Figure 1) | Sentinel-2 L2A, ESA WorldCover |
| `jfrel.py` | Forest-carbon activity-data walk-through, canopy density | Sentinel-2 L2A, ESA WorldCover, Hansen GFC |
| `unccd.py` | SDG 15.3.1 measures and the "one out, all out" rule | Sentinel-2 L2A (2017–2024), ESA WorldCover |
| `nfms.py` | Tile pyramid and live map tiles | Copernicus GLO-90, ESA WorldCover |
| `geofasal.py` | Season time-lapse and crop calendars | Sentinel-2 L2A |
| `movesmart.py` | Surface temperature, scatter plot, routes, walking areas | Landsat 8, Sentinel-2, Overture Maps |
| `mottainai.py` | Pickup route ordering | Overture Maps, Sentinel-2 |
| `dha.py` | 3D building search | Overture Maps |

Imagery is read directly from the cloud-optimised open archives on AWS and Google Cloud. Overture Maps GeoParquet is read with HTTP range requests.

The figures are method demonstrations on open data. They show how each project works. They are not project results, and every caption and walk-through on the site says so.

## Credits

- Contains modified Copernicus Sentinel data (2017–2025).
- Landsat 8 data courtesy of the U.S. Geological Survey.
- ESA WorldCover 2021 © ESA WorldCover project, CC BY 4.0.
- Hansen/UMD/Google/USGS/NASA Global Forest Change, CC BY 4.0.
- Copernicus DEM GLO-90 © DLR e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European Union and ESA.
- Overture Maps Foundation data, including © OpenStreetMap contributors, ODbL.
