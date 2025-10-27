'use client'

import { useEffect, useRef } from 'react'

interface MapMarker {
  x: number
  y: number
  pulsePhase: number
}

export function TopoMapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Colors from spec
    const gradientStart = '#0a1d2f'
    const gradientEnd = '#00384a'
    const contourColor = '#1ca7e2'
    const heatmapColor = '#f8b34c'
    const gridColor = '#ffffff'
    const markerColor = '#1ca7e2'

    // Generate map markers
    const markers: MapMarker[] = []
    const markerCount = 5
    for (let i = 0; i < markerCount; i++) {
      markers.push({
        x: (canvas.width / (markerCount + 1)) * (i + 1) + (Math.random() - 0.5) * 100,
        y: canvas.height * (0.3 + Math.random() * 0.4),
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let time = 0

    const render = () => {
      const w = canvas.width
      const h = canvas.height
      time += 0.01

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, w, h)
      bgGradient.addColorStop(0, gradientStart)
      bgGradient.addColorStop(1, gradientEnd)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, w, h)

      // Paper grain texture
      ctx.globalAlpha = 0.05
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
      }
      ctx.globalAlpha = 1

      // Grid lines
      ctx.strokeStyle = gridColor
      ctx.globalAlpha = 0.15
      ctx.lineWidth = 0.5
      const gridSpacing = 80
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Contour lines (topographic)
      ctx.strokeStyle = contourColor
      ctx.globalAlpha = 0.6
      ctx.lineWidth = 1
      const contourSpacing = 40
      const waveCount = Math.floor(h / contourSpacing)

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath()
        const baseY = (i * contourSpacing) + (contourSpacing / 2)
        
        for (let x = 0; x <= w; x += 5) {
          const wave1 = Math.sin((x * 0.005) + (i * 0.3) + time) * 15
          const wave2 = Math.sin((x * 0.003) + (i * 0.5) - time * 0.5) * 10
          const y = baseY + wave1 + wave2
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Heatmap overlay (warm gradient blobs)
      ctx.globalCompositeOperation = 'overlay'
      ctx.globalAlpha = 0.3
      
      const heatmapCenters = [
        { x: w * 0.3, y: h * 0.4 },
        { x: w * 0.7, y: h * 0.6 },
        { x: w * 0.5, y: h * 0.3 },
      ]

      heatmapCenters.forEach((center, idx) => {
        const gradient = ctx.createRadialGradient(
          center.x + Math.sin(time + idx) * 50,
          center.y + Math.cos(time + idx) * 30,
          0,
          center.x,
          center.y,
          300
        )
        gradient.addColorStop(0, heatmapColor)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      })

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1

      // Geodata wave pattern
      ctx.strokeStyle = '#ffffff'
      ctx.globalAlpha = 0.1
      ctx.lineWidth = 2
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const offset = i * 200
        for (let x = 0; x <= w; x += 10) {
          const y = h * 0.5 + Math.sin((x * 0.002) + (i * 0.5)) * 100 + offset
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Map markers (pins)
      markers.forEach((marker) => {
        const pulse = Math.sin(time * 2 + marker.pulsePhase) * 0.3 + 1
        const size = 12 * pulse

        // Pin shadow
        ctx.globalAlpha = 0.3
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.ellipse(marker.x, marker.y + 20, size * 0.8, size * 0.3, 0, 0, Math.PI * 2)
        ctx.fill()

        // Pin body
        ctx.globalAlpha = 1
        const pinGradient = ctx.createRadialGradient(
          marker.x - size * 0.3,
          marker.y - size * 0.3,
          0,
          marker.x,
          marker.y,
          size
        )
        pinGradient.addColorStop(0, '#ffffff')
        pinGradient.addColorStop(0.3, markerColor)
        pinGradient.addColorStop(1, '#0a5f8a')
        
        ctx.fillStyle = pinGradient
        ctx.beginPath()
        ctx.arc(marker.x, marker.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Pin highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(marker.x - size * 0.3, marker.y - size * 0.3, size * 0.3, 0, Math.PI * 2)
        ctx.fill()

        // Pin pointer
        ctx.fillStyle = markerColor
        ctx.beginPath()
        ctx.moveTo(marker.x, marker.y + size)
        ctx.lineTo(marker.x - size * 0.4, marker.y + size * 1.5)
        ctx.lineTo(marker.x + size * 0.4, marker.y + size * 1.5)
        ctx.closePath()
        ctx.fill()

        // Pulse ring
        ctx.strokeStyle = markerColor
        ctx.globalAlpha = 1 - (pulse - 1) / 0.3
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(marker.x, marker.y, size * pulse * 1.5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // Fine noise overlay
      ctx.globalAlpha = 0.02
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
      }
      ctx.globalAlpha = 1

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', updateSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full"
      style={{ imageRendering: 'crisp-edges' }}
    />
  )
}
