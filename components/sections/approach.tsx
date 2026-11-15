import { BrandBar } from "@/components/brand/brand-mark"
import { Reveal } from "@/components/motion/reveal"
import { ApproachSteps } from "@/components/sections/approach-steps"
import { organization } from "@/config/organization"

export function Approach() {
  const { approach } = organization

  return (
    <section id="approach" aria-labelledby="approach-heading" className="section-y">
      <div className="container-page">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            <BrandBar />
            {approach.eyebrow}
          </p>
          {/* The heading is the four steps themselves, shown as a sequence. */}
          <h2 id="approach-heading" className="sr-only">
            {approach.heading}
          </h2>
        </Reveal>

        {/* Plays as a progress sequence, 01 → 04, each time the page is visited. */}
        <ApproachSteps />

        <Reveal delay={0.1} className="mt-14 grid gap-6 border-t border-border pt-10 text-base leading-relaxed text-muted-foreground sm:text-lg lg:grid-cols-3 lg:gap-10">
          {approach.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
