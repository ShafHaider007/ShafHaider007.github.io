import { asset } from '@/lib/paths'

/*
 * Every statement about Shaf on this site comes from one of three sources:
 *   CV  = public/Shaf_Haider_CV.docx (the PDF is generated from it)
 *   TR  = NUST undergraduate transcript, issued 30 October 2025
 *   SH  = what Shaf has said directly
 * Comments name the source. Text in [NEEDS REAL CONTENT: …] is missing information that only Shaf can supply.
 */

export const NEEDS = '[NEEDS REAL CONTENT'
export const isPlaceholder = (s?: string) => !!s && s.includes(NEEDS)

export const profile = {
  name: 'Shaf Haider', // CV header
  fullName: 'Muhammad Shaf Haider', // TR
  role: 'GIS and remote sensing expert', // CV: "GIS & RS Expert"
  employer: 'GISPLUS Total Solutions (Pvt.) Ltd.',
  employerShort: 'GISPLUS',
  employerHref: 'https://www.gisplus.net/', // CV hyperlink
  since: 'June 2025', // CV
  location: 'Islamabad, Pakistan', // CV
  email: 'shaf.shafheidar@gmail.com', // CV
  degree: 'Bachelor of Geoinformatics Engineering', // TR
  university: 'National University of Sciences and Technology (NUST)', // TR
  cvPdf: asset('/Shaf_Haider_CV.pdf'),
  cvDocx: asset('/Shaf_Haider_CV.docx'),
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaf-haider-51412b231' }, // CV hyperlink
    { label: 'GitHub', href: 'https://github.com/ShafHaider007' }, // CV hyperlink
  ],
}

/** Two-sentence statement used on the home page and in metadata. */
export const statement = [
  // SH: "BE geoinformatics Engr and almost 3 years of experience working in the GIS industry"; SH: applying to geography programs
  'I am a geoinformatics engineer in Islamabad with almost three years of experience in the GIS industry. My work measures how land changes, and how sure we can be of the measurement: forest loss and degradation, land degradation in drylands, and heat in cities.',
  'I am applying to graduate programs in geography to study these questions as research.',
]

/* ---------------- research interests ---------------- */

export type Interest = {
  id: 'forest' | 'drylands' | 'heat'
  question: string
  /** What Shaf has done that led to the question (from the CV). */
  background: string
  /** Why the question is open. General knowledge, no claims about Shaf. */
  gap: string
  /** What Shaf would like to study. A plan, not a result. */
  aim: string
  /** Two sentences that stand on their own, for the home page. */
  summary: string
  /** Possible approach, stated as a plan. */
  approach: string
  project: string
  projectLabel: string
}

export const interests: Interest[] = [
  {
    id: 'forest',
    question: 'How much forest degradation goes undetected in Pakistan’s mountain forests?',
    background:
      // CV: UNOPS study bullets
      'In a UNOPS-supported forest-carbon study, I developed the activity data: the areas of forest lost, degraded or regained in four jurisdictions, from 10 m Sentinel-2 land-cover maps for 2016, 2020 and 2024, change analysis and spectral unmixing.',
    gap:
      'Clearing is comparatively easy to map. Degradation, where the canopy thins but the forest remains, changes only part of each pixel. Global products such as Hansen Global Forest Change are designed to detect stand-replacing loss, not gradual thinning.',
    aim:
      'I want to measure how much degradation these maps miss in Pakistan’s mountain forests, what it means for carbon estimates, and how a forest reference level can account for it with a stated uncertainty.',
    summary:
      'Global forest-change maps are built to detect clearing, not thinning. I want to measure how much degradation they miss in Pakistan’s mountain forests, and what that means for carbon estimates.',
    approach:
      'Compare canopy-density change from spectral unmixing with field plots and very high resolution imagery, and estimate degraded area from a stratified reference sample rather than from pixel counts.',
    project: 'forest-carbon-activity-data',
    projectLabel: 'Forest-carbon study',
  },
  {
    id: 'drylands',
    question: 'When irrigation turns desert into farmland, is the land improving or degrading?',
    background:
      // CV: UNCCD 2026 bullets
      'I lead the GIS and remote sensing workstream of GISPLUS’s support to IUCN Pakistan for the 2026 national reporting to the UNCCD, which includes SDG Indicator 15.3.1, the share of land that is degraded.',
    gap:
      'The indicator combines three measures: plant productivity, land cover and soil organic carbon. Land counts as degraded if any one of them declines. New irrigated farms in the Cholistan desert raise productivity and change the land cover, but soil carbon is usually estimated from the land-cover change with default factors, so the final result depends on how that conversion is scored.',
    aim:
      'I want to test these defaults against field evidence, and find out whether the indicator describes land condition fairly when deserts are irrigated.',
    summary:
      'Whether SDG 15.3.1 scores new irrigated farms in the desert as improved or degraded depends on default soil-carbon factors. I want to test those defaults against field evidence.',
    approach:
      'Combine soil samples, water data and long satellite records for new and old farmland at the desert edge, and compare the indicator under different scoring choices.',
    project: 'unccd-2026-national-reporting',
    projectLabel: 'UNCCD 2026 reporting',
  },
  {
    id: 'heat',
    question: 'How well do satellite heat maps describe the heat people feel on the street?',
    background:
      // CV: Move Smart bullets (group project: "Co-developed")
      'In Move Smart, my final-year design project, we built a tool that routes pedestrians in Islamabad along cooler, shadier streets. Vegetation and land-surface temperature were strongly related (r = −0.72), and the urban heat island reached 12 °C.',
    gap:
      'Satellites measure the temperature of surfaces, not of the air a person walks through, and they see the tops of trees rather than the shade beneath them.',
    aim:
      'I want to connect satellite heat maps with street-level measurements of air temperature and shade, so that heat-aware routing and planning rest on what people experience.',
    summary:
      'Satellites measure the temperature of surfaces, not the air people walk through. I want to connect satellite heat maps with street-level measurements of air temperature and shade.',
    approach:
      'Pair walking transects with portable temperature and humidity sensors against Landsat and other thermal data, and model the difference with street geometry and tree cover.',
    project: 'move-smart',
    projectLabel: 'Move Smart',
  },
]

