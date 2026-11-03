import type { Metadata } from 'next'
import { siteUrl } from '@/lib/paths'

const title = 'Shaf Haider — GIS & Remote Sensing Specialist'
const description =
  'GIS and remote-sensing specialist in Islamabad. National-scale Earth-observation analysis, land-cover and forest-change mapping, UNCCD reporting, raster pipelines and WebGIS.'
const url = new URL(siteUrl)

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
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}
