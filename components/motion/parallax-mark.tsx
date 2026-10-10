"use client"

import { m, useTransform, type MotionValue } from "framer-motion"

import { brandMarkPaths } from "@/components/brand/brand-mark"
import { usePointerParallax } from "@/components/motion/use-pointer-parallax"

/** How far (in SVG units) each shape travels at the screen edge — nearer shapes move more. */
const DEPTH = { indigo: 14, blue: 26, yellow: 36 } as const

/**
 * The logo's three shapes, drifting with the mouse at different depths.
 * Static for touch devices and when reduced motion is requested.
 */
export function ParallaxMark({ className }: { className?: string }) {
  const { x, y } = usePointerParallax()

  return (
    <svg viewBox="0 0 626 626" aria-hidden="true" className={className} overflow="visible">
      <Layer d={brandMarkPaths.indigo} fill="var(--brand)" x={x} y={y} depth={DEPTH.indigo} />
      <Layer d={brandMarkPaths.blue} fill="var(--brand-2)" x={x} y={y} depth={DEPTH.blue} />
      <Layer d={brandMarkPaths.yellow} fill="var(--highlight)" x={x} y={y} depth={DEPTH.yellow} />
    </svg>
  )
}

type LayerProps = { d: string; fill: string; x: MotionValue<number>; y: MotionValue<number>; depth: number }

function Layer({ d, fill, x, y, depth }: LayerProps) {
  const translateX = useTransform(x, (value) => value * depth)
  const translateY = useTransform(y, (value) => value * depth)
  return <m.path d={d} fill={fill} style={{ x: translateX, y: translateY }} />
}