/* ---------------- outputs ---------------- */

export type Output = {
  kind: string
  title: string
  /** Author line; Shaf's name is shown as in the CV. */
  authors?: string
  year: string
  status: string
  where?: string
  detail: string
  link?: { label: string; href: string }
}

export const outputs: Output[] = [
  {
    kind: 'Study report',
    title: '[NEEDS REAL CONTENT: exact title of the UNOPS-supported forest-carbon study report]',
    authors: 'Shaf Haider is one of five named lead authors. [NEEDS REAL CONTENT: full author list in published order]',
    year: '[NEEDS REAL CONTENT: year of the report]',
    status: '[NEEDS REAL CONTENT: whether the report is published or internal, and where it can be read]',
    where: 'Supported by UNOPS. Prepared at GISPLUS Total Solutions.',
    detail:
      'Developed the complete geospatial activity-data workflow: 10 m land-cover maps for 2016, 2020 and 2024, land-cover transitions, forest disturbance and canopy-density change across four jurisdictions.',
    link: { label: 'Forest-carbon study case study', href: '/projects/forest-carbon-activity-data/' },
  },
  {
    kind: 'National reporting (contribution)',
    title: 'Pakistan’s 2026 national reporting to the UNCCD',
    year: '2026',
    status: '[NEEDS REAL CONTENT: current status, for example in preparation or submitted]',
    where: 'GISPLUS Total Solutions, supporting IUCN Pakistan.',
    detail:
      'GIS expert and geospatial team lead for the assessments of land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
    link: { label: 'UNCCD 2026 reporting case study', href: '/projects/unccd-2026-national-reporting/' },
  },
  {
    kind: 'Workshops',
    title: 'Provincial workshops on satellite-based land degradation assessment and the Trends.Earth workflow',
    year: '[NEEDS REAL CONTENT: dates]',
    status: 'Delivered',
    where: '[NEEDS REAL CONTENT: provinces and organisers]',
    detail: 'Took part in and delivered workshops for government and technical stakeholders.',
  },
  {
    kind: 'Final-year design project',
    title:
      'Urban Mobility and Urban Microclimate: A Live Tool for Best Urban Routes in the Wake of Growing Urban Heat Island Phenomena',
    year: '2025',
    status: 'Completed. Grade A in Final Year Design Project I and II.',
    where: 'Bachelor of Geoinformatics Engineering, NUST, Islamabad. Group project.',
    detail:
      'A decision-support system that routes pedestrians by heat exposure, shade, connectivity and accessibility, presented on this site as Move Smart.',
    link: { label: 'Move Smart case study', href: '/projects/move-smart/' },
  },
]

