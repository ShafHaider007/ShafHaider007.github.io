import type { PlateKey } from '@/lib/plates'

export type Project = {
  slug: string
  title: string
  short: string
  client: string
  role: string
  period: string
  plate: PlateKey
  // true when the plate shows a representative landscape, not the project's own output
  context: string
  blurb: string
  sections: { heading: string; body: string }[]
  figures: { value: string; label: string }[]
  stack: string[]
  links?: { label: string; href: string }[]
  compareCaption?: string
}

export const projects: Project[] = [
  {
    slug: 'forest-carbon-activity-data',
    title: 'Forest-carbon activity data for a UNOPS-supported study',
    short: 'Forest-carbon activity data',
    client: 'GISPLUS · UNOPS-supported study',
    role: 'One of five named lead authors · geospatial activity-data lead',
    period: '2025',
    plate: 'galiyat',
    context: 'Representative forested landscape in the study region.',
    blurb:
      'Built the complete activity-data workflow: three epochs of Sentinel-2 classified into 10 m land-cover maps, then turned into forest-disturbance and canopy-density change across four jurisdictions.',
    sections: [
      {
        heading: 'The question',
        body:
          'A forest-carbon study needs activity data it can defend: where forest stood, where it was lost or degraded, and how canopy density changed. The figures feed IPCC-aligned carbon accounting, so every class and every transition has to survive review.',
      },
      {
        heading: 'What I built',
        body:
          'I processed Sentinel-2 imagery for 2016, 2020 and 2024 in Google Earth Engine and QGIS, classified 10 m land use and land cover with Random Forest, and refined classes across years by visual interpretation so that transitions were real rather than classifier noise. Change analysis and spectral unmixing then quantified land-cover transitions, forest disturbance and canopy-density change.',
      },
      {
        heading: 'Outcome',
        body:
          'The outputs were integrated with field inventories and IPCC-aligned carbon accounting, and carried through uncertainty assessment, field verification and stakeholder validation. I am one of five named lead authors on the study.',
      },
    ],
    figures: [
      { value: '3', label: 'Sentinel-2 epochs: 2016, 2020, 2024' },
      { value: '10 m', label: 'LULC resolution' },
      { value: '4', label: 'jurisdictions assessed' },
    ],
    stack: ['Google Earth Engine', 'Sentinel-2', 'Random Forest', 'Spectral unmixing', 'QGIS', 'IPCC accounting'],
    compareCaption: 'True colour against NDVI from the same scene. Canopy density reads directly from the index.',
  },
  {
    slug: 'unccd-2026-national-reporting',
    title: 'UNCCD 2026 national reporting for Pakistan',
    short: 'UNCCD 2026 national reporting',
    client: 'GISPLUS · IUCN Pakistan',
    role: 'GIS expert & geospatial team lead',
    period: '2025 — Present',
    plate: 'cholistan',
    context: 'Desert margin and irrigated land: the kind of boundary land-degradation indicators track.',
    blurb:
      'Leading the GIS and remote-sensing workstream behind Pakistan’s report to the UN Convention to Combat Desertification: land degradation, Land Degradation Neutrality, SDG 15.3.1 and drought.',
    sections: [
      {
        heading: 'Scope',
        body:
          'Pakistan reports to the UNCCD on the state of its land. I lead the geospatial workstream with IUCN Pakistan, coordinating national assessments of land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
      },
      {
        heading: 'How the work runs',
        body:
          'I guide data review, QA/QC and technical documentation so that national figures trace back to the imagery and methods that produced them. SDG 15.3.1 itself combines three sub-indicators, land cover, land productivity and soil organic carbon, and Trends.Earth is the standard toolset for computing them.',
      },
      {
        heading: 'Capacity building',
        body:
          'I delivered provincial workshops for government and technical stakeholders on satellite-based land-degradation assessment and the Trends.Earth workflow, so provinces can reproduce and own the analysis.',
      },
    ],
    figures: [
      { value: 'SDG 15.3.1', label: 'proportion of degraded land' },
      { value: 'LDN', label: 'Land Degradation Neutrality assessment' },
      { value: 'Provincial', label: 'workshops for government stakeholders' },
    ],
    stack: ['Trends.Earth', 'Google Earth Engine', 'QGIS', 'Drought indices', 'QA/QC'],
  },
  {
    slug: 'national-forest-monitoring-system',
    title: 'National Forest Monitoring System of Pakistan',
    short: 'National Forest Monitoring System',
    client: 'GISPLUS',
    role: 'Geospatial data engineering & WebGIS',
    period: '2025',
    plate: 'changamanga',
    context: 'Changa Manga, one of the oldest planted forests in South Asia.',
    blurb:
      'Engineered the Python/GDAL raster pipeline that harmonises national Earth-observation layers, automates QA/QC and publishes optimised tile services into a Next.js WebGIS.',
    sections: [
      {
        heading: 'The platform',
        body:
          'NFMS is Pakistan’s operational platform for accessing and interpreting forest-monitoring, land-cover and climate-reporting information. I worked on it as part of the development team.',
      },
      {
        heading: 'The raster pipeline',
        body:
          'National layers arrive in different projections, resolutions and encodings. The pipeline I engineered in Python and GDAL harmonises inputs, runs automated QA/QC, builds optimised MBTiles and publishes them as tile services, so very large Earth-observation layers load quickly in the browser.',
      },
      {
        heading: 'Front end',
        body:
          'The tiles are integrated into a responsive Next.js WebGIS, where users switch between forest, land-cover and reporting layers without waiting on heavy rasters.',
      },
    ],
    figures: [
      { value: 'GDAL', label: 'harmonisation and QA/QC pipeline' },
      { value: 'MBTiles', label: 'optimised tile services' },
      { value: 'National', label: 'scale forest and land-cover layers' },
    ],
    stack: ['Python', 'GDAL', 'MBTiles', 'Tile services', 'Next.js', 'WebGIS'],
    links: [{ label: 'nfmspak.org', href: 'https://www.nfmspak.org/' }],
  },
  {
    slug: 'geofasal',
    title: 'GeoFasal: field-level agricultural intelligence',
    short: 'GeoFasal agri-tech platform',
    client: 'GISPLUS',
    role: 'Geospatial workflows & satellite integration',
    period: '2025',
    plate: 'punjab',
    context: 'Wheat-season fields in central Punjab.',
    blurb:
      'Field-level soil suitability, crop recommendations and weather guidance, driven by Sentinel products pulled through STAC and vegetation indices computed per field.',
    sections: [
      {
        heading: 'For farmers, per field',
        body:
          'GeoFasal gives growers location-specific soil-suitability assessment, crop recommendations, and weather and agricultural guidance through an interactive map.',
      },
      {
        heading: 'Satellite to model',
        body:
          'I integrated Sentinel products through STAC APIs and automated NDVI and NDWI computation for user-drawn fields. The derived indicators feed machine-learning models for crop-yield prediction.',
      },
    ],
    figures: [
      { value: 'STAC', label: 'Sentinel ingestion' },
      { value: 'NDVI · NDWI', label: 'computed per user field' },
      { value: 'ML', label: 'crop-yield prediction inputs' },
    ],
    stack: ['Sentinel-2', 'STAC API', 'NDVI / NDWI', 'Python', 'Machine learning', 'Web mapping'],
    links: [{ label: 'geofasal.com', href: 'https://www.geofasal.com/' }],
    compareCaption: 'Drag to compare true colour with NDVI. Bright green is actively growing wheat; tan is fallow or built-up.',
  },
  {
    slug: 'move-smart',
    title: 'Move Smart: heat-aware routing for Islamabad',
    short: 'Move Smart (final-year project)',
    client: 'NUST · Final-year design project',
    role: 'Co-developer',
    period: '2024 — 2025',
    plate: 'islamabad',
    context: 'Islamabad, the study area.',
    blurb:
      'A decision-support system that routes pedestrians by shade, heat exposure and accessibility, combining satellite indicators, street-level tree detection and OpenStreetMap networks.',
    sections: [
      {
        heading: 'Heat from space',
        body:
          'A Google Earth Engine workflow on Landsat, Sentinel-2 and MODIS derived vegetation, canopy and land-surface-temperature indicators. It found urban heat-island intensity of up to 12 °C and a strong inverse vegetation–temperature relationship (r = −0.72).',
      },
      {
        heading: 'Trees from the street',
        body:
          'We fine-tuned a tree-trunk detection model on 450 annotated street images, reaching about 75% mAP and detecting more than 1,200 trees to measure shade where satellites cannot see.',
      },
      {
        heading: 'Routes people can walk',
        body:
          'Road segments were scored for comfort with AHP in PostGIS and served through customised GraphHopper routing with 5–30 minute isochrones, in a Next.js, Mapbox GL and FastAPI platform.',
      },
    ],
    figures: [
      { value: '12 °C', label: 'peak urban heat-island intensity' },
      { value: 'r = −0.72', label: 'vegetation vs. surface temperature' },
      { value: '1,200+', label: 'trees detected, ~75% mAP' },
    ],
    stack: ['Google Earth Engine', 'Landsat', 'MODIS', 'PyTorch', 'PostGIS', 'AHP', 'GraphHopper', 'Mapbox GL', 'FastAPI'],
    compareCaption: 'Drag to compare. The Margalla foothills and green belts hold the vegetation that keeps streets cooler.',
  },
  {
    slug: 'mottainai-recycling',
    title: 'Field GIS and routing for Mottainai Recycling',
    short: 'Mottainai Recycling, Nigeria',
    client: 'Upwork · Mottainai Recycling, Lagos',
    role: 'GIS expert & Kotlin Android specialist',
    period: '2021 — Present',
    plate: 'lagos',
    context: 'Lagos, where Mottainai runs its pickup and dispatch operations.',
    blurb:
      'Three Android apps, an ArcGIS Online organisation and a custom routing engine for a recycling company collecting across Lagos, with routing costs down by at least 28%.',
    sections: [
      {
        heading: 'Operational GIS',
        body:
          'I administer Mottainai’s ArcGIS Online organisation and the operational geospatial data and services behind customer pickups, driver dispatch and field management.',
      },
      {
        heading: 'Apps that work offline',
        body:
          'I developed and deployed three Kotlin Android apps with ArcGIS Maps SDK, ArcGIS Online services, Mapbox SDK and device GPS. Offline location capture and synchronisation keep field mapping reliable where connectivity is not.',
      },
      {
        heading: 'Owning the routing',
        body:
          'A custom GraphHopper multi-stop solution optimises pickup sequences for recycling trucks and navigation for field managers, replacing paid Google Maps and Mapbox routing and cutting recurring routing costs by at least 28%.',
      },
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
  },
  {
    slug: 'dha-property-webgis',
    title: 'Spatial property intelligence for DHA',
    short: 'DHA property WebGIS',
    client: 'GISPLUS · DHA Islamabad–Rawalpindi & DHA Lahore',
    role: 'Geospatial functionality, development team',
    period: '2025',
    plate: 'lahore',
    context: 'Eastern Lahore, home to DHA Lahore.',
    blurb:
      'Geospatial features for two production Next.js platforms: interactive maps and spatial property discovery tied to verified records, seller dashboards and realtor workflows.',
    sections: [
      {
        heading: 'What it does',
        body:
          'Buyers find property on the map instead of in a list. Plots link to verified records, and sellers and realtors manage listings through dashboards and realtor-management workflows.',
      },
      {
        heading: 'My part',
        body:
          'As part of the GISPLUS development team I built the geospatial functionality: interactive mapping and spatial property discovery for DHA Islamabad–Rawalpindi and DHA Lahore.',
      },
    ],
    figures: [
      { value: '2', label: 'production platforms' },
      { value: 'Verified', label: 'records linked to parcels' },
      { value: 'Next.js', label: 'map-first property discovery' },
    ],
    stack: ['Next.js', 'Web mapping', 'Spatial search', 'Dashboards'],
    links: [
      { label: 'DHA Marketplace', href: 'https://dhamarketplace.com/' },
      { label: 'DHA Lahore digital auction', href: 'https://digitalauction.dhalahore.org/' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
