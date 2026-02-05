'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useRef } from 'react'

const steps = [
    {
        id: '01',
        title: 'Requirements',
        subtitle: 'Client Consultation',
        desc: 'In-depth analysis of project scope, technical feasibility, and business objectives.',
        color: '#2563ea', // Primary Blue
    },
    {
        id: '02',
        title: 'Planning',
        subtitle: 'Solution Architecture',
        desc: 'Designing scalable geospatial schemas, API workflows, and system architecture.',
        color: '#7c3aed', // Soft Purple
    },
    {
        id: '03',
        title: 'Implementation',
        subtitle: 'Agile Development',
        desc: 'Full-stack engineering of the solution, from database optimization to frontend visualization.',
        color: '#e11d48', // Rose
    },
    {
        id: '04',
        title: 'Testing',
        subtitle: 'QA & Validation',
        desc: 'Rigorous validation of spatial accuracy, performance checks, and system reliability assurance.',
        color: '#ea580c', // Orange
    },
    {
        id: '05',
        title: 'Delivery',
        subtitle: 'Final Deployment',
        desc: 'Production launch, documentation handover, and seamless client onboarding.',
        color: '#059669', // Emerald
    }
]

function TunnelStep({ i, step, progress, total }: { i: number, step: typeof steps[0], progress: MotionValue<number>, total: number }) {
    const slice = 1 / total
    const start = i * slice
    const end = start + slice

    const zInput = [start, start + 0.1, end - 0.1, end]

    const opacity = useTransform(progress, zInput, [0, 1, 1, 0])
    const scale = useTransform(progress, zInput, [0.8, 1, 1, 1.2])
    const blur = useTransform(progress, zInput, [4, 0, 0, 10])

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
                opacity,
                scale,
                filter: `blur(${blur}px)`
            }}
        >
            {/* Full-screen subtle color wash */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] -z-20"
                style={{ backgroundColor: step.color }}
            />

            <div className="relative w-full max-w-5xl px-6 text-center">

                {/* ID Number */}
                <div
                    className="font-bold text-sm tracking-[0.4em] mb-6"
                    style={{ color: step.color }}
                >
                    STEP {step.id}
                </div>

                {/* Main Title */}
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter relative z-10">
                    {step.title}
                </h2>

                {/* Divider */}
                <div
                    className="h-2 w-32 mx-auto mb-10 rounded-full"
                    style={{ backgroundColor: step.color, opacity: 0.8, boxShadow: `0 0 20px ${step.color}40` }}
                />

                {/* Description */}
                <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{step.subtitle}</h3>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
                        {step.desc}
                    </p>
                </div>

                {/* Background Glow for Ambiance */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] opacity-[0.15] -z-10"
                    style={{ backgroundColor: step.color }}
                />
            </div>
        </motion.div>
    )
}

export function Methodology() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-white text-slate-900">

            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

                {/* Ambient Background Grid */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.7)_0%,_white_100%)] opacity-90" />
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"
                        style={{ opacity: bgOpacity }}
                    />
                </div>

                {/* Steps Container */}
                <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
                    {steps.map((step, i) => (
                        <TunnelStep
                            key={i}
                            i={i}
                            step={step}
                            progress={scrollYProgress}
                            total={steps.length}
                        />
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20 hidden lg:flex">
                    {steps.map((step, i) => {
                        const slice = 1 / steps.length
                        const start = i * slice
                        const end = start + slice

                        // Simple indicator of active step
                        return (
                            <div key={i} className="flex items-center gap-4 group">
                                <motion.div
                                    className="w-1.5 h-1.5 rounded-full bg-slate-200 transition-colors"
                                    style={{
                                        backgroundColor: step.color,
                                        opacity: useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.1, 1, 1, 0.1])
                                    }}
                                />
                                <motion.span
                                    className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]"
                                    style={{
                                        opacity: useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.2, 1, 1, 0.2])
                                    }}
                                >
                                    {step.id}
                                </motion.span>
                            </div>
                        )
                    })}
                </div>

            </div>

        </section>
    )
}
