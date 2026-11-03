export type Project = {
  slug: string
  title: string
  short: string
  client: string
  role: string
  period: string
  blurb: string
  /** What I did, from the CV. */
  did: string[]
  figures: { value: string; label: string }[]
  stack: string[]
  links?: { label: string; href: string }[]
  /** Marker on the home-page map (null when off-sheet or national). */
  where: { lon: number; lat: number; label: string } | null
  /** What the visual on the project page shows. */
  media: string
}

export const projects: Project[] = [
  {
    slug: 'forest-carbon-activity-data',
    title: 'Activity data for a jurisdictional forest reference emission level',
    short: 'JFREL forest-carbon study',
    client: 'GISPLUS · UNOPS-supported study',
    role: 'One of five named lead authors · geospatial activity-data lead',
    period: '2025',
    blurb:
      'Built the complete activity-data workflow for a UNOPS-supported forest-carbon study: three epochs of Sentinel-2 classified into 10 m land cover, refined across years, and turned into forest change, canopy density and IPCC-aligned activity data for four jurisdictions.',
    did: [
      'Processed Sentinel-2 imagery for 2016, 2020 and 2024 in Google Earth Engine and QGIS to produce 10 m LULC datasets with Random Forest classification and interpretation-based cross-year refinement.',
      'Quantified land-cover transitions, forest disturbance and canopy-density change across four jurisdictions using change analysis and spectral unmixing.',
      'Integrated outputs with field inventories and IPCC-aligned carbon accounting, and supported uncertainty assessment, field verification and stakeholder validation.',
    ],
    figures: [
      { value: '3', label: 'Sentinel-2 epochs: 2016, 2020, 2024' },
      { value: '10 m', label: 'land-cover resolution' },
      { value: '4', label: 'jurisdictions assessed' },
    ],
    stack: ['Google Earth Engine', 'Sentinel-2', 'Random Forest', 'Spectral unmixing', 'QGIS', 'IPCC accounting'],
    where: { lon: 73.405, lat: 33.99, label: 'Galiyat forests' },
    media: 'Method walk-through: epochs, classification, refinement, transitions, canopy density, uncertainty',
  },
  {
    slug: 'unccd-2026-national-reporting',
    title: 'UNCCD 2026 national reporting for Pakistan',
    short: 'UNCCD 2026 national reporting',
    client: 'GISPLUS · IUCN Pakistan',
    role: 'GIS expert & geospatial team lead',
    period: '2025 — Present',
    blurb:
      'Leading the GIS and remote-sensing workstream behind Pakistan’s report to the UN Convention to Combat Desertification: land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
    did: [
      'Lead the GIS and remote-sensing workstream for Pakistan’s UNCCD 2026 national reporting with IUCN Pakistan.',
      'Coordinate national assessments of land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought, guiding data review, QA/QC and technical documentation.',
      'Delivered provincial workshops for government and technical stakeholders on satellite-based land-degradation assessment and the Trends.Earth workflow.',
    ],
    figures: [
      { value: 'SDG 15.3.1', label: 'proportion of degraded land' },
      { value: 'LDN', label: 'Land Degradation Neutrality' },
      { value: 'Provincial', label: 'workshops for government stakeholders' },
    ],
    stack: ['Trends.Earth', 'Google Earth Engine', 'QGIS', 'Drought indices', 'QA/QC'],
    where: { lon: 71.8, lat: 29.05, label: 'Cholistan (demo window)' },
    media: 'The three SDG 15.3.1 sub-indicators, combined under one-out-all-out',
  },
  {
    slug: 'national-forest-monitoring-system',
    title: 'National Forest Monitoring System of Pakistan',
    short: 'National Forest Monitoring System',
    client: 'GISPLUS',
    role: 'Geospatial data engineering & WebGIS',
    period: '2025',
    blurb:
      'Engineered the Python/GDAL raster pipeline that harmonises national Earth-observation layers, automates QA/QC and publishes optimised tiles into the Next.js WebGIS of Pakistan’s forest monitoring platform.',
    did: [
      'Contributed as part of the development team to Pakistan’s National Forest Monitoring System in Next.js, an operational platform for forest-monitoring, land-cover and climate-reporting information.',
      'Engineered a Python/GDAL raster pipeline to harmonise inputs, automate QA/QC, create optimised MBTiles, publish tile services and integrate large Earth-observation layers into a responsive WebGIS.',
    ],
    figures: [
      { value: 'GDAL', label: 'harmonisation and QA/QC pipeline' },
      { value: 'MBTiles', label: 'optimised tile services' },
      { value: 'National', label: 'forest and land-cover layers' },
    ],
    stack: ['Python', 'GDAL', 'MBTiles', 'Tile services', 'Next.js', 'WebGIS'],
    links: [{ label: 'nfmspak.org', href: 'https://www.nfmspak.org/' }],
    where: null,
    media: 'The raster pipeline, a real tile pyramid, and a live map built from it',
  },
  {
    slug: 'geofasal',
    title: 'GeoFasal: field-level agricultural intelligence',
    short: 'GeoFasal agri-tech platform',
    client: 'GISPLUS',
    role: 'Geospatial workflows & satellite integration',
    period: '2025',
    blurb:
      'Field-level soil suitability, crop recommendations and weather guidance, driven by Sentinel products pulled through STAC and vegetation indices computed per field.',
    did: [
      'Developed field-level geospatial workflows for soil-suitability assessment, crop recommendations and location-specific weather and agricultural guidance through an interactive map.',
      'Integrated Sentinel products through STAC APIs, automated NDVI and NDWI computation for user-defined fields, and fed the indicators into machine-learning models for crop-yield prediction.',
    ],
    figures: [
      { value: 'STAC', label: 'Sentinel ingestion' },
      { value: 'NDVI · NDWI', label: 'per user-drawn field' },
      { value: 'ML', label: 'crop-yield prediction inputs' },
    ],
    stack: ['Sentinel-2', 'STAC API', 'NDVI / NDWI', 'Python', 'Machine learning', 'Web mapping'],
    links: [{ label: 'geofasal.com', href: 'https://www.geofasal.com/' }],
    where: { lon: 73.095, lat: 30.795, label: 'Fields near Sahiwal' },
    media: 'A season of fields, scrubbed by scroll, with per-field crop calendars',
  },
  {
    slug: 'move-smart',
    title: 'Move Smart: heat-aware walking routes for Islamabad',
    short: 'Move Smart (final-year project)',
    client: 'NUST · Final-year design project',
    role: 'Co-developer',
    period: '2024 — 2025',
    blurb:
      'A decision-support system that routes pedestrians by heat exposure, shade, connectivity and accessibility, combining satellite indicators, street-level tree detection and OpenStreetMap networks.',
    did: [
      'Built a Google Earth Engine workflow with Landsat, Sentinel-2 and MODIS to derive vegetation, canopy and land-surface-temperature indicators; found urban heat-island intensity up to 12 °C and r = −0.72 between vegetation and temperature.',
      'Fine-tuned a tree-trunk detection model on 450 annotated images (about 75% mAP), detecting more than 1,200 trees.',
      'Scored road segments for comfort with AHP and PostGIS, served through customised GraphHopper routing with 5–30 minute isochrones in a Next.js, Mapbox GL and FastAPI platform.',
    ],
    figures: [
      { value: '12 °C', label: 'peak urban heat-island intensity' },
      { value: 'r = −0.72', label: 'vegetation vs. surface temperature' },
      { value: '1,200+', label: 'trees detected, ~75% mAP' },
    ],
    stack: ['Google Earth Engine', 'Landsat', 'MODIS', 'PyTorch', 'PostGIS', 'AHP', 'GraphHopper', 'Mapbox GL', 'FastAPI'],
    where: { lon: 73.05, lat: 33.709, label: 'Islamabad' },
    media: 'Land-surface temperature, the vegetation link, comfort-weighted routing and isochrones',
  },
  {
    slug: 'mottainai-recycling',
    title: 'Field GIS and routing for Mottainai Recycling',
    short: 'Mottainai Recycling, Lagos',
    client: 'Upwork · Mottainai Recycling, Nigeria',
    role: 'GIS expert & Kotlin Android specialist',
    period: '2021 — Present',
    blurb:
      'Three Android apps, an ArcGIS Online organisation and a custom routing engine for a recycling company collecting across Lagos, cutting recurring routing costs by at least 28%.',
    did: [
      'Administer Mottainai’s ArcGIS Online organisation and the operational data and services behind customer pickups, driver dispatch and field management.',
      'Developed and deployed three Kotlin Android apps with ArcGIS Maps SDK, ArcGIS Online, Mapbox SDK and device GPS, with offline capture and sync for low-connectivity areas.',
      'Designed a custom GraphHopper multi-stop routing solution that optimises pickup sequences and replaced paid Google Maps and Mapbox routing, cutting recurring routing costs by at least 28%.',
    ],
    figures: [
      { value: '3', label: 'live Android apps on Google Play' },
      { value: '≥28%', label: 'lower recurring routing cost' },
      { value: 'Offline', label: 'capture and sync for field teams' },
    ],
    stack: ['Kotlin', 'ArcGIS Maps SDK', 'ArcGIS Online', 'Mapbox SDK', 'GraphHopper', 'Android'],
    links: [
      { label: 'mottainai.africa', href: 'https://mottainai.africa/' },
      { label: 'Customer app', href: 'https://play.google.com/store/apps/details?id=com.mottainaicustomer' },
      { label: 'Field Manager app', href: 'https://play.google.com/store/apps/details?id=com.tech.mottainaifieldmapapplication' },
      { label: 'Driver app', href: 'https://play.google.com/store/apps/details?id=com.mottainai.driver' },
    ],
    where: null,
    media: 'Multi-stop route optimisation on the Lagos street network',
  },
  {
    slug: 'dha-property-webgis',
    title: 'Spatial property intelligence for DHA',
    short: 'DHA property WebGIS',
    client: 'GISPLUS · DHA Islamabad–Rawalpindi & DHA Lahore',
    role: 'Geospatial functionality, development team',
    period: '2025',
    blurb:
      'Geospatial features for two production Next.js platforms: interactive maps and spatial property discovery tied to verified records, seller dashboards and realtor workflows.',
    did: [
      'As part of the GISPLUS development team, contributed the geospatial functionality for two production Next.js platforms serving DHA Islamabad–Rawalpindi and DHA Lahore.',
      'Integrated interactive mapping and spatial property discovery with verified records, seller dashboards and realtor-management workflows.',
    ],
    figures: [
      { value: '2', label: 'production platforms' },
      { value: 'Verified', label: 'records linked to the map' },
      { value: 'Next.js', label: 'map-first property discovery' },
    ],
    stack: ['Next.js', 'Web mapping', 'Spatial search', 'Dashboards'],
    links: [
      { label: 'DHA Marketplace', href: 'https://dhamarketplace.com/' },
      { label: 'DHA Lahore digital auction', href: 'https://digitalauction.dhalahore.org/' },
    ],
    where: { lon: 74.4005, lat: 31.4735, label: 'DHA Lahore' },
    media: 'A spatial search over real building footprints, in 3D',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
