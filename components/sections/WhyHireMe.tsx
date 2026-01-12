'use client'

import { motion } from 'motion/react'
import { Layers, Database, Palette, Rocket } from 'lucide-react'

const benefits = [
    {
        icon: Layers,
        title: "Modernizing Spatial Infrastructure",
        desc: "The GIS world is evolving. I migrate legacy desktop workflows into powerful, cloud-native web applications that scale with your business."
    },
    {
        icon: Database,
        title: "Performance-Driven Intelligence",
        desc: "Location data is heavy. I optimize every layer of the stack—from database spatial indices to WebGL rendering—to ensure instant insights."
    },
    {
        icon: Palette,
        title: "Solving Complex Spatial Problems",
        desc: "Beyond simple mapping, I implement advanced geoprocessing logic to solve distinct industry challenges in logistics, environment, and planning."
    },
    {
        icon: Rocket,
        title: "Full-Stack Turnkey Solutions",
        desc: "I deliver more than analysis. I architect and build complete, production-ready software ecosystems that integrate seamlessly with enterprise tools."
    }
]

export function WhyHireMe() {
    return (
        <section className="py-32 md:py-48 bg-background relative overflow-hidden">
            {/* Minimal Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <span className="inline-block py-1 px-3 border border-primary/20 rounded-full bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-8">
                        The Difference
                    </span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif-display font-medium tracking-tight text-primary mb-12 leading-[0.9]">
                        Why Hire Me?
                    </h2>

                    <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light text-balance">
                        Because you need more than just a developer. You need a <span className="text-foreground font-medium underline decoration-primary/30 underline-offset-4">Geo-Spatial Architect</span> who can translate business goals into high-performance reality.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-px bg-border/20 border border-border/20 overflow-hidden rounded-3xl">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative bg-background p-12 hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-500">
                                <benefit.icon className="w-24 h-24 stroke-[1px]" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                                    <benefit.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-serif-display font-bold text-foreground mb-4">
                                    {benefit.title}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="font-mono text-xs text-muted-foreground/50 uppercase tracking-[0.3em]">
                        Based in Islamabad • Available Worldwide
                    </p>
                </div>

            </div>
        </section>
    )
}
