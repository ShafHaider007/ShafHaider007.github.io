import type { Metadata } from 'next'

const title = 'Shaf Haider — GIS & Remote Sensing Specialist'
const description =
  'GIS and remote-sensing specialist in Islamabad. National-scale Earth-observation analysis, land-cover and forest-change mapping, UNCCD reporting, raster pipelines and WebGIS.'
const url = new URL('https://shafhaider.dev')

export const siteMetadata: Metadata = {
  title: { default: title, template: '%s — Shaf Haider' },
  description,
  metadataBase: url,
  applicationName: 'Shaf Haider',
  keywords: [
    'GIS',
    'Remote Sensing',
    'Earth Observation',
    'Google Earth Engine',
    'Sentinel-2',
    'Land cover classification',
    'UNCCD',
    'SDG 15.3.1',
    'WebGIS',
    'PostGIS',
    'GDAL',
    'Pakistan',
  ],
  authors: [{ name: 'Shaf Haider' }],
  openGraph: {
    title,
    description,
    url: url.href,
    type: 'website',
    siteName: 'Shaf Haider',
    locale: 'en_US',
    images: [{ url: '/media/skardu.jpg', width: 2400, height: 1256 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}
