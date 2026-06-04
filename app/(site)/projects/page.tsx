import type { Metadata } from 'next'
import { ProjectsIndexStory } from '@/components/projects/ProjectsIndexStory'

export const metadata: Metadata = {
  title: 'Projects — Shaf Haider | Geospatial Data Engineer',
  description:
    'Earth observation case studies covering satellite data pipelines, biodiversity change detection, PostGIS spatial APIs, and InSAR geotechnical screening.',
}

export default function ProjectsPage() {
  return <ProjectsIndexStory />
}
