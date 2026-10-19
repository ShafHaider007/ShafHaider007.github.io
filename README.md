# Shaf Haider — portfolio

Personal site of Shaf Haider, GIS & remote-sensing specialist. Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run type-check
```

Deployed on AWS Amplify as an SSR app (see `amplify.yml`).

## Content

- `lib/site.ts`: profile, experience, skills, education
- `lib/projects.ts`: case studies (one page each under `/projects/[slug]`)
- `lib/plates.ts`: satellite image metadata (bounds, acquisition date, scene id)

## Satellite plates

Every image in `public/media` is a Sentinel-2 L2A crop rendered from the open
[sentinel-cogs](https://registry.opendata.aws/sentinel-2-l2a-cogs/) archive on AWS
with `scripts/render_s2.py`:

```bash
pip install rasterio numpy pillow mgrs
python scripts/render_s2.py galiyat 73.40 34.06 14 9 2024-10,2024-11 --ndvi
```

It picks the least cloudy scene for the given months, reads B04/B03/B02 over the
area of interest, applies a percentile stretch and writes a JPEG (plus an NDVI
array with `--ndvi`). Contains modified Copernicus Sentinel data.

The locator map uses ADM1 boundaries from [geoBoundaries](https://www.geoboundaries.org/) (CC BY 4.0).
