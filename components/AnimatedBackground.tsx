"use client"

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        // Contour lines config
        const lines: { y: number; speed: number; amplitude: number; frequency: number; offset: number }[] = []
        const lineCount = 15
        const spacing = height / lineCount

        for (let i = 0; i < lineCount; i++) {
            lines.push({
                y: i * spacing + spacing / 2,
                speed: 0.002 + Math.random() * 0.003,
                amplitude: 20 + Math.random() * 30, // Subtle wavy amplitude
                frequency: 0.005 + Math.random() * 0.005,
                offset: Math.random() * 100,
            })
        }

        let animationFrameId: number
        let time = 0

        const resize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw lines
            ctx.lineWidth = 1
            // Use the CSS variable color for primary but with low opacity
            // We can't easily grab CSS var in JS without getComputedStyle, 
            // so we use a hardcoded fallback that matches or try to read it.
            // For performance, let's hardcode a transparent version of the "Official Navy" (215 50% 25%) used in globals.
            // HSL: 215, 50%, 25% -> RGB approx 32, 64, 96
            ctx.strokeStyle = 'rgba(32, 64, 96, 0.08)'

            time += 0.5

            lines.forEach((line) => {
                ctx.beginPath()
                for (let x = 0; x < width; x += 5) {
                    // Sine wave formula: y = amplitude * sin(frequency * x + time * speed + offset)
                    const y = line.y + line.amplitude * Math.sin(line.frequency * x + time * line.speed + line.offset)
                    ctx.lineTo(x, y)
                }
                ctx.stroke()
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener('resize', resize)
        draw()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-60"
        />
    )
}
