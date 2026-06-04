import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudyNarrative } from '@/components/projects/CaseStudyNarrative'
import { projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) {
    return { title: 'Project not found' }
  }

  return {
    title: `${project.title} — Case Study | Shaf Haider`,
    description: project.summary,
  }
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return <CaseStudyNarrative project={project} />
}
