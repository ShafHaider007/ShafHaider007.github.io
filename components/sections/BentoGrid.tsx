'use client'

import { motion } from 'motion/react'
import StackIcon from 'tech-stack-icons'
import { Layers, Database, Palette, Rocket, Globe, Code, Cpu, Zap } from 'lucide-react'

const stack = [
  { name: 'PostGIS', icon: 'postgresql' },
  { name: 'Python', icon: 'python' },
  { name: 'Next.js', icon: 'nextjs2' },
  { name: 'React', icon: 'react' },
  { name: 'Mapbox', icon: 'mapbox' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Three.js', icon: 'threejs' },
  { name: 'Node.js', icon: 'nodejs' },
]

const stats = [
  { label: "Years Experience", value: "8+" },
  { label: "Enterprise Projects", value: "30+" },
  { label: "Global Clients", value: "12" },
]

const GridItem = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ borderColor: "var(--primary)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, type: "tween", ease: "circOut" }}
    className={`relative rounded-sm border border-white/5 bg-slate-900/50 backdrop-blur-md p-6 overflow-hidden group hover:shadow-[0_0_20px_rgba(0,242,255,0.1)] transition-all ${className}`}
  >
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
    <div className="relative z-10 h-full">{children}</div>
  </motion.div>
)

import { ScrollHighlightText } from '@/components/bits/ScrollHighlightText'

export function BentoGrid() {
  return (
    <section className="py-32 px-4 lg:px-8 relative z-10 font-mono">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-primary mb-4" />
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-foreground">
            System <span className="text-primary">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4">

          {/* Main Statement */}
          <GridItem className="md:col-span-4 lg:col-span-3 md:row-span-2 flex flex-col justify-between border-l-4 border-l-primary/50">
            <div>
              <Cpu className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl text-muted-foreground uppercase tracking-widest mb-4">Mission Profile</h3>
              <div className="text-3xl font-light leading-relaxed">
                <ScrollHighlightText>
                  Bridging the critical gap between complex Spatial Data infrastructure and intuitive User Experience design.
                </ScrollHighlightText>
              </div>
            </div>
            <p className="text-sm text-primary/60 mt-8 border-t border-white/5 pt-4">
               // DEPLOYMENT READY
            </p>
          </GridItem>

          {/* Stats Column */}
          <div className="md:col-span-2 lg:col-span-1 md:row-span-2 flex flex-col gap-4">
            {stats.map((stat, i) => (
              <GridItem key={i} className="flex-1 flex flex-col justify-center items-center text-center bg-card/40" delay={i * 0.1}>
                <span className="text-5xl font-black text-foreground mb-1">{stat.value}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</span>
              </GridItem>
            ))}
          </div>

          {/* Map/Globe Placeholder or Graphic */}
          <GridItem className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center overflow-hidden">
            <Globe className="w-64 h-64 text-accent opacity-20 absolute -right-12 -bottom-12 rotate-12" />
            <div className="text-center relative z-10">
              <h3 className="text-3xl font-bold mb-2">Global Reach</h3>
              <p className="text-sm opacity-70 max-w-[200px] mx-auto">Delivering solutions for clients across 3 continents.</p>
            </div>
          </GridItem>


          {/* Tech Stack - Dense Grid */}
          <GridItem className="md:col-span-4 lg:col-span-3 md:row-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Database className="w-6 h-6 text-secondary" />
                Stack Arsenal
              </h3>
              <span className="text-xs font-mono border border-white/10 px-2 py-1 rounded-full">Core Technologies</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
              {stack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="flex flex-col items-center gap-2 group/icon"
                  whileHover={{ y: -5 }}
                  title={tech.name}
                >
                  <div className="w-10 h-10 p-2 rounded-lg bg-white/5 group-hover/icon:bg-white/10 transition-colors">
                    {tech.name === 'Mapbox' ? (
                      <img src="/Mapbox.png" alt="Mapbox" className="w-full h-full object-contain invert opacity-80" />
                    ) : (
                      <StackIcon name={tech.icon} className="grayscale group-hover/icon:grayscale-0 transition-all duration-300" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GridItem>

          {/* Capabilities List */}
          <GridItem className="md:col-span-4 lg:col-span-3 md:row-span-2 bg-secondary/5 border-secondary/20">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-secondary" />
              Specialized Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Advanced Geospatial Analytics",
                "3D WebGL Visualization",
                "Real-time Data Streaming",
                "Serverless Architecture Design",
                "Custom Mapping Engines",
                "SaaS Product Development"
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_10px_var(--secondary)]" />
                  <span className="text-sm font-medium opacity-90">{cap}</span>
                </div>
              ))}
            </div>
          </GridItem>

        </div>
      </div>
    </section>
  )
}
