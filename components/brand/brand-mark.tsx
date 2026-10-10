/**
 * The RKS logo mark, redrawn as SVG from the source artwork
 * (assets/brand/rks-logo-source.png) so it stays crisp at any size.
 */
export const brandMarkPaths = {
  indigo: "M200 0H299V426A200 200 0 0 1 99 626H0V200A200 200 0 0 1 200 0Z",
  blue: "M408 0H626V218A80 80 0 0 1 546 298H328V80A80 80 0 0 1 408 0Z",
  yellow: "M328 327H546A80 80 0 0 1 626 407V626H408A80 80 0 0 1 328 546Z",
} as const

export function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 626 626"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={brandMarkPaths.indigo} fill="var(--brand)" />
      <path d={brandMarkPaths.blue} fill="var(--brand-2)" />
      <path d={brandMarkPaths.yellow} fill="var(--highlight)" />
    </svg>
  )
}

/** Three-colour bar used as a small brand accent (eyebrows, footer rule). */
export function BrandBar({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex shrink-0 gap-0.5 ${className ?? ""}`}>
      <span className="h-1 w-4 bg-brand" />
      <span className="h-1 w-4 bg-brand-2" />
      <span className="h-1 w-4 bg-highlight" />
    </span>
  )
}
