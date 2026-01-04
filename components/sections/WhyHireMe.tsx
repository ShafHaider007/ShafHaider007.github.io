'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'

const benefits = [
    {
        title: "Bridge Between Code & Cartography",
        desc: "Most developers don't understand projections. Most GIS analysts can't scale infrastructure. I do both perfectly."
    },
    {
        title: "Enterprise-Grade Scalability",
        desc: "I don't just make maps. I build pipelined systems processing terabytes of movement data without lag."
    },
    {
        title: "Design-First Geocomputation",
        desc: "Complex data doesn't have to look boring. I bring a Swiss design ethos to technical spatial problems."
    },
    {
        title: "Day 1 Deployment Ready",
        desc: "Full-stack proficiency (database to frontend) means I ship complete products, not just components."
    }
]

export function WhyHireMe() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-primary mb-8">
                            Why Hire Me?
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                            Because you need more than just a developer. You need a <span className="text-foreground font-semibold">Geo-Spatial Architect</span> who can translate business goals into high-performance reality.
                        </p>

                        <div className="mt-12 space-y-8">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground mb-1">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10"
                    >
                        {/* Abstract holographic data visualization representation */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-64 h-64">
                                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 border-2 border-accent/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-8 border border-white/10 rounded-full backdrop-blur-sm" />

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-5xl font-mono font-bold text-white">100%</div>
                                    <div className="text-sm text-primary uppercase tracking-widest mt-2">Delivery Rate</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating cards */}
                        <div className="absolute bottom-8 left-8 right-8 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center text-sm font-mono text-white/80">
                                <span>System Status</span>
                                <span className="text-emerald-400">● Operational</span>
                            </div>
                            <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%] animate-pulse" />
                            </div>
                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    )
}
