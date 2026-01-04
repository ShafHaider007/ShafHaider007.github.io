'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const steps = [
    {
        id: '01',
        title: 'Ingest',
        subtitle: 'Raw Data',
        details: 'Satellite Telemetry • LiDAR • IoT Streams',
        color: '#3b82f6',
        x: '-30%',
        y: '-10%'
    },
    {
        id: '02',
        title: 'Process',
        subtitle: 'Spatial ETL',
        details: 'Normalization • Topology Checks • Vectorization',
        color: '#a855f7',
        x: '0%',
        y: '20%'
    },
    {
        id: '03',
        title: 'Analyze',
        subtitle: 'Geo-Computation',
        details: 'Clustering • Network Analysis • ML Models',
        color: '#ef4444',
        x: '30%',
        y: '-10%'
    },
    {
        id: '04',
        title: 'Deploy',
        subtitle: 'Visualization',
        details: 'WebGL Maps • Real-time Dashboards • APIs',
        color: '#10b981',
        x: '0%',
        y: '-30%'
    }
]

export function Methodology() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Rotate the entire assembly based on scroll
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 90])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <section ref={containerRef} className="min-h-[150vh] relative flex items-center justify-center overflow-hidden bg-[#050510] py-40">

            {/* Background Grid for Perspective */}
            <div className="absolute inset-0 perspective-[1000px] pointer-events-none">
                <motion.div
                    className="w-full h-full border-[0.5px] border-white/5 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050510_80%)]"
                    style={{
                        rotateX: 60,
                        scale: 2
                    }}
                />
            </div>

            <div className="fixed-center z-10 text-center mb-24 max-w-2xl px-6">
                <motion.h2
                    className="text-5xl md:text-7xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6"
                    style={{ opacity }}
                >
                    The Pipeline.
                </motion.h2>
                <motion.p
                    className="text-xl text-muted-foreground"
                    style={{ opacity }}
                >
                    A rigorous standard operating procedure transforming chaos into cartographic intelligence.
                </motion.p>
            </div>

            {/* 3D Flow Assembly */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] perspective-[2000px]">
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    style={{ rotateX: rotation }}
                >
                    {/* Central Connecting Tube */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[600px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 blur-md" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="absolute top-1/2 left-1/2 w-64 h-64 -ml-32 -mt-32 backdrop-blur-md border border-white/10 rounded-full bg-black/40 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                            style={{
                                x: step.x,
                                y: step.y,
                                translateZ: index * 100, // Stagger in depth
                            }}
                            whileHover={{ scale: 1.1, translateZ: index * 100 + 50, borderColor: step.color }}
                        >
                            <div className="text-4xl font-mono font-bold opacity-20 mb-2" style={{ color: step.color }}>{step.id}</div>
                            <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                            <div className="text-sm font-medium text-white/60 uppercase tracking-widest mb-4">{step.subtitle}</div>

                            <div className="text-xs text-white/40 font-mono leading-relaxed max-w-[180px]">
                                {step.details}
                            </div>

                            {/* Glowing Orb */}
                            <div className="absolute inset-0 rounded-full opacity-20 blur-xl -z-10" style={{ backgroundColor: step.color }} />
                        </motion.div>
                    ))}

                </motion.div>
            </div>
        </section>
    )
}
