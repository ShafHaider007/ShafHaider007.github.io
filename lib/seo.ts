import type { Metadata } from 'next'

const title = 'Shaf Haider — Geospatial Data Engineer & Earth Observation Scientist'
const description =
  'I design, build, and maintain satellite-imagery data pipelines and run remote-sensing science across biodiversity, geotechnical, and earth-systems work — from raw scenes to analysis-ready data, spatial databases, and geospatial APIs.'
const url = new URL('https://shafhaider.dev')

export const siteMetadata: Metadata = {
  title,
  description,
  metadataBase: url,
  applicationName: 'Shaf Haider — Earth Observation Portfolio',
  keywords: [
    'Geospatial Data Engineer',
    'Earth Observation',
    'Remote Sensing',
    'Satellite Imagery',
    'Data Pipelines',
    'ETL',
    'PostGIS',
    'Rasterio',
    'GDAL',
    'GeoPandas',
    'Google Earth Engine',
    'Spatial Databases',
    'FastAPI',
    'Python',
    'GIS',
  ],
  authors: [{ name: 'Muhammad Shaf Haider' }],
  openGraph: {
    title,
    description,
    url: url.href,
    type: 'website',
    siteName: 'Shaf Haider — Earth Observation Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shafhaider',
  },
}
