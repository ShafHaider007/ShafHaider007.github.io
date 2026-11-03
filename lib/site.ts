import { asset } from '@/lib/paths'

export const profile = {
  name: 'Shaf Haider',
  fullName: 'Muhammad Shaf Haider',
  role: 'GIS and remote sensing',
  location: 'Islamabad, Pakistan',
  coords: '33.6844° N, 73.0479° E',
  email: 'shaf.shafheidar@gmail.com',
  cv: asset('/Shaf_Haider_CV.docx'),
  summary:
    'I am a geoinformatics engineer with almost three years of work in GIS and remote sensing. My projects measure how land changes: forests that thin, deserts that turn into farms, cities that get hotter. I am now applying to graduate programs in geography to study these changes as research.',
  current:
    'GIS and remote sensing expert at GISPLUS, Islamabad. I lead the GIS work for Pakistan’s 2026 national report to the UNCCD, with IUCN Pakistan.',
  links: [
    { label: 'LinkedIn', href: 'http://www.linkedin.com/in/shaf-haider-51412b231' },
    { label: 'GitHub', href: 'https://github.com/ShafHaider007' },
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01dd03774d51f241c2?mp_source=share' },
  ],
}

export const facts = [
  { value: 'Almost 3', label: 'years of full-time GIS and remote sensing work', count: true },
  { value: '1 of 5', label: 'named lead authors of a UNOPS-supported forest-carbon study', count: false },
  { value: 'UNCCD 2026', label: 'I lead the GIS work for Pakistan’s national report', count: false },
  { value: '28%', label: 'lower routing costs for a recycling company in Lagos', count: true },
]

/* ---------------- research questions ---------------- */

export type Question = {
  id: 'forest' | 'drylands' | 'heat'
  question: string
  body: string[]
  evidence: string
  project: string
}

export const questions: Question[] = [
  {
    id: 'forest',
    question: 'Are we missing forest degradation in mountain forests?',
    body: [
      'In a test area near Murree, the Hansen Global Forest Change map records about 2 hectares of forest loss between 2019 and 2024. A local classification of the same area shows hundreds of hectares changing between forest and other land, mostly along forest edges.',
      'Global products are built to detect clearing, not slow decline. I want to find out how much degradation they miss in Pakistan’s mountain forests, and how a national forest reference level should deal with that gap.',
    ],
    evidence: 'From the forest-carbon study and its open-data walk-through',
    project: 'forest-carbon-activity-data',
  },
  {
    id: 'drylands',
    question: 'When a desert becomes farmland, is the land improving or degrading?',
    body: [
      'Parts of the Cholistan desert are being turned into irrigated farms. Under the SDG 15.3.1 rules these places show more plant growth and a better land cover, but they lose soil carbon under the default IPCC factors, and one negative result is enough to call the land degraded.',
      'I want to test whether that rule fits dryland Pakistan, using soil samples, water use and long satellite records, and what it means for how countries report land degradation.',
    ],
    evidence: 'From the UNCCD 2026 national reporting work',
    project: 'unccd-2026-national-reporting',
  },
  {
    id: 'heat',
    question: 'How much heat do people actually feel on a walk?',
    body: [
      'In my final-year project, greener streets in Islamabad were clearly cooler: vegetation and surface temperature correlated at r = −0.72. But satellites measure the temperature of surfaces, not the air a person walks through.',
      'I want to connect satellite heat maps to street-level air temperature and shade, so that heat-aware routing and urban planning are based on what people experience.',
    ],
    evidence: 'From the Move Smart final-year project',
    project: 'move-smart',
  },
]

export const outputs = [
  {
    year: '2025',
    title: 'Jurisdictional forest-carbon study, supported by UNOPS',
    detail: 'One of five named lead authors. Produced the land-cover and forest-change data.',
  },
  {
    year: '2026',
    title: 'Pakistan’s national report to the UNCCD',
    detail: 'GIS and remote sensing lead, with IUCN Pakistan. In preparation.',
  },
  {
    year: '2025',
    title: 'Provincial workshops on satellite-based land degradation assessment',
    detail: 'Trained government and technical staff to use the Trends.Earth workflow.',
  },
  {
    year: '2025',
    title: 'Urban mobility and urban microclimate: a live tool for heat-aware urban routes',
    detail: 'Final-year thesis, NUST. Grade A in both parts.',
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
      'Lead the GIS and remote sensing work for Pakistan’s UNCCD 2026 national report, with IUCN Pakistan.',
      'One of five named lead authors of a UNOPS-supported forest-carbon study. I produced all of its land-cover and forest-change data.',
      'Built the raster processing pipeline for Pakistan’s National Forest Monitoring System, and worked on the GeoFasal and DHA web platforms.',
    ],
  },
  {
    org: 'Upwork (Top Rated)',
    orgHref: 'https://www.upwork.com/freelancers/~01dd03774d51f241c2?mp_source=share',
    title: 'GIS expert and developer',
    place: 'Remote',
    period: 'Jun 2021 – present',
    points: [
      'Run the ArcGIS Online setup for Mottainai Recycling in Lagos: customer pickups, drivers and field teams.',
      'Built three Android apps that record locations offline and sync when a signal returns.',
      'Replaced paid routing services with a self-hosted routing engine, cutting routing costs by at least 28%.',
    ],
  },
  {
    org: 'Jugrafiya (Pvt.) Ltd.',
    orgHref: 'https://jugrafiya.com/',
    title: 'Web GIS intern',
    place: 'Rawalpindi',
    period: 'Jun – Sep 2024',
    points: [
      'Led a team of three building 2D and 3D web maps with deck.gl and Kepler.gl.',
      'Tested ways to show large point-cloud, GeoJSON and raster data in the browser.',
      'Built a routing and geofencing app that warns when a route crosses high-risk areas.',
    ],
  },
  {
    org: 'Institute of Geographical Information Systems, NUST',
    title: 'GIS research intern',
    place: 'Islamabad',
    period: 'Jul – Aug 2023',
    points: [
      'Built the web mapping and image-processing parts of an NCGSA-funded IoT project on Dengue and Zika vector monitoring.',
      'Set up GeoServer map services and OpenCV image processing.',
    ],
  },
]

