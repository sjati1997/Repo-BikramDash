"use client"

import { m, useInView, useReducedMotion, type Variants } from "framer-motion"
import { useRef } from "react"

import { organization } from "@/config/organization"

/** Seconds between one step activating and the next. */
const STEP = 0.75
/** Pause after the steps scroll into view before step 01 activates. */
const START = 0.25

const activateAt = (index: number) => START + index * STEP

const tileVariants: Variants = {
  idle: { opacity: 0, scale: 0.6 },
  active: (index: number) => ({
    opacity: 1,
    scale: [0.6, 1.12, 1],
    transition: { delay: activateAt(index), duration: 0.5, ease: "easeOut" },
  }),
}

const pulseVariants: Variants = {
  idle: { opacity: 0, scale: 0.85 },
  active: (index: number) => ({
    opacity: [0, 0.9, 0],
    scale: [0.85, 1.25, 1.45],
    transition: { delay: activateAt(index), duration: 0.9, ease: "easeOut" },
  }),
}

const textVariants: Variants = {
  idle: { opacity: 0.35, y: 6 },
  active: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: activateAt(index) + 0.1, duration: 0.45, ease: "easeOut" },
  }),
}

/** The connector after step `index` fills while travelling to the next step. */
const fillTransition = (index: number) => ({ delay: activateAt(index) + 0.25, duration: STEP - 0.25, ease: "linear" as const })

const fillX: Variants = {
  idle: { scaleX: 0 },
  active: (index: number) => ({ scaleX: 1, transition: fillTransition(index) }),
}

const fillY: Variants = {
  idle: { scaleY: 0 },
  active: (index: number) => ({ scaleY: 1, transition: fillTransition(index) }),
}

/**
 * "Listen. Understand. Collaborate. Deliver." as a live progress sequence:
 * when the steps come into view (on every visit to the page), step 01
 * activates, a progress line fills to 02, and so on to 04. Once filled, a
 * soft light keeps flowing along the line. Horizontal on large screens,
 * vertical when stacked. Shown completed, without motion, for reduced motion.
 */
export function ApproachSteps() {
  const { steps } = organization.approach
  const listRef = useRef<HTMLOListElement>(null)
  const inView = useInView(listRef, { once: true, amount: 0.35 })
  const reduceMotion = useReducedMotion()

  const state = reduceMotion || inView ? "active" : "idle"
  const initial = reduceMotion ? "active" : "idle"

  return (
    <ol ref={listRef} className="relative mt-6 grid lg:mt-10 lg:grid-cols-4">
      {steps.map(({ icon: Icon, title }, index) => {
        const isLast = index === steps.length - 1
        return (
          <li
            key={title}
            className="group relative flex items-center gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-6 lg:px-3 lg:pb-0 lg:text-center"
          >
            {!isLast && (
              <>
                {/* Vertical connector (stacked layout): from this tile down to the next. */}
                <span aria-hidden="true" className="absolute top-[4.5rem] bottom-2 left-8 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-border lg:hidden">
                  <m.span
                    className="progress-flow-y absolute inset-0 origin-top"
                    custom={index}
                    variants={reduceMotion ? undefined : fillY}
                    initial={initial}
                    animate={state}
                  />
                </span>
                {/* Horizontal connector (large screens): from this tile across to the next. */}
                <span
                  aria-hidden="true"
                  className="absolute top-8 right-[calc(-50%+2.5rem)] left-[calc(50%+2.5rem)] hidden h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-border lg:block"
                >
                  <m.span
                    className="progress-flow-x absolute inset-0 origin-left"
                    custom={index}
                    variants={reduceMotion ? undefined : fillX}
                    initial={initial}
                    animate={state}
                  />
                </span>
              </>
            )}

            {/* Step tile: dim until its turn, then lights up with a pulse. */}
            <span className="relative inline-flex size-16 shrink-0 items-center justify-center rounded-leaf bg-brand-soft text-brand/35 transition-transform duration-300 group-hover:-translate-y-1">
              <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
              <m.span
                aria-hidden="true"
                className="absolute -inset-2 rounded-leaf border-2 border-highlight"
                custom={index}
                variants={pulseVariants}
                initial="idle"
                animate={reduceMotion ? "idle" : state}
              />
              <m.span
                aria-hidden="true"
                className="absolute inset-0 inline-flex items-center justify-center rounded-leaf bg-brand text-highlight shadow-[0_14px_28px_-12px_oklch(0.3_0.2_280/0.6)]"
                custom={index}
                variants={tileVariants}
                initial={initial}
                animate={state}
              >
                <Icon className="size-7" strokeWidth={1.75} />
              </m.span>
            </span>

            <m.span
              className="flex flex-col gap-1 lg:gap-3"
              custom={index}
              variants={textVariants}
              initial={initial}
              animate={state}
            >
              <span className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
                <span className="text-brand-2">.</span>
              </span>
              <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase tabular-nums">
                Step {String(index + 1).padStart(2, "0")}
              </span>
            </m.span>
          </li>
        )
      })}
    </ol>
  )
}
