'use client'

import { projects } from '@/lib/projects'
import Link from 'next/link'
import { ArrowUpRight, Map, Tractor, Thermometer } from 'lucide-react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'

export function ProjectGallery() {
    return (
        <BentoGrid className="max-w-7xl mx-auto">
            {projects.map((project, i) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className={i === 0 || i === 3 ? "md:col-span-2" : ""}>
                    <BentoGridItem
                        title={
                            <span className="flex items-center gap-2">
                                {project.title} <ArrowUpRight className="w-4 h-4 opacity-50" />
                            </span>
                        }
                        description={project.blurb}
                        header={<ProjectHeader project={project} />}
                        className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                        icon={<ProjectIcon category={project.category} />}
                    />
                </Link>
            ))}
        </BentoGrid>
    )
}

const ProjectIcon = ({ category }: { category: string }) => {
    if (category.includes('Vision')) return <Map className="h-4 w-4 text-neutral-500" />
    if (category.includes('Network')) return <Tractor className="h-4 w-4 text-neutral-500" />
    if (category.includes('Remote')) return <Thermometer className="h-4 w-4 text-neutral-500" />
    return <ArrowUpRight className="h-4 w-4 text-neutral-500" />
}

const ProjectHeader = ({ project }: { project: any }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/10 relative overflow-hidden group">
        {/* Generative Tech Background */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
        </div>

        {/* Simple Abstract Representation */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-4xl font-serif-display text-white/20 group-hover:text-primary/50 transition-colors duration-500">
                {project.metrics[0]?.value}
            </div>
        </div>
    </div>
)
