"use client"

import { useEffect, useRef } from "react"

const PARTICLE_COUNT = 60

export function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const devicePixelRatio = window.devicePixelRatio || 1
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1 + Math.random() * 2,
      drift: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2
    }))

    const resize = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth * devicePixelRatio
      canvas.height = innerHeight * devicePixelRatio
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(devicePixelRatio, devicePixelRatio)
    }

    resize()

    let scrollProgress = 0

    const handleScroll = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = scrollRange > 0 ? window.scrollY / scrollRange : 0
    }

    handleScroll()

    const render = (time: number) => {
      const { innerWidth, innerHeight } = window
      context.clearRect(0, 0, innerWidth, innerHeight)

      const baseOpacity = 0.15 + scrollProgress * 0.45
      const hue = 200 + scrollProgress * 40

      particles.forEach((particle) => {
        const x = particle.x * innerWidth + Math.sin(time * 0.0003 + particle.offset) * 18
        const y = (particle.y * innerHeight + scrollProgress * innerHeight * 0.8 + time * 0.02 * particle.drift) % (innerHeight + 50)

        context.beginPath()
        context.arc(x, y, particle.radius * (1.2 + scrollProgress * 1.6), 0, Math.PI * 2)
        context.fillStyle = `hsla(${hue}, 80%, 60%, ${baseOpacity})`
        context.fill()
      })

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="scroll-canvas" aria-hidden="true" />
}
