'use client'

import { useEffect, useRef } from 'react'

interface MapMarker {
  x: number
  y: number
  pulsePhase: number
}

export function TopoMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const updateMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener('mousemove', updateMouse)

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Config
    const markers: MapMarker[] = []
    const markerCount = 6
    for (let i = 0; i < markerCount; i++) {
      markers.push({
        x: Math.random() * window.innerWidth, // base positions
        y: Math.random() * window.innerHeight,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const render = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      time += 0.005

      // Parallax Target
      const targetX = (mouseRef.current.x - 0.5) * 40
      const targetY = (mouseRef.current.y - 0.5) * 40

      // Background
      const bgGradient = ctx.createLinearGradient(0, 0, w, h)
      bgGradient.addColorStop(0, '#0a1d2f')
      bgGradient.addColorStop(1, '#00384a')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, w, h)

      // Grid (Back Layer) - Slow Parallax
      ctx.save()
      ctx.translate(targetX * 0.2, targetY * 0.2)
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      const gridSize = 100
      for (let x = 0; x < w + 200; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x - 100, -100)
        ctx.lineTo(x - 100, h + 100)
        ctx.stroke()
      }
      for (let y = 0; y < h + 200; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(-100, y - 100)
        ctx.lineTo(w + 100, y - 100)
        ctx.stroke()
      }
      ctx.restore()

      // Contours (Middle Layer) - Medium Parallax
      ctx.save()
      ctx.translate(targetX * 0.5, targetY * 0.5)
      ctx.strokeStyle = '#1ca7e2'
      ctx.lineWidth = 1.5
      ctx.lineJoin = 'round'
      ctx.globalAlpha = 0.4

      const waveCount = 8
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath()
        const yBase = (h / waveCount) * i + (h / waveCount) / 2
        for (let x = -50; x < w + 50; x += 10) {
          const n = Math.sin(x * 0.002 + time + i) * 60
            + Math.sin(x * 0.005 - time * 2 + i) * 30
          ctx.lineTo(x, yBase + n)
        }
        ctx.stroke()
      }
      ctx.restore()

      // Markers (Front Layer) - Fast Parallax
      ctx.save()
      ctx.translate(targetX, targetY)
      markers.forEach((m, i) => {
        // Recalculate positions based on simple relative coords for responsiveness
        const mx = (m.x % w + w) % w
        const my = (m.y % h + h) % h

        const pulse = Math.sin(time * 3 + m.pulsePhase) * 0.5 + 1

        // Glow
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 40)
        grad.addColorStop(0, 'rgba(28, 167, 226, 0.4)')
        grad.addColorStop(1, 'rgba(28, 167, 226, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mx, my, 40, 0, Math.PI * 2)
        ctx.fill()

        // Point
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fill()

        // Ring
        ctx.strokeStyle = '#1ca7e2'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(mx, my, 10 * pulse, 0, Math.PI * 2)
        ctx.stroke()
      })
      ctx.restore()

      // Noise Overlay
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = `rgba(255,255,255,0.03)`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      animationFrameRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('resize', updateSize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full bg-[#0a1d2f]">
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* Glass overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d2f] via-transparent to-transparent opacity-80 pointer-events-none" />
    </div>
  )
}
