"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string }

/** Brand colours as RGB triplets (white, highlight yellow, a light blue that reads on navy). */
const NODE_COLORS = ["255 255 255", "255 255 255", "255 255 255", "255 222 89", "120 170 255"]
const LINK_DISTANCE = 150
const POINTER_DISTANCE = 190
const MAX_SPEED = 0.35

/**
 * Live background: a slowly drifting network of nodes, linked when close —
 * a picture of connections between people and opportunities. Nodes link to
 * and lean towards a mouse cursor. Pauses off-screen and in hidden tabs, and
 * draws a single still frame when reduced motion is requested.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const pointer = { x: 0, y: 0, active: false }
    let nodes: Node[] = []
    let width = 0
    let height = 0
    let frame = 0
    let visible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      // Density scales with area; fewer nodes on small screens.
      const count = Math.round(Math.min(110, Math.max(28, (width * height) / 13000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * MAX_SPEED * 2,
        vy: (Math.random() - 0.5) * MAX_SPEED * 2,
        r: Math.random() * 1.6 + 0.8,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      }))
      if (reduceMotion) draw()
    }

    const step = () => {
      for (const node of nodes) {
        // Gentle pull towards the cursor when it is near.
        if (pointer.active) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const distance = Math.hypot(dx, dy)
          if (distance < POINTER_DISTANCE && distance > 1) {
            node.vx += (dx / distance) * 0.012
            node.vy += (dy / distance) * 0.012
          }
        }
        const speed = Math.hypot(node.vx, node.vy)
        if (speed > MAX_SPEED * 1.6) {
          node.vx *= 0.96
          node.vy *= 0.96
        }
        node.x += node.vx
        node.y += node.vy
        // Wrap around the edges so the field never empties.
        if (node.x < -10) node.x = width + 10
        if (node.x > width + 10) node.x = -10
        if (node.y < -10) node.y = height + 10
        if (node.y > height + 10) node.y = -10
      }
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance < LINK_DISTANCE) {
            context.strokeStyle = `rgb(255 255 255 / ${(1 - distance / LINK_DISTANCE) * 0.22})`
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
        if (pointer.active) {
          const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (distance < POINTER_DISTANCE) {
            context.strokeStyle = `rgb(255 222 89 / ${(1 - distance / POINTER_DISTANCE) * 0.55})`
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(pointer.x, pointer.y)
            context.stroke()
          }
        }
      }

      for (const node of nodes) {
        context.fillStyle = `rgb(${node.color} / 0.85)`
        context.beginPath()
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        context.fill()
      }
    }

    const loop = () => {
      step()
      draw()
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (!reduceMotion && visible && !document.hidden) frame = requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    visibilityObserver.observe(canvas)
    document.addEventListener("visibilitychange", start)
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      document.documentElement.addEventListener("pointerleave", onPointerLeave)
    }

    resize()
    start()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener("visibilitychange", start)
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none", className)} />
}
