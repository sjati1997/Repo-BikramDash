"use client"

import { m, useTransform } from "framer-motion"
import Image, { type StaticImageData } from "next/image"

import { usePointerParallax } from "@/components/motion/use-pointer-parallax"
import { cn } from "@/lib/utils"

type ParallaxImageProps = {
  src: StaticImageData
  alt: string
  /** Max shift in px at the screen edge. Keep below 32 (the overscan). */
  strength?: number
  priority?: boolean
  sizes?: string
  className?: string
}

/**
 * A cover photo that shifts gently against the cursor, giving the section a
 * sense of depth. It is overscanned by 2rem on every side so edges never show.
 * Must be placed inside a positioned element with `overflow: hidden`.
 */
export function ParallaxImage({ src, alt, strength = 16, priority = false, sizes = "100vw", className }: ParallaxImageProps) {
  const { x, y } = usePointerParallax({ stiffness: 40, damping: 20 })
  const translateX = useTransform(x, (value) => value * -strength)
  const translateY = useTransform(y, (value) => value * -strength)

  return (
    <m.div aria-hidden={alt === "" ? true : undefined} className="absolute -inset-8" style={{ x: translateX, y: translateY }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        className={cn("object-cover", className)}
      />
    </m.div>
  )
}
