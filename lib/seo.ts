import type { Metadata } from 'next'
import { siteUrl } from '@/lib/paths'

const title = 'Shaf Haider · GIS and remote sensing'
const description =
  'Shaf Haider is a geoinformatics engineer in Islamabad (BE, NUST, 2025) working on forest change, land degradation and urban heat from satellite data, and applying to graduate programs in geography.'
const url = new URL(siteUrl)

export const siteMetadata: Metadata = {
  title: { default: title, template: '%s · Shaf Haider' },
  description,
  metadataBase: url,
  applicationName: 'Shaf Haider',
  authors: [{ name: 'Shaf Haider', url: url.href }],
  creator: 'Shaf Haider',
  openGraph: {
    title,
    description,
    url: url.href,
    type: 'website',
    siteName: 'Shaf Haider',
    locale: 'en_GB',
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: 'Islamabad in Sentinel-2 true colour beside a land-cover map of the same area.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

/** Open Graph for a page. Next.js replaces the layout's openGraph object entirely, so the image is repeated here. */
export function pageOpenGraph(title: string, description: string, path: string): Metadata['openGraph'] {
  return {
    title: `${title} · Shaf Haider`,
    description,
    url: path,
    type: 'website',
    siteName: 'Shaf Haider',
    images: [{ url: `${siteUrl}/og.jpg`, width: 1200, height: 630, alt: 'Islamabad in Sentinel-2 true colour beside a land-cover map of the same area.' }],
  }
}
