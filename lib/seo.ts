import type { Metadata } from 'next'

const title = 'Shaf Haider — GIS Engineer & Web GIS Developer'
const description =
  'Geospatial expert with 8+ years building spatial data infrastructure, interactive web mapping platforms, and enterprise GIS solutions for clients worldwide.'
const url = new URL('https://shafhaider.dev')

export const siteMetadata: Metadata = {
  title,
  description,
  metadataBase: url,
  applicationName: 'Shaf Haider — Geospatial Portfolio',
  keywords: [
    'GIS Engineer',
    'Web GIS Developer',
    'Geospatial Expert',
    'Spatial Data',
    'Web Mapping',
    'Mapbox',
    'PostGIS',
    'Remote Sensing',
    'Next.js',
    'Spatial Analytics',
    'Geoportal',
    'deck.gl',
  ],
  authors: [{ name: 'Muhammad Shaf Haider' }],
  openGraph: {
    title,
    description,
    url: url.href,
    type: 'website',
    siteName: 'Shaf Haider — Geospatial Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shafhaider',
  },
}
