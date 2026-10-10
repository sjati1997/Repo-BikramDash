import { BrandBar } from "@/components/brand/brand-mark"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          <BrandBar />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-heading text-3xl leading-[1.12] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  )
}
