'use client'

import { motion } from 'motion/react'
import StackIcon from 'tech-stack-icons'

const stack = [
    { name: 'PostGIS', icon: 'postgresql' },
    { name: 'Python', icon: 'python' },
    { name: 'Next.js', icon: 'nextjs2' },
    { name: 'React', icon: 'react' },
    { name: 'Mapbox', icon: 'mapbox' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Docker', icon: 'docker' },
]

const capabilities = [
    "Geospatial Analysis & Processing",
    "Interactive Map Visualization",
    "Route Optimization Algorithms",
    "Spatial Database Design",
    "Remote Sensing Pipelines",
    "Full-Stack Web Development"
]

export function Expertise() {
    return (
        <section className="py-24 bg-background">
            <div className="mx-auto w-full max-w-5xl px-6 lg:px-12">
                <div className="grid md:grid-cols-2 gap-16">

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-xl font-medium mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-primary/40" />
                            Technology Stack
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {stack.map((tech, i) => (
                                <div key={tech.name} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary/40 transition-colors cursor-default">
                                    <div className="w-8 h-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
                                        <StackIcon name={tech.icon} />
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Capabilities List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-medium mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-primary/40" />
                            Core Capabilities
                        </h3>
                        <ul className="space-y-4">
                            {capabilities.map((capability, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                                    {capability}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
