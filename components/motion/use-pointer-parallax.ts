"use client"

import { useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useEffect } from "react"

/**
 * Smoothed mouse position relative to the viewport centre, as motion values
 * from -1 to 1. Stays at 0 for touch devices and when reduced motion is
 * requested, so anything driven by it simply holds still.
 */
export function usePointerParallax({ stiffness = 50, damping = 18 } = {}) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness, damping })
  const y = useSpring(pointerY, { stiffness, damping })

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduceMotion, pointerX, pointerY])

  return { x, y }
}
