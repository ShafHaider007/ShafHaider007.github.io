import type { Metadata } from 'next'
import { ContactPageStory } from '@/components/contact/ContactPageStory'

export const metadata: Metadata = {
  title: 'Contact — Shaf Haider | Geospatial Data Engineer',
  description:
    'Get in touch about satellite-imagery data pipelines, spatial databases, and remote-sensing science and reporting.',
}

export default function ContactPage() {
  return <ContactPageStory />
}
