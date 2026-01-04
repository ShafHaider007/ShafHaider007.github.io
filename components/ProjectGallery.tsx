'use client'

import { projects } from '@/lib/projects'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

export function ProjectGallery() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => (
                <motion.article
                    key={project.slug}
                    className="group relative flex flex-col h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredProject(project.slug)}
                    onMouseLeave={() => setHoveredProject(null)}
                >
                    {/* Project Card Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30 border border-border/50 mb-6 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-lg">
                        {/* Placeholder for Project Image/Visual - Using a generative gradient for now */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="w-full h-full border border-dashed border-border/40 rounded-sm flex items-center justify-center relative overflow-hidden">
                                {/* Abstract Map Nodes */}
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full" />
                                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/20 rounded-full" />
                                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent/40 rounded-full" />

                                {/* Connecting lines SVG */}
                                <svg className="absolute inset-0 w-full h-full opacity-20" stroke="currentColor">
                                    <line x1="25%" y1="25%" x2="50%" y2="50%" className="text-primary" strokeWidth="0.5" />
                                    <line x1="50%" y1="50%" x2="75%" y2="66%" className="text-primary" strokeWidth="0.5" />
                                </svg>

                                <span className="font-serif-display italic text-3xl text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                                    {project.metrics[0]?.value || 'Map'}
                                </span>
                            </div>
                        </div>

                        {/* Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm border border-primary/10 text-primary font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white rounded-none"
                            >
                                View Case Study <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                        <div className="flex items-baseline justify-between mb-2">
                            <h3 className="text-2xl font-serif-display font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                {project.title}
                            </h3>
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider border border-border px-2 py-1">
                                {project.category}
                            </span>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 text-balance">
                            {project.blurb}
                        </p>

                        <div className="mt-auto pt-4 border-t border-border/30 flex flex-wrap gap-x-4 gap-y-2">
                            {project.tech.map((tech) => (
                                <span key={tech} className="text-xs text-muted-foreground/80 font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    )
}
