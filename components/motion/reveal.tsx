"use client"

import { m } from "framer-motion"

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in seconds — use small increments (0.05–0.1) to stagger siblings. */
  delay?: number
  /** Vertical offset in px the element travels while fading in. */
  y?: number
  as?: "div" | "li" | "article" | "section"
}

/** Fades and lifts content into view once, the first time it is scrolled to. */
export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const Component = m[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  )
}
