import { BrandBar } from "@/components/brand/brand-mark"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  /** "inverted" = light text, for sections sitting on the dark live background. */
  tone?: "default" | "inverted"
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, align = "left", tone = "default", className }: SectionHeadingProps) {
  const inverted = tone === "inverted"
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase",
            inverted ? "text-highlight" : "text-brand"
          )}
        >
          <BrandBar />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "font-heading text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          inverted ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", inverted ? "text-white/80" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  )
}
