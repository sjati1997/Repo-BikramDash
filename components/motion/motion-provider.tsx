"use client"

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/**
 * Loads only the DOM animation feature set and makes every animation honour
 * the visitor's `prefers-reduced-motion` setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
