import { NetworkCanvas } from "@/components/motion/network-canvas"

/**
 * Live background shared by every page: a deep navy → indigo gradient with
 * the animated network on top. Fixed to the viewport, so page banners float
 * over it and content panels scroll above it.
 */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_10%,var(--brand)_0%,color-mix(in_oklab,var(--brand)_55%,var(--ink))_38%,var(--ink)_75%)]" />
      {/* Faint technical grid for texture. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <NetworkCanvas className="absolute inset-0 size-full" />
    </div>
  )
}