/* ---------------- methods and tools ---------------- */

export const methodColumns = [
  { slug: 'forest-carbon-activity-data', short: 'JFREL' },
  { slug: 'unccd-2026-national-reporting', short: 'UNCCD' },
  { slug: 'national-forest-monitoring-system', short: 'NFMS' },
  { slug: 'geofasal', short: 'GeoFasal' },
  { slug: 'move-smart', short: 'Move Smart' },
  { slug: 'mottainai-recycling', short: 'Mottainai' },
  { slug: 'dha-property-webgis', short: 'DHA' },
]

/** Which methods each project used (from the CV). Values are column indexes into methodColumns. */
export const methods: { name: string; used: number[] }[] = [
  { name: 'Land-cover classification (random forest)', used: [0] },
  { name: 'Change detection and transition analysis', used: [0, 1] },
  { name: 'Spectral unmixing and canopy density', used: [0] },
  { name: 'Accuracy assessment, QA/QC and uncertainty', used: [0, 1, 2] },
  { name: 'Vegetation indices and time series', used: [1, 3, 4] },
  { name: 'Land-surface temperature', used: [4] },
  { name: 'Machine learning for prediction and detection', used: [3, 4] },
  { name: 'Multi-criteria analysis (AHP)', used: [4] },
  { name: 'Network analysis and routing', used: [4, 5] },
  { name: 'Raster pipelines and tiling (GDAL, MBTiles)', used: [2] },
  { name: 'Web mapping platforms', used: [2, 3, 4, 6] },
  { name: 'Mobile field data collection', used: [5] },
]

export const tools = [
  { group: 'Remote sensing', items: ['Google Earth Engine', 'Sentinel-2', 'Landsat', 'MODIS', 'Trends.Earth', 'Collect Earth'] },
  { group: 'GIS', items: ['QGIS', 'ArcGIS Pro', 'ArcGIS Online', 'GRASS GIS', 'GDAL', 'PostGIS', 'GeoPandas'] },
  { group: 'Programming', items: ['Python', 'R', 'JavaScript / TypeScript', 'SQL', 'C++', 'Kotlin'] },
  { group: 'Machine learning', items: ['scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV'] },
  { group: 'Web mapping', items: ['GeoServer', 'Mapbox GL', 'Leaflet', 'OpenLayers', 'Cesium', 'deck.gl', 'GraphHopper'] },
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'AWS', 'FastAPI', 'Next.js', 'Git'] },
]

/* ---------------- education ---------------- */

export const education = {
  school: 'National University of Sciences and Technology (NUST), Islamabad',
  dept: 'School of Civil and Environmental Engineering',
  degree: 'Bachelor of Geoinformatics Engineering',
  period: 'Nov 2021 – Jun 2025',
  awarded: 'Awarded 13 June 2025',
  grade: 'CGPA 3.49 / 4.00',
  thesis:
    'Urban Mobility and Urban Microclimate: A Live Tool for Best Urban Routes in the Wake of Growing Urban Heat Island Phenomena',
  aGrades: [
    'Geography',
    'Digital Mapping and Image Processing',
    'Geosciences',
    'Spatial Databases',
    'Web GIS',
    'Probability and Statistics',
    'Linear Algebra',
    'Numerical Analysis',
    'Data Structures and Algorithms',
    'Fundamentals of Urban Planning',
    'Final Year Project I and II',
  ],
  core: [
    'Introduction to Remote Sensing',
    'Photogrammetry',
    'Spatial Data Analysis',
    'Cartography and Map Production',
    'Geodesy and Map Projections',
    'GIS Programming',
    'Machine Learning',
    'Spatial Decision Support Systems',
  ],
}
