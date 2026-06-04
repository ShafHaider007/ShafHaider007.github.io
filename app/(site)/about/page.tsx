import type { Metadata } from 'next'
import { AboutStory } from '@/components/about/AboutStory'

export const metadata: Metadata = {
  title: 'About — Shaf Haider | Geospatial Data Engineer',
  description:
    'Geospatial data engineer and earth observation scientist working between earth-systems science and software engineering — satellite data pipelines, spatial databases, and remote-sensing analysis.',
}

export default function AboutPage() {
  return <AboutStory />
}
