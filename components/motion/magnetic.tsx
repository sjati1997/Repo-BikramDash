"use client"

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** Fraction of the pointer's offset from centre that the element follows. */
  strength?: number
}

/**
 * Gently pulls its child towards a mouse cursor hovering over it, then springs
 * back. Disabled for touch input and when reduced motion is requested.
 */
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onPointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span className={className} style={{ x: springX, y: springY }} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </m.span>
  )
}
