"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      autoResize: true,
      anchors: true
    })

    const handleLenisScroll = (event: any) => {
      window.dispatchEvent(
        new CustomEvent("lenis-scroll", {
          detail: {
            progress: event.progress,
            velocity: event.velocity,
            direction: event.direction
          }
        })
      )
    }

    lenis.on("scroll", handleLenisScroll)

    let frame: number
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
