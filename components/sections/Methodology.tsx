'use client'

import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { useRef } from 'react'

const steps = [
    {
        id: '01',
        title: 'Requirements',
        subtitle: 'Client Consultation',
        desc: 'In-depth analysis of project scope, technical feasibility, and business objectives.',
        color: '#3b82f6', // Premium Blue
    },
    {
        id: '02',
        title: 'Planning',
        subtitle: 'Solution Architecture',
        desc: 'Designing scalable geospatial schemas, API workflows, and system architecture.',
        color: '#a855f7', // Vivid Purple
    },
    {
        id: '03',
        title: 'Implementation',
        subtitle: 'Agile Development',
        desc: 'Full-stack engineering of the solution, from database optimization to frontend visualization.',
        color: '#f43f5e', // Hot Pink
    },
    {
        id: '04',
        title: 'Testing',
        subtitle: 'QA & Validation',
        desc: 'Rigorous validation of spatial accuracy, performance checks, and system reliability assurance.',
        color: '#f97316', // Bright Orange
    },
    {
        id: '05',
        title: 'Delivery',
        subtitle: 'Final Deployment',
        desc: 'Production launch, documentation handover, and seamless client onboarding.',
        color: '#10b981', // Emerald Green
    }
]

function TunnelStep({ i, step, progress, total }: { i: number, step: typeof steps[0], progress: MotionValue<number>, total: number }) {
    // Each step is active for a slice of the scroll: 1 / total
    const slice = 1 / total
    const start = i * slice
    const end = start + slice

    // Z-Axis Fly Through Logic
    // Incoming: scale: 0 -> 1, opacity: 0 -> 1
    // Active: scale: 1, opacity: 1
    // Outgoing: scale: 1 -> 2, opacity: 1 -> 0

    const range = [start, start + (slice * 0.2), end - (slice * 0.2), end]

    // Scale sequence: Start small (distant), grow to normal, then blow up (fly through)
    // We adjust ranges slightly so they don't overlap too messily

    // Simpler cleaner logic:
    // It appears from "darkness" (z-depth) and stays, then flies past.

    // Slight overlap adjustment for smoother transitions
    const zInput = [start, start + 0.1, end - 0.1, end]

    const opacity = useTransform(progress, zInput, [0, 1, 1, 0])
    const scale = useTransform(progress, zInput, [0.5, 1, 1, 1.5]) // Zoom effect
    const blur = useTransform(progress, zInput, [10, 0, 0, 20]) // Blur in/out

    // Translate Y manually to ensure perfectly centered absolute positioning
    const y = useTransform(progress, zInput, [100, 0, 0, -100])

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
                opacity,
                scale,
                filter: `blur(${blur}px)` // Optional: heavy on performance, remove if jagged
            }}
        >
            <div className="relative w-full max-w-4xl px-6 text-center">

                {/* ID Number */}
                <div
                    className="font-mono text-xs tracking-[0.5em] mb-4 opacity-50"
                    style={{ color: step.color }}
                >
                    STEP {step.id}
                </div>

                {/* Main Title */}
                <h2 className="text-6xl md:text-9xl font-serif-display font-bold text-white mb-6 tracking-tighter mix-blend-screen">
                    {step.title}
                </h2>

                {/* Divider */}
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8" />

                {/* Description */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-medium text-white/90">{step.subtitle}</h3>
                    <p className="text-lg text-white/50 max-w-lg mx-auto leading-relaxed">
                        {step.desc}
                    </p>
                </div>

                {/* Background Glow for Ambiance */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 -z-10"
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

    // Global background shift based on progress
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <section ref={containerRef} className="relative h-[500vh] bg-background">

            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center items-center">

                {/* Ambient Background Grid */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--background)_0%,_#000_100%)] opacity-80" />
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"
                        style={{ opacity: bgOpacity }}
                    />
                    <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none mix-blend-overlay" />
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
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden lg:flex">
                    {steps.map((step, i) => {
                        // Highlight logic relative to scroll could be added her
                        // For now simple dots
                        return (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{step.id}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Chapter Watermark */}
                <motion.div
                    className="absolute bottom-12 right-12 text-right z-10 pointer-events-none"
                    style={{ opacity: bgOpacity }}
                >
                    <div className="text-xs font-mono text-white/30 mb-2">CHAPTER 02</div>
                    <div className="text-4xl font-serif-display text-white/10 uppercase">Workflow</div>
                </motion.div>

            </div>

        </section>
    )
}
