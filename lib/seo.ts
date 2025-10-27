import type { Metadata } from 'next'

const title = 'Muhammad Shaf Haider — GIS Engineer & Web Mapping Specialist'
const description =
  'Geospatial engineer partnering with teams to deliver performant web GIS products, resilient data pipelines, and crafted spatial storytelling.'
const url = new URL('https://shafhaider.dev')

export const siteMetadata: Metadata = {
  title,
  description,
  metadataBase: url,
  applicationName: 'Shaf Haider GIS Portfolio',
  keywords: [
    'GIS',
    'Geospatial',
    'Web Mapping',
    'deck.gl',
    'Mapbox',
    'Next.js',
    'Spatial Analytics',
  ],
  authors: [{ name: 'Muhammad Shaf Haider' }],
  openGraph: {
    title,
    description,
    url: url.href,
    type: 'website',
    siteName: 'Shaf Haider GIS Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@shafhaider',
  },
}