/** Live platforms and apps Shaf contributed to (CV hyperlinks). */
export const platforms = [
  { name: 'National Forest Monitoring System', href: 'https://www.nfmspak.org/', host: 'nfmspak.org', project: 'national-forest-monitoring-system' },
  { name: 'GeoFasal', href: 'https://www.geofasal.com/', host: 'geofasal.com', project: 'geofasal' },
  { name: 'DHA Marketplace (DHA Islamabad–Rawalpindi)', href: 'https://dhamarketplace.com/', host: 'dhamarketplace.com', project: 'dha-property-webgis' },
  { name: 'DHA Lahore digital auction', href: 'https://digitalauction.dhalahore.org/', host: 'digitalauction.dhalahore.org', project: 'dha-property-webgis' },
  {
    name: 'Mottainai – Waste & Recycling (Android)',
    href: 'https://play.google.com/store/apps/details?id=com.mottainaicustomer',
    host: 'Google Play',
    project: 'mottainai-recycling',
  },
  {
    name: 'Mottainai Field Manager (Android)',
    href: 'https://play.google.com/store/apps/details?id=com.tech.mottainaifieldmapapplication',
    host: 'Google Play',
    project: 'mottainai-recycling',
  },
  {
    name: 'Mottainai Driver (Android)',
    href: 'https://play.google.com/store/apps/details?id=com.mottainai.driver',
    host: 'Google Play',
    project: 'mottainai-recycling',
  },
]

/* ---------------- experience ---------------- */

export type Role = {
  org: string
  orgHref?: string
  title: string
  place: string
  period: string
  points: string[]
}

export const experience: Role[] = [
  {
    org: 'GISPLUS Total Solutions (Pvt.) Ltd.',
    orgHref: 'https://www.gisplus.net/',
    title: 'GIS and remote sensing expert',
    place: 'Islamabad',
    period: 'Jun 2025 – present',
    points: [
      'GIS expert and geospatial team lead on GISPLUS’s support to IUCN Pakistan for Pakistan’s UNCCD 2026 national reporting: land degradation, Land Degradation Neutrality, SDG Indicator 15.3.1 and drought.',
      'One of five named lead authors of a UNOPS-supported forest-carbon study. Developed its complete geospatial activity-data workflow.',
      'Engineered a Python and GDAL raster pipeline for Pakistan’s National Forest Monitoring System, and contributed to the geospatial features of the GeoFasal and DHA platforms.',
    ],
  },
  {
    org: 'Upwork, freelance (Top Rated)',
    orgHref: 'https://www.upwork.com/freelancers/~01dd03774d51f241c2?mp_source=share',
    title: 'GIS expert and full-stack GIS developer',
    place: 'Remote',
    period: 'Jun 2021 – present',
    points: [
      'For Mottainai Recycling, Nigeria, administered the ArcGIS Online organisation behind customer pickups, driver dispatch and field management.',
      'Developed and released three Kotlin Android apps with offline location capture and sync.',
      'Designed multi-stop routing on a self-hosted GraphHopper engine, which cut recurring routing costs by at least 28%.',
    ],
  },
  {
    org: 'Jugrafiya (Pvt.) Ltd.',
    orgHref: 'https://jugrafiya.com/',
    title: 'Web GIS intern',
    place: 'Rawalpindi',
    period: 'Jun – Sep 2024',
    points: [
      'Led a team of three developers building 2D and 3D web maps with React, deck.gl, Kepler.gl and loaders.gl.',
      'Researched and implemented ways to render large point-cloud, GeoJSON and raster datasets in the browser.',
      'Built a routing and geofencing app with OpenStreetMap and GraphHopper that warns when a route crosses high-traffic or high-crime zones.',
    ],
  },
  {
    org: 'Institute of Geographical Information Systems (IGIS), NUST',
    title: 'GIS research intern',
    place: 'Islamabad',
    period: 'Jul – Aug 2023',
    points: [
      'Developed web GIS and computer-vision parts of an NCGSA-funded IoT research project on Dengue and Zika vector monitoring.',
      'Set up GeoServer map services and OpenCV image processing during a six-week internship.',
    ],
  },
]

/* ---------------- methods and tools ---------------- */

export const methodColumns = [
  { slug: 'forest-carbon-activity-data', short: 'Forest carbon' },
  { slug: 'unccd-2026-national-reporting', short: 'UNCCD' },
  { slug: 'national-forest-monitoring-system', short: 'NFMS' },
  { slug: 'geofasal', short: 'GeoFasal' },
  { slug: 'move-smart', short: 'Move Smart' },
  { slug: 'mottainai-recycling', short: 'Mottainai' },
  { slug: 'dha-property-webgis', short: 'DHA' },
]

