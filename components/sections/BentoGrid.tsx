'use client'

import { motion } from 'motion/react'
import StackIcon from 'tech-stack-icons'
import { Globe, Database, Layers, Cpu, Map, BarChart3, Satellite, Server } from 'lucide-react'

const services = [
  {
    icon: Map,
    title: 'Web GIS Development',
    description: 'Custom interactive mapping platforms built with Mapbox, Leaflet, and deck.gl. From real-time dashboards to full-featured geoportals.',
    accent: 'from-teal-500/10 to-emerald-500/10',
    iconColor: 'text-teal-600',
  },
  {
    icon: Database,
    title: 'Spatial Data Engineering',
    description: 'PostGIS databases, ETL pipelines, and spatial APIs. Turning raw geospatial data into clean, queryable, production-ready infrastructure.',
    accent: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600',
  },
  {
    icon: Satellite,
    title: 'Remote Sensing & Analysis',
    description: 'Satellite imagery processing, change detection, and land classification using Google Earth Engine, Python, and deep learning.',
    accent: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-600',
  },
  {
    icon: Layers,
    title: 'Enterprise GIS Solutions',
    description: 'End-to-end geospatial systems for national agencies and enterprises — from architecture design to deployment and training.',
    accent: 'from-purple-500/10 to-violet-500/10',
    iconColor: 'text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Geospatial Analytics',
    description: 'Network analysis, spatial statistics, and location intelligence. Turning geographic patterns into actionable business insights.',
    accent: 'from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-600',
  },
  {
    icon: Server,
    title: 'GIS Infrastructure & DevOps',
    description: 'GeoServer, MapServer, tile caching, and cloud deployments. Scalable geospatial backends on AWS, Docker, and Kubernetes.',
    accent: 'from-cyan-500/10 to-sky-500/10',
    iconColor: 'text-cyan-600',
  },
]

const stack = [
  { name: 'PostGIS', icon: 'postgresql' },
  { name: 'Python', icon: 'python' },
  { name: 'Next.js', icon: 'nextjs2' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Three.js', icon: 'threejs' },
]

export function BentoGrid() {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            What I Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Geospatial services from
            <span className="text-gradient-primary"> concept to deployment</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Full-spectrum GIS engineering covering everything from spatial database 
            architecture to interactive web visualization and satellite image processing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-2xl border border-border/50 bg-card"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Technology Stack
              </h3>
              <p className="text-muted-foreground">
                Modern tools for building production-grade geospatial applications.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {stack.map((tech) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/20 transition-all group/icon"
                  whileHover={{ y: -2 }}
                  title={tech.name}
                >
                  <div className="w-6 h-6">
                    <StackIcon name={tech.icon} className="w-full h-full grayscale group-hover/icon:grayscale-0 transition-all duration-300" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover/icon:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
