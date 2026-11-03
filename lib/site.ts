import { asset } from '@/lib/paths'

export const profile = {
  name: 'Shaf Haider',
  role: 'GIS & Remote Sensing Specialist',
  location: 'Islamabad, Pakistan',
  coords: '33.6844° N, 73.0479° E',
  email: 'shaf.shafheidar@gmail.com',
  cv: asset('/Shaf_Haider_CV.docx'),
  summary:
    'I turn satellite imagery into national-scale evidence: land-cover and forest-change datasets, land-degradation reporting, raster pipelines and the WebGIS platforms that put them in front of decision-makers.',
  links: [
    { label: 'LinkedIn', href: 'http://www.linkedin.com/in/shaf-haider-51412b231' },
    { label: 'GitHub', href: 'https://github.com/ShafHaider007' },
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01dd03774d51f241c2?mp_source=share' },
  ],
}

export const facts = [
  { value: '3+', label: 'years delivering Earth-observation and WebGIS work' },
  { value: '1 of 5', label: 'named lead authors, UNOPS-supported forest-carbon study' },
  { value: 'UNCCD 2026', label: 'geospatial team lead for Pakistan’s national reporting' },
  { value: '28%', label: 'routing-cost reduction for a recycling fleet in Nigeria' },
]

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
    title: 'GIS & RS Expert',
    place: 'Islamabad',
    period: 'Jun 2025 — Present',
    points: [
      'Leads the GIS and remote-sensing workstream for Pakistan’s UNCCD 2026 national reporting with IUCN Pakistan.',
      'One of five named lead authors on a UNOPS-supported forest-carbon study; built its complete activity-data workflow.',
      'Engineered the raster pipeline behind Pakistan’s National Forest Monitoring System and contributed to GeoFasal and DHA property platforms.',
    ],
  },
  {
    org: 'Upwork — Top Rated',
    orgHref: 'https://www.upwork.com/freelancers/~01dd03774d51f241c2?mp_source=share',
    title: 'GIS Expert & Full-Stack GIS Developer',
    place: 'Remote',
    period: 'Jun 2021 — Present',
    points: [
      'Administers Mottainai Recycling’s ArcGIS Online organisation and the field data behind pickups and dispatch.',
      'Shipped three Kotlin Android apps with ArcGIS Maps SDK, Mapbox SDK and offline sync for low-connectivity areas.',
      'Built custom GraphHopper multi-stop routing that cut recurring routing costs by at least 28%.',
    ],
  },
  {
    org: 'Jugrafiya (Pvt.) Ltd.',
    orgHref: 'https://jugrafiya.com/',
    title: 'Web GIS Intern',
    place: 'Rawalpindi',
    period: 'Jun — Sep 2024',
    points: [
      'Led a three-developer team building 2D and 3D spatial apps with React, deck.gl, Kepler.gl and loaders.gl.',
      'Researched browser-rendering workflows for large point-cloud, GeoJSON and raster datasets.',
      'Built a routing and geofencing app on OpenStreetMap and GraphHopper that flags routes crossing high-risk zones.',
    ],
  },
  {
    org: 'Institute of Geographical Information Systems, NUST',
    title: 'GIS Research Intern',
    place: 'Islamabad',
    period: 'Jul — Aug 2023',
    points: [
      'Developed WebGIS and computer-vision components for an NCGSA-funded IoT project monitoring Dengue/Zika vectors.',
      'Configured GeoServer spatial services and applied OpenCV in image-processing workflows.',
    ],
  },
]

export const skills = [
  {
    group: 'Remote sensing & EO',
    items: [
      'Google Earth Engine', 'Sentinel-2', 'Landsat', 'MODIS', 'Multi-temporal LULC',
      'Random Forest', 'Change detection', 'Spectral unmixing', 'Canopy density', 'Accuracy assessment', 'QA/QC',
    ],
  },
  {
    group: 'GIS & spatial analysis',
    items: [
      'QGIS', 'ArcGIS Pro / Enterprise', 'ArcGIS Online', 'GRASS GIS', 'GDAL', 'GeoPandas',
      'PostGIS', 'AHP', 'Spatial statistics', 'Collect Earth', 'Trends.Earth',
    ],
  },
  {
    group: 'WebGIS & services',
    items: [
      'GeoServer', 'MapServer', 'GeoNode', 'Mapbox GL', 'Leaflet', 'OpenLayers', 'Cesium',
      'deck.gl / Kepler.gl', 'MBTiles & tile servers', 'STAC APIs', 'GraphHopper',
    ],
  },
  {
    group: 'Engineering',
    items: [
      'Python', 'TypeScript', 'R', 'C++', 'Kotlin', 'React / Next.js', 'FastAPI', 'Django REST',
      'scikit-learn', 'PyTorch', 'OpenCV', 'Docker', 'Kubernetes', 'AWS',
    ],
  },
]

export const education = {
  school: 'National University of Sciences and Technology (NUST)',
  degree: 'B.E. Geoinformatics Engineering',
  dept: 'School of Civil and Environmental Engineering',
  period: '2021 — 2025',
  grade: 'CGPA 3.49 / 4.00',
  project:
    'Final-year project: Urban Mobility and Urban Microclimate, a live tool for heat-aware urban routing. A grades in FYP I and II.',
  coursework: [
    'Remote Sensing', 'GIS Programming', 'Spatial Data Analysis', 'Digital Mapping & Image Processing',
    'Machine Learning', 'Spatial Databases', 'Big Data Analytics', 'Spatial Decision Support Systems',
  ],
}
