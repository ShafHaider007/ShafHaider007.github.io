/*
 * Project content. Statements about Shaf's role follow the CV wording (public/Shaf_Haider_CV.docx).
 * The walk-through figures on each project page were recomputed for this site from open data; they are not
 * project results, and the page says so.
 */

export type Project = {
  slug: string
  /** Plain descriptive title. */
  title: string
  /** Short name for lists, tables and metadata. */
  short: string
  /** The question the work set out to answer. */
  question: string
  /** Two or three sentences for lists and the page lead. */
  summary: string
  role: string
  /** Organisation and setting. */
  context: string
  /** Dates as far as the sources give them. */
  when?: string
  why: string
  /** Shaf's part, from the CV. */
  did: string[]
  facts: { label: string; value: string }[]
  tools: string[]
  links?: { label: string; href: string }[]
  /**
   * Figure used in lists: the input image (`input`) wipes across to the analysis (`src`) when it comes into view.
   * Images are in public/viz/posters; `labels` name the two layers.
   */
  thumb: { input: string; src: string; labels: [string, string]; alt: string; caption: string }
  /** One line on what the walk-through shows. */
  walkthrough: string
}

const GISPLUS_WHEN = 'While at GISPLUS (June 2025 – present). Project dates are not listed separately.'

export const projects: Project[] = [
  {
    slug: 'forest-carbon-activity-data',
    title: 'Forest-change activity data for a jurisdictional forest-carbon study',
    short: 'Forest-carbon study (JFREL)',
    question:
      'How much forest did four jurisdictions lose, degrade or regain between 2016 and 2024, and how certain are those areas?',
    summary:
      'A UNOPS-supported study needed a record of forest change across four jurisdictions for carbon accounting. As one of five named lead authors, I developed its complete geospatial activity-data workflow: land-cover maps for three years, the changes between them, and canopy-density change inside the forest.',
    role: 'One of five named lead authors. Responsible for the complete geospatial activity-data workflow.',
    context: 'GISPLUS Total Solutions · UNOPS-supported study',
    when: GISPLUS_WHEN,
    why:
      'Under REDD+, results-based payments compare a jurisdiction’s emissions with its forest reference emission level. That baseline is only as good as the forest-change data behind it. If past loss is overstated, later payments are inflated; if it is understated, real progress goes unrecognised.',
    did: [
      'Processed Sentinel-2 imagery for 2016, 2020 and 2024 in Google Earth Engine and QGIS, and produced 10 m land-cover maps with random forest classification and interpretation-based refinement across years.',
      'Measured land-cover transitions, forest disturbance and canopy-density change across four jurisdictions with change analysis and spectral unmixing.',
      'Integrated the results with field inventories and IPCC-aligned carbon accounting, and supported the uncertainty assessment, field verification and stakeholder validation.',
    ],
    facts: [
      { label: 'Years mapped', value: '2016, 2020, 2024' },
      { label: 'Resolution', value: '10 m' },
      { label: 'Area', value: 'Four jurisdictions' },
    ],
    tools: ['Google Earth Engine', 'QGIS', 'Sentinel-2', 'Random forest', 'Spectral unmixing', 'IPCC methods'],
    thumb: {
      input: 'posters/jfrel_a.webp',
      src: 'posters/jfrel_b.webp',
      labels: ['Sentinel-2 composite', 'Classified land cover'],
      alt: 'Land-cover map of hills near Murree: dense forest in dark green, open forest in mid green, shrub and grass in olive, cropland in yellow and built-up land in red.',
      caption: 'Sentinel-2 image and the land-cover map classified from it, 2024, open-data test area near Murree. Made for this site; not study results.',
    },
    walkthrough: 'The method step by step, repeated on an open-data test area near Murree.',
  },
  {
    slug: 'unccd-2026-national-reporting',
    title: 'Land degradation assessment for Pakistan’s 2026 UNCCD reporting',
    short: 'UNCCD 2026 national reporting',
    question: 'How much of Pakistan’s land is degraded, where is it, and is it getting better or worse?',
    summary:
      'I lead the GIS and remote sensing workstream of GISPLUS’s support to IUCN Pakistan for the 2026 national reporting to the UN Convention to Combat Desertification. The work covers land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
    role: 'GIS expert and geospatial team lead',
    context: 'GISPLUS Total Solutions · support to IUCN Pakistan',
    when: 'Ongoing, while at GISPLUS (June 2025 – present).',
    why:
      'Countries report to the UNCCD every four years on the share of their land that is degraded. The figure is used to set and track Land Degradation Neutrality targets, so it has to be consistent, repeatable by the provinces, and clear about what the indicator can and cannot see.',
    did: [
      'Lead the GIS and remote sensing workstream, coordinating the national assessments of land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
      'Guide data review, quality checks and technical documentation.',
      'Took part in and delivered provincial workshops for government and technical stakeholders on satellite-based land degradation assessment and the Trends.Earth workflow.',
    ],
    facts: [
      { label: 'Indicator', value: 'SDG 15.3.1' },
      { label: 'Also covers', value: 'Land Degradation Neutrality, drought' },
      { label: 'Partner', value: 'IUCN Pakistan' },
    ],
    tools: ['SDG 15.3.1 methods', 'Trends.Earth', 'Quality checks'],
    thumb: {
      input: 'posters/unccd_a.webp',
      src: 'posters/unccd_b.webp',
      labels: ['Sentinel-2, 2024', 'SDG 15.3.1 status'],
      alt: 'Map of a desert-edge area in Cholistan with degraded land in red, improved land in teal and stable land in pale grey.',
      caption: 'Sentinel-2 image and the SDG 15.3.1 status for 2017–2024, open-data test area in Cholistan. Made for this site; not Pakistan’s reported figures.',
    },
    walkthrough: 'How the three SDG 15.3.1 measures combine, shown on an open-data test area in Cholistan.',
  },
  {
    slug: 'national-forest-monitoring-system',
    title: 'Raster pipeline for Pakistan’s National Forest Monitoring System',
    short: 'National Forest Monitoring System',
    question: 'How can national forest layers from many sources be checked and served on one map that loads quickly?',
    summary:
      'Pakistan’s National Forest Monitoring System is a web platform for forest-monitoring, land-cover and climate-reporting information. As part of the development team, I engineered a Python and GDAL raster pipeline that harmonises the input layers, runs automatic quality checks and publishes them as map tiles.',
    role: 'Geospatial data engineering and web GIS development, as part of the development team',
    context: 'GISPLUS Total Solutions',
    when: GISPLUS_WHEN,
    why:
      'Forest data come from many sources, in different formats, projections and cell sizes. If layers do not line up, or take too long to load, the platform is hard to use and harder to trust.',
    did: [
      'Contributed, as part of the development team, to building the platform in Next.js.',
      'Engineered a Python and GDAL raster pipeline that harmonises inputs, automates quality checks, creates optimised MBTiles, publishes tile services and brings large Earth-observation layers into the web map.',
    ],
    facts: [
      { label: 'Pipeline', value: 'Python, GDAL' },
      { label: 'Output', value: 'MBTiles, tile services' },
      { label: 'Platform', value: 'Next.js' },
    ],
    tools: ['Python', 'GDAL', 'MBTiles', 'Tile services', 'Next.js'],
    links: [{ label: 'nfmspak.org', href: 'https://www.nfmspak.org/' }],
    thumb: {
      input: 'posters/nfms_a.webp',
      src: 'posters/nfms_b.webp',
      labels: ['Relief tiles', 'Relief + forest tiles'],
      alt: 'Shaded relief of northern Pakistan with forest cover in green along the Himalayan foothills.',
      caption: 'Relief tiles, then relief with forest tiles, built from open national layers for this site.',
    },
    walkthrough: 'The pipeline steps, a real tile pyramid and a live map built from open national layers.',
  },
  {
    slug: 'geofasal',
    title: 'Field-level satellite data for the GeoFasal agriculture platform',
    short: 'GeoFasal',
    question: 'Can free satellite data follow individual fields through a season well enough to support advice to farmers?',
    summary:
      'GeoFasal gives field-level guidance on soil suitability, crops and weather through an interactive map. I developed the geospatial workflows: Sentinel data through STAC APIs, NDVI and NDWI for each field a user draws, and these indicators as inputs to machine-learning models for crop-yield prediction.',
    role: 'Geospatial workflows and satellite data integration',
    context: 'GISPLUS Total Solutions',
    when: GISPLUS_WHEN,
    why:
      'Many farms in Punjab are small, and field visits are slow. Sentinel-2 images the same place about every five days at 10 m resolution, which is enough to follow individual fields through a season.',
    did: [
      'Developed field-level workflows for soil-suitability assessment, crop recommendations and location-specific weather and agricultural guidance in an interactive map.',
      'Integrated Sentinel satellite products through STAC APIs, automated NDVI and NDWI for user-defined fields, and used these indicators as inputs to machine-learning models for crop-yield prediction.',
    ],
    facts: [
      { label: 'Data', value: 'Sentinel, through STAC APIs' },
      { label: 'Indices', value: 'NDVI, NDWI' },
      { label: 'Used for', value: 'Inputs to yield models' },
    ],
    tools: ['Sentinel-2', 'STAC APIs', 'NDVI and NDWI', 'Machine learning', 'Interactive mapping'],
    links: [{ label: 'geofasal.com', href: 'https://www.geofasal.com/' }],
    thumb: {
      input: 'posters/geofasal_a.webp',
      src: 'posters/geofasal_b.webp',
      labels: ['True colour', 'NDVI + field boundaries'],
      alt: 'NDVI map of small farm fields near Sahiwal, from pale yellow for bare soil to dark green for dense crops, with field outlines.',
      caption: 'True colour, then NDVI with field outlines, at the peak of the 2024–25 winter season near Sahiwal. Made for this site.',
    },
    walkthrough: 'One winter season of fields near Sahiwal, with an NDVI curve for each field.',
  },
  {
    slug: 'move-smart',
    title: 'Move Smart: heat-aware walking routes for Islamabad',
    short: 'Move Smart (final-year design project)',
    question:
      'Can pedestrians in Islamabad be routed along cooler, shadier streets without making the walk much longer?',
    summary:
      'A decision-support system, co-developed as my final-year design project, that suggests walking routes by heat exposure, shade, connectivity and accessibility. It combines satellite imagery, street-level observations, cadastral data and the OpenStreetMap road network.',
    role: 'Co-developer (group project)',
    context: 'NUST · Final-year design project, Bachelor of Geoinformatics Engineering',
    when: '2024 – 2025',
    why:
      'Summer heat in Pakistan’s cities is a growing risk for people who walk or wait outside. Navigation apps choose the shortest path, which often follows the hottest roads.',
    did: [
      'Built a Google Earth Engine workflow with Landsat, Sentinel-2 and MODIS to derive vegetation, canopy and land-surface temperature indicators. Found an urban heat island of up to 12 °C and an inverse relationship between vegetation and temperature (r = −0.72).',
      'Calculated comfort scores for road segments with AHP and PostGIS.',
      'Fine-tuned a tree-trunk detection model on 450 annotated images (about 75% mAP), which detected more than 1,200 trees.',
      'Integrated the results with customised GraphHopper routing and 5–30 minute walking isochrones in a Next.js, Mapbox GL, FastAPI and PostGIS platform.',
    ],
    facts: [
      { label: 'Urban heat island', value: 'Up to 12 °C' },
      { label: 'Vegetation and temperature', value: 'r = −0.72' },
      { label: 'Trees detected', value: '1,200+ (about 75% mAP)' },
    ],
    tools: ['Google Earth Engine', 'Landsat', 'Sentinel-2', 'MODIS', 'AHP', 'PostGIS', 'GraphHopper', 'Next.js', 'Mapbox GL', 'FastAPI'],
    thumb: {
      input: 'posters/movesmart_a.webp',
      src: 'posters/movesmart_b.webp',
      labels: ['True colour', 'Surface temperature + routes'],
      alt: 'Land-surface temperature over part of Islamabad, from blue for cooler to orange for hotter, with the shortest walking route in black and a cooler alternative in green.',
      caption: 'True colour, then surface temperature with two walking routes, Islamabad, recomputed for this site from Landsat 8 (27 June 2019).',
    },
    walkthrough: 'Surface heat, its link with vegetation, comfort-weighted routes and walking areas, recomputed from open data.',
  },
  {
    slug: 'mottainai-recycling',
    title: 'GIS, field apps and routing for Mottainai Recycling',
    short: 'Mottainai Recycling, Nigeria',
    question: 'How can a recycling company collect from more homes with fewer kilometres and lower routing costs?',
    summary:
      'For Mottainai Recycling in Nigeria, I administered the ArcGIS Online organisation, built three Android apps for customers, drivers and field managers, and designed multi-stop routing on a self-hosted engine. The routing cut recurring routing costs by at least 28%.',
    role: 'Kotlin Android app specialist and GIS expert (freelance)',
    context: 'Freelance through Upwork · Mottainai Recycling, Nigeria',
    why:
      'Every extra kilometre costs fuel and time, and paid routing services charge per request, which adds up for daily pickups.',
    did: [
      'Administered Mottainai’s ArcGIS Online organisation and the geospatial data and services behind customer pickups, driver dispatch and field management.',
      'Developed and deployed three Kotlin Android apps with the ArcGIS Maps SDK, ArcGIS Online services, Mapbox SDK and device GPS, with offline location capture and sync for areas with weak connectivity.',
      'Designed a custom GraphHopper multi-stop routing solution that orders pickups for recycling trucks and guides field managers. It reduced reliance on paid Google Maps and Mapbox routing and cut recurring routing costs by at least 28%.',
    ],
    facts: [
      { label: 'Apps', value: 'Three, on Google Play' },
      { label: 'Routing costs', value: 'At least 28% lower' },
      { label: 'Field data', value: 'Offline capture and sync' },
    ],
    tools: ['Kotlin', 'ArcGIS Maps SDK', 'ArcGIS Online', 'Mapbox SDK', 'GraphHopper'],
    links: [
      { label: 'mottainai.africa', href: 'https://mottainai.africa/' },
      { label: 'Customer app (Google Play)', href: 'https://play.google.com/store/apps/details?id=com.mottainaicustomer' },
      { label: 'Field Manager app (Google Play)', href: 'https://play.google.com/store/apps/details?id=com.tech.mottainaifieldmapapplication' },
      { label: 'Driver app (Google Play)', href: 'https://play.google.com/store/apps/details?id=com.mottainai.driver' },
    ],
    thumb: {
      input: 'posters/mottainai_a.webp',
      src: 'posters/mottainai_b.webp',
      labels: ['Street network', 'Optimised pickup route'],
      alt: 'Street map with a depot, fourteen example pickup stops and the shortest route linking them drawn in red.',
      caption: 'Street network, then the shortest pickup route through random example stops, Lagos. Made for this site.',
    },
    walkthrough: 'Ordering pickups on a real street network in Lagos, with random example stops.',
  },
  {
    slug: 'dha-property-webgis',
    title: 'Map features for two DHA property platforms',
    short: 'DHA property web GIS',
    question: 'How can buyers search for property by location, with each plot linked to a verified record?',
    summary:
      'As part of the GISPLUS development team, I contributed to the geospatial features of two production Next.js platforms for DHA Islamabad–Rawalpindi and DHA Lahore: interactive maps and spatial property search, linked to verified records, seller dashboards and realtor management.',
    role: 'Geospatial features, as part of the development team',
    context: 'GISPLUS Total Solutions · DHA Islamabad–Rawalpindi and DHA Lahore',
    when: GISPLUS_WHEN,
    why:
      'Property records are often kept as lists without location. A map tied to verified records makes it easier to see what is for sale, where it is and what is nearby.',
    did: [
      'Contributed to the geospatial functionality of two production Next.js platforms serving DHA Islamabad–Rawalpindi and DHA Lahore.',
      'Integrated interactive mapping and spatial property discovery with verified records, seller dashboards and realtor-management workflows.',
    ],
    facts: [
      { label: 'Platforms', value: 'Two, in production' },
      { label: 'Framework', value: 'Next.js' },
      { label: 'Data', value: 'Verified property records' },
    ],
    tools: ['Next.js', 'Interactive mapping', 'Spatial search'],
    links: [
      { label: 'DHA Marketplace', href: 'https://dhamarketplace.com/' },
      { label: 'DHA Lahore digital auction', href: 'https://digitalauction.dhalahore.org/' },
    ],
    thumb: {
      input: 'posters/dha_a.webp',
      src: 'posters/dha_b.webp',
      labels: ['Footprints', 'Extruded in 3D'],
      alt: 'Three-dimensional view of building footprints in a DHA Lahore neighbourhood, drawn as grey blocks along a street grid.',
      caption: 'Open building footprints in DHA Lahore, then extruded in 3D. Made for this site; not DHA’s records.',
    },
    walkthrough: 'A distance search over open building footprints in DHA Lahore, in 3D.',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