/** Methods each project used, as stated in the CV. Values are column indexes into methodColumns. */
export const methods: { name: string; used: number[] }[] = [
  { name: 'Land-cover classification (random forest)', used: [0] },
  { name: 'Change analysis and land-cover transitions', used: [0] },
  { name: 'Spectral unmixing and canopy density', used: [0] },
  { name: 'Carbon accounting with IPCC methods', used: [0] },
  { name: 'Land degradation and drought assessment (SDG 15.3.1)', used: [1] },
  { name: 'Accuracy, uncertainty and quality checks', used: [0, 1, 2] },
  { name: 'Vegetation and water indices (NDVI, NDWI)', used: [3, 4] },
  { name: 'Land-surface temperature', used: [4] },
  { name: 'Machine learning for prediction and detection', used: [3, 4] },
  { name: 'Multi-criteria analysis (AHP)', used: [4] },
  { name: 'Network analysis and routing', used: [4, 5] },
  { name: 'Raster pipelines and tiling (GDAL, MBTiles)', used: [2] },
  { name: 'Web mapping platforms', used: [2, 3, 4, 6] },
  { name: 'Mobile field data collection', used: [5] },
]

/** Tools grouped as in the CV's technical skills section. */
export const tools = [
  { group: 'Remote sensing', items: ['Google Earth Engine', 'Sentinel-2', 'Landsat', 'MODIS', 'Trends.Earth', 'Open Foris Collect Earth'] },
  { group: 'GIS and spatial analysis', items: ['QGIS', 'ArcGIS and ArcGIS Enterprise', 'ArcGIS Online', 'GRASS GIS', 'GDAL', 'GeoPandas', 'PostGIS'] },
  { group: 'Web GIS', items: ['GeoServer', 'MapServer', 'GeoNode', 'Mapbox GL', 'Leaflet', 'OpenLayers', 'Cesium', 'Kepler.gl', 'MBTiles'] },
  { group: 'Programming', items: ['Python', 'JavaScript and TypeScript', 'R', 'C++', 'Kotlin'] },
  { group: 'Machine learning', items: ['scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV'] },
  { group: 'Applications and infrastructure', items: ['React', 'Next.js', 'FastAPI', 'Django REST Framework', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'Git'] },
]

/* ---------------- education (TR, CV) ---------------- */

export const education = {
  school: 'National University of Sciences and Technology (NUST), Islamabad',
  dept: 'School of Civil and Environmental Engineering',
  degree: 'Bachelor of Geoinformatics Engineering',
  period: 'November 2021 – June 2025',
  awarded: '13 June 2025',
  grade: '3.49 / 4.00',
  project:
    'Urban Mobility and Urban Microclimate: A Live Tool for Best Urban Routes in the Wake of Growing Urban Heat Island Phenomena',
  aGrades: [
    'Geography',
    'Digital Mapping and Image Processing',
    'Geosciences',
    'Spatial Databases',
    'Web GIS',
    'Fundamentals of Urban Planning',
    'Probability and Statistics',
    'Linear Algebra',
    'Numerical Analysis',
    'Data Structures and Algorithms',
    'Final Year Design Project I and II',
  ],
  core: [
    'Introduction to Remote Sensing',
    'Introduction to GIS',
    'Photogrammetry',
    'Spatial Data Analysis',
    'Cartography and Map Production',
    'Geodesy and Map Projections',
    'GIS Programming',
    'Machine Learning',
    'Spatial Decision Support Systems',
  ],
}

/* ---------------- data credits ---------------- */

/** Credit lines for every dataset used in the figures. */
export const credits = [
  'Contains modified Copernicus Sentinel data (2017–2025), processed for this site.',
  'Landsat 8 data courtesy of the U.S. Geological Survey.',
  'ESA WorldCover 2021 © ESA WorldCover project, CC BY 4.0.',
  'Hansen/UMD/Google/USGS/NASA Global Forest Change 2000–2024 (Hansen et al., 2013, Science 342: 850–853), CC BY 4.0.',
  'Copernicus DEM GLO-90 © DLR e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European Union and ESA.',
  'Streets and buildings from Overture Maps Foundation (release 2026-10-21.0), which includes data © OpenStreetMap contributors (ODbL) and other open sources listed by Overture.',
]
