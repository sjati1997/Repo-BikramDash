"use client"

import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  max?: number
  /** Show a soft light reflection that follows the cursor. */
  glare?: boolean
}

/**
 * Tilts towards a mouse cursor in 3D. Children can sit at different depths
 * with Tailwind's `translate-z-*` utilities (the card uses `transform-3d`).
 * Flat for touch input and when reduced motion is requested.
 */
export function TiltCard({ children, className, max = 7, glare = true }: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useMotionValue(0)
  const springConfig = { stiffness: 160, damping: 18, mass: 0.6 }
  const smoothX = useSpring(rotateX, springConfig)
  const smoothY = useSpring(rotateY, springConfig)
  const smoothGlare = useSpring(glareOpacity, { stiffness: 120, damping: 20 })
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 55%)`

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 2 * max)
    rotateX.set(-(py - 0.5) * 2 * max)
    glareX.set(px * 100)
    glareY.set(py * 100)
    glareOpacity.set(1)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    glareOpacity.set(0)
  }

  return (
    <m.div
      className={cn("relative transform-3d", className)}
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1100 }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
      {glare && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background: glareBackground, opacity: smoothGlare }}
        />
      )}
    </m.div>
  )
}
