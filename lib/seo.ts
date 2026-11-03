import type { Metadata } from 'next'
import { siteUrl } from '@/lib/paths'

const title = 'Shaf Haider · GIS and remote sensing'
const description =
  'Geoinformatics engineer in Islamabad working on GIS and remote sensing: forest change, land degradation, urban heat and web mapping. Applying to graduate programs in geography.'
const url = new URL(siteUrl)

export const siteMetadata: Metadata = {
  title: { default: title, template: '%s · Shaf Haider' },
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
  authors: [{ name: 'Muhammad Shaf Haider' }],
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
