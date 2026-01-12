'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'

function SingleWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.1, 1])

    return (
        <span className="relative inline-block mr-[0.2em] last:mr-0">
            <span className="absolute opacity-[0.1]">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    )
}

export function ScrollHighlightText({ children, className = "" }: { children: string; className?: string }) {
    const container = useRef<HTMLParagraphElement>(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    })

    const words = children.split(" ")

    return (
        <p ref={container} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length
                const end = start + (1 / words.length)
                return (
                    <SingleWord key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </SingleWord>
                )
            })}
        </p>
    )
}
