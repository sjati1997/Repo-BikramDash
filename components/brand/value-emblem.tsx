import { cn } from "@/lib/utils"

/**
 * Custom emblems for the RKS values. Each sits on the logo's "leaf" badge
 * (rounded top-left and bottom-right corners) in brand indigo, with a white
 * line drawing and a yellow accent. 64×64 viewBox; scales cleanly.
 */

export type ValueEmblemName =
  | "integrity"
  | "excellence"
  | "innovation"
  | "client-success"
  | "partnership"
  | "accountability"
  | "continuous-improvement"

const LINE = { fill: "none", stroke: "white", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const
const ACCENT = { ...LINE, stroke: "var(--highlight)", strokeWidth: 3 } as const

const glyphs: Record<ValueEmblemName, React.ReactNode> = {
  // Shield with a check mark.
  integrity: (
    <>
      <path {...LINE} d="M32 13 46 18.5V30c0 9.5-6 16-14 20.5C24 46 18 39.5 18 30V18.5Z" />
      <path {...ACCENT} d="m25 31.5 5 5 9.5-10" />
    </>
  ),
  // Medal with a star and ribbons.
  excellence: (
    <>
      <path {...LINE} d="m26.5 36.5-3 12 4.5-2 3 3.5M37.5 36.5l3 12-4.5-2-3 3.5" />
      <circle {...LINE} cx="32" cy="27" r="11" />
      <path
        fill="var(--highlight)"
        d="M32 20.5l1.6 4.1 4.4.2-3.4 2.8 1.2 4.3-3.8-2.5-3.8 2.5 1.2-4.3-3.4-2.8 4.4-.2Z"
      />
    </>
  ),
  // Light bulb with a spark.
  innovation: (
    <>
      <path {...LINE} d="M26 39c-3.6-2.6-6-6.6-6-11a12 12 0 0 1 24 0c0 4.4-2.4 8.4-6 11v3.5H26Z" />
      <path {...LINE} d="M27.5 47h9M29.5 51h5" />
      <path {...ACCENT} d="m28.5 32 3.5-4.5 3.5 4.5M32 27.5V39" />
      <path {...ACCENT} d="M32 8.5V11M18.5 13.5l1.8 1.8M45.5 13.5l-1.8 1.8" />
    </>
  ),
  // Rising bars with an upward trend arrow.
  "client-success": (
    <>
      <path {...LINE} d="M17 50h30" />
      <rect {...LINE} x="19" y="38" width="6" height="12" rx="1" />
      <rect {...LINE} x="29" y="32" width="6" height="18" rx="1" />
      <rect {...LINE} x="39" y="26" width="6" height="24" rx="1" />
      <path {...ACCENT} d="m18 29 9-8 6 4 12-11M39 14h6v6" />
    </>
  ),
  // Two interlocking rings.
  partnership: (
    <>
      <circle {...LINE} cx="26" cy="32" r="11" />
      <circle {...ACCENT} cx="38" cy="32" r="11" />
      {/* Re-draw the white ring over the yellow one at the top crossing so they interlock. */}
      <path {...LINE} d="M28.85 21.37A11 11 0 0 1 34.43 24.93" />
    </>
  ),
  // Clipboard with ticked items.
  accountability: (
    <>
      <rect {...LINE} x="19" y="16" width="26" height="34" rx="3" />
      <path {...LINE} d="M27 13h10v6H27Z" />
      <path {...ACCENT} d="m24.5 28 2.5 2.5 4-4.5M24.5 39l2.5 2.5 4-4.5" />
      <path {...LINE} d="M34.5 28.5H40M34.5 39.5H40" />
    </>
  ),
  // Cycle arrow around an upward arrow.
  "continuous-improvement": (
    <>
      <path {...LINE} d="M45.5 27.5A14 14 0 1 0 46 36" />
      <path {...LINE} d="m42 39.5 4-4 4 4" />
      <path {...ACCENT} d="M32 40V25M26.5 30.5 32 25l5.5 5.5" />
    </>
  ),
}

export function ValueEmblem({ name, className }: { name: ValueEmblemName; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", className)}>
      {/* Leaf badge from the logo; turns brand blue when the parent card (".group") is hovered. */}
      <path
        d="M14 0H64V50A14 14 0 0 1 50 64H0V14A14 14 0 0 1 14 0Z"
        className="fill-brand transition-colors duration-300 group-hover:fill-brand-2"
      />
      {glyphs[name]}
    </svg>
  )
}
