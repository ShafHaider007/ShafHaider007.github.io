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
                    initial={{ opacity: 0, y: 50, rotateX: -10, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                    style={{ perspective: "1000px" }}
                    onMouseEnter={() => setHoveredProject(project.slug)}
                    onMouseLeave={() => setHoveredProject(null)}
                >
                    {/* Project Card Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#020205] border border-white/10 mb-6 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]">

                        {/* Generative Tech Background */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
                        </div>

                        {/* Central Tech Visual */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="relative w-full h-full border border-dashed border-white/20 flex items-center justify-center overflow-hidden">

                                {/* Animated scan line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 blur-[2px] animate-[scan_3s_ease-in-out_infinite]" />

                                {/* Data Nodes */}
                                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse delay-75" />
                                <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />

                                <span className="relative z-10 font-serif-display italic text-4xl text-white/90 mix-blend-overlay group-hover:text-white transition-colors duration-500">
                                    {project.metrics[0]?.value || 'Map'}
                                </span>
                            </div>
                        </div>

                        {/* Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold tracking-wide translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary/90"
                            >
                                VIEW CASE STUDY <ArrowUpRight className="h-4 w-4" />
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
