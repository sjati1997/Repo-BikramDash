"use client"

import { useRef } from "react"

type SpotlightProps = {
  as?: "div" | "ul" | "section"
  className?: string
  children: React.ReactNode
} & Pick<React.HTMLAttributes<HTMLElement>, "id" | "aria-labelledby">

/**
 * Tracks a mouse pointer and exposes its position as CSS custom properties:
 * `--spot-x` / `--spot-y` on the container itself, and on every descendant
 * marked `data-spotlight-item` (relative to that element). The visual effect
 * lives in CSS (`.spotlight-card`, `.spotlight-grid`, `.spotlight-glow` in
 * globals.css), so moving the mouse never re-renders React.
 *
 * Touch and pen input are ignored; nothing moves, so reduced-motion
 * preferences are unaffected.
 */
export function Spotlight({ as: Component = "div", className, children, ...rest }: SpotlightProps) {
  const frame = useRef(0)

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return
    const root = event.currentTarget
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      setPosition(root, clientX, clientY)
      root.querySelectorAll<HTMLElement>("[data-spotlight-item]").forEach((item) => setPosition(item, clientX, clientY))
    })
  }

  return (
    <Component className={className} data-spotlight="" onPointerMove={onPointerMove} {...rest}>
      {children}
    </Component>
  )
}

function setPosition(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect()
  element.style.setProperty("--spot-x", `${clientX - rect.left}px`)
  element.style.setProperty("--spot-y", `${clientY - rect.top}px`)
}
