'use client'

import { motion } from 'motion/react'
import StackIcon from 'tech-stack-icons'
import { Layers, Database, Palette, Rocket } from 'lucide-react'

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

const benefits = [
    {
        icon: Layers,
        title: "Modernizing Spatial Infrastructure",
        desc: "I migrate legacy desktop workflows into powerful, cloud-native web applications that scale."
    },
    {
        icon: Database,
        title: "Performance-Driven Intelligence",
        desc: "I optimize every layer of the stack to ensure instant insights from heavy location data."
    }
]

const GridItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 hover:bg-white/10 transition-colors ${className}`}
  >
    {children}
  </motion.div>
)

export function BentoGrid() {
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif-display text-center font-medium mb-16">
          A Geo-Spatial Architect
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GridItem className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-serif-display font-bold text-foreground mb-4">
                  Why Hire Me?
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                    Because you need more than just a developer. You need a Geo-Spatial Architect who can translate business goals into high-performance reality.
                </p>
            </div>
            <p className="font-mono text-xs text-muted-foreground/50 uppercase tracking-[0.3em] mt-8">
                Based in Islamabad • Available Worldwide
            </p>
          </GridItem>

          <GridItem>
            <h3 className="text-xl font-bold text-foreground mb-4">Core Capabilities</h3>
            <ul className="space-y-2">
                {capabilities.slice(0, 4).map((capability, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        {capability}
                    </li>
                ))}
            </ul>
          </GridItem>

          <GridItem>
             <h3 className="text-xl font-bold text-foreground mb-4">Technology Stack</h3>
             <div className="grid grid-cols-4 gap-4">
                {stack.map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center gap-2" title={tech.name}>
                        <div className="w-8 h-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
                           {tech.name === 'Mapbox' ? (
                                <img src="/Mapbox.png" alt="Mapbox" className="w-full h-full object-contain" />
                            ) : (
                                <StackIcon name={tech.icon} />
                            )}
                        </div>
                    </div>
                ))}
             </div>
          </GridItem>

          {benefits.map((benefit, i) => (
             <GridItem key={i}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                    {benefit.desc}
                </p>
            </GridItem>
          ))}
        </div>
      </div>
    </section>
  )
}
