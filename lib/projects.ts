export type Project = {
  slug: string
  title: string
  short: string
  client: string
  role: string
  period: string
  /** The question the work answers. */
  question: string
  /** Why the question matters, in two or three plain sentences. */
  why: string
  /** One-paragraph summary for cards. */
  blurb: string
  /** What I did, from the CV. */
  did: string[]
  figures: { value: string; label: string }[]
  stack: string[]
  links?: { label: string; href: string }[]
  /** What the walk-through on the project page shows. */
  media: string
}

export const projects: Project[] = [
  {
    slug: 'forest-carbon-activity-data',
    title: 'How much forest did four jurisdictions lose, and how sure can we be?',
    short: 'JFREL forest-carbon study',
    client: 'GISPLUS · UNOPS-supported study',
    role: 'One of five named lead authors · responsible for all geospatial activity data',
    period: '2025',
    question:
      'How much forest did four jurisdictions lose, degrade or regain between 2016 and 2024, and how certain is that number?',
    why:
      'Under REDD+, a jurisdiction is paid for keeping emissions below its forest reference emission level. That baseline is only as good as the forest-change data behind it. If past loss is overstated, future payments are inflated. If it is understated, real progress goes unrewarded.',
    blurb:
      'A UNOPS-supported study needed a record of forest change across four jurisdictions that could stand up to review. As one of five named lead authors, I produced that record: where forest was lost, degraded or regained, and how certain each figure is.',
    did: [
      'Mapped land cover at 10 m for 2016, 2020 and 2024 and checked the changes between years by visual interpretation.',
      'Measured land-cover transitions, forest disturbance and canopy-density change in four jurisdictions.',
      'Combined the maps with field inventory data for IPCC-based carbon accounting, and supported the uncertainty assessment, field checks and stakeholder review.',
    ],
    figures: [
      { value: '3', label: 'time points: 2016, 2020 and 2024' },
      { value: '10 m', label: 'map resolution' },
      { value: '4', label: 'jurisdictions' },
    ],
    stack: ['Google Earth Engine', 'Sentinel-2', 'Random forest', 'Spectral unmixing', 'QGIS', 'IPCC guidelines'],
    media: 'The method step by step, repeated on a public test area',
  },
  {
    slug: 'unccd-2026-national-reporting',
    title: 'How much of Pakistan’s land is degraded, and where?',
    short: 'UNCCD 2026 national reporting',
    client: 'GISPLUS · IUCN Pakistan',
    role: 'GIS expert and geospatial team lead',
    period: '2025 – present',
    question: 'How much of Pakistan’s land is degraded, where is it, and is the land improving or getting worse?',
    why:
      'Every four years, countries report the share of their land that is degraded to the UN Convention to Combat Desertification. That number shapes national restoration targets and funding. It has to be consistent, repeatable by the provinces, and clear about what the indicator can and cannot see.',
    blurb:
      'I lead the GIS and remote sensing work for Pakistan’s 2026 report to the UNCCD, with IUCN Pakistan: land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
    did: [
      'Lead the GIS and remote sensing work for Pakistan’s UNCCD 2026 national report, with IUCN Pakistan.',
      'Coordinate the national assessments of land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought, including data review, quality checks and technical documentation.',
      'Ran provincial workshops for government and technical staff on satellite-based land degradation assessment with Trends.Earth.',
    ],
    figures: [
      { value: 'SDG 15.3.1', label: 'share of land that is degraded' },
      { value: 'LDN', label: 'Land Degradation Neutrality' },
      { value: 'Provincial', label: 'training workshops' },
    ],
    stack: ['Trends.Earth', 'Google Earth Engine', 'QGIS', 'Drought indices', 'Quality checks'],
    media: 'How the three SDG 15.3.1 measures combine, shown on a test area',
  },
  {
    slug: 'national-forest-monitoring-system',
    title: 'Can national forest data from many sources live on one fast, trusted map?',
    short: 'National Forest Monitoring System',
    client: 'GISPLUS',
    role: 'Geospatial data engineering and web GIS',
    period: '2025',
    question: 'How do you put national forest data from many sources onto one map that loads quickly and can be trusted?',
    why:
      'Forest data in Pakistan comes from many agencies, in different formats and projections. If layers do not line up or take too long to load, people stop using the platform and decisions fall back on old reports.',
    blurb:
      'I built the raster pipeline behind Pakistan’s National Forest Monitoring System: it brings national layers onto one grid, checks them automatically, and turns them into map tiles for the web platform.',
    did: [
      'Worked in the team that built Pakistan’s National Forest Monitoring System, a Next.js platform for forest monitoring, land-cover and climate-reporting data.',
      'Built a Python and GDAL pipeline that aligns input rasters, runs automatic quality checks, packs them as MBTiles and publishes them as tile services for the web map.',
    ],
    figures: [
      { value: 'GDAL', label: 'alignment and quality checks' },
      { value: 'MBTiles', label: 'tile packaging' },
      { value: 'National', label: 'forest and land-cover layers' },
    ],
    stack: ['Python', 'GDAL', 'MBTiles', 'Tile services', 'Next.js', 'Web GIS'],
    links: [{ label: 'nfmspak.org', href: 'https://www.nfmspak.org/' }],
    media: 'The pipeline, a real tile pyramid and a live map built from it',
  },
  {
    slug: 'geofasal',
    title: 'Can free satellite data tell a farmer how each field is doing?',
    short: 'GeoFasal agri-tech platform',
    client: 'GISPLUS',
    role: 'Geospatial workflows and satellite data',
    period: '2025',
    question: 'Can free satellite data follow a crop field by field through a season, well enough to guide a farmer?',
    why:
      'Most farms in Punjab are small, field visits are slow and advice is often general. Sentinel-2 passes every five days at 10 m resolution, which is enough to follow individual fields through a season.',
    blurb:
      'GeoFasal gives farmers field-level advice on soil suitability, crops and weather. I built the satellite side: Sentinel data pulled through STAC, crop indices computed for each field, and inputs for the yield models.',
    did: [
      'Built field-level workflows for soil suitability, crop recommendations and local weather advice in an interactive map.',
      'Brought in Sentinel data through STAC APIs, computed NDVI and NDWI for each user-drawn field, and passed these to machine-learning models that predict yield.',
    ],
    figures: [
      { value: 'STAC', label: 'Sentinel data access' },
      { value: 'NDVI · NDWI', label: 'for each user-drawn field' },
      { value: 'ML', label: 'yield prediction inputs' },
    ],
    stack: ['Sentinel-2', 'STAC API', 'NDVI / NDWI', 'Python', 'Machine learning', 'Web mapping'],
    links: [{ label: 'geofasal.com', href: 'https://www.geofasal.com/' }],
    media: 'One season of fields, scrubbed by scroll, with crop calendars for each field',
  },
  {
    slug: 'move-smart',
    title: 'Can we walk the city on cooler streets without walking much further?',
    short: 'Move Smart (final-year project)',
    client: 'NUST · Final-year design project',
    role: 'Co-developer',
    period: '2024 – 2025',
    question:
      'Can pedestrians in Islamabad be routed along cooler, shadier streets without making the walk much longer?',
    why:
      'Summer heat in Pakistan’s cities is getting worse, and many people walk or wait outside. Navigation apps choose the shortest path, which often follows the hottest roads.',
    blurb:
      'A routing tool that picks walking routes by heat, shade and comfort, using satellite measures of vegetation and surface temperature, trees detected in street photos, and the road network.',
    did: [
      'Built a Google Earth Engine workflow with Landsat, Sentinel-2 and MODIS to map vegetation, canopy and land-surface temperature. Found an urban heat island of up to 12 °C and r = −0.72 between vegetation and temperature.',
      'Trained a tree-trunk detection model on 450 labelled street images (about 75% mAP), detecting more than 1,200 trees.',
      'Scored each road segment for comfort with AHP in PostGIS, and served routes and 5–30 minute walking areas through a customised GraphHopper, in a Next.js, Mapbox GL and FastAPI app.',
    ],
    figures: [
      { value: '12 °C', label: 'strongest urban heat island' },
      { value: 'r = −0.72', label: 'vegetation against surface temperature' },
      { value: '1,200+', label: 'trees detected, about 75% mAP' },
    ],
    stack: ['Google Earth Engine', 'Landsat', 'MODIS', 'PyTorch', 'PostGIS', 'AHP', 'GraphHopper', 'Mapbox GL', 'FastAPI'],
    media: 'Surface heat, the link with vegetation, comfort-weighted routes and walking areas',
  },
  {
    slug: 'mottainai-recycling',
    title: 'How can a recycling company collect from more homes with fewer kilometres?',
    short: 'Mottainai Recycling, Lagos',
    client: 'Upwork · Mottainai Recycling, Nigeria',
    role: 'GIS expert and Android developer',
    period: '2021 – present',
    question: 'How can a recycling company in Lagos collect from more homes with fewer kilometres and lower costs?',
    why:
      'Every extra kilometre costs fuel and time. Paid routing services charge per request, which adds up quickly for a small company running daily pickups.',
    blurb:
      'Three Android apps, an ArcGIS Online setup and a self-hosted routing engine for a recycling company in Lagos. The routing engine cut recurring routing costs by at least 28%.',
    did: [
      'Run Mottainai’s ArcGIS Online organisation and the data and services behind customer pickups, driver dispatch and field management.',
      'Built and released three Kotlin Android apps with ArcGIS Maps SDK, Mapbox SDK and GPS, which record locations offline and sync when a signal returns.',
      'Designed multi-stop routing on a self-hosted GraphHopper engine that orders pickups for trucks and guides field managers. It replaced paid Google Maps and Mapbox routing and cut recurring costs by at least 28%.',
    ],
    figures: [
      { value: '3', label: 'Android apps on Google Play' },
      { value: '≥28%', label: 'lower recurring routing costs' },
      { value: 'Offline', label: 'data capture and sync' },
    ],
    stack: ['Kotlin', 'ArcGIS Maps SDK', 'ArcGIS Online', 'Mapbox SDK', 'GraphHopper', 'Android'],
    links: [
      { label: 'mottainai.africa', href: 'https://mottainai.africa/' },
      { label: 'Customer app', href: 'https://play.google.com/store/apps/details?id=com.mottainaicustomer' },
      { label: 'Field Manager app', href: 'https://play.google.com/store/apps/details?id=com.tech.mottainaifieldmapapplication' },
      { label: 'Driver app', href: 'https://play.google.com/store/apps/details?id=com.mottainai.driver' },
    ],
    media: 'Ordering pickups on the real Lagos street network',
  },
  {
    slug: 'dha-property-webgis',
    title: 'Can people search for property by place instead of by list?',
    short: 'DHA property web GIS',
    client: 'GISPLUS · DHA Islamabad–Rawalpindi and DHA Lahore',
    role: 'Map features, development team',
    period: '2025',
    question: 'How can buyers search for property by location, with each plot linked to a verified record?',
    why:
      'Property records are often kept as lists that ignore location. A map tied to verified records makes it easier to see what is for sale, where it is, and what is nearby.',
    blurb:
      'Map features for two live Next.js property platforms: interactive maps and search by location, linked to verified records, seller dashboards and realtor tools.',
    did: [
      'Worked in the GISPLUS team on two live Next.js platforms for DHA Islamabad–Rawalpindi and DHA Lahore, building the map features.',
      'Connected interactive maps and location search to verified records, seller dashboards and realtor management.',
    ],
    figures: [
      { value: '2', label: 'live platforms' },
      { value: 'Verified', label: 'records linked to the map' },
      { value: 'Next.js', label: 'map-first search' },
    ],
    stack: ['Next.js', 'Web mapping', 'Spatial search', 'Dashboards'],
    links: [
      { label: 'DHA Marketplace', href: 'https://dhamarketplace.com/' },
      { label: 'DHA Lahore digital auction', href: 'https://digitalauction.dhalahore.org/' },
    ],
    media: 'A distance search over real building footprints, in 3D',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
