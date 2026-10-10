import { BrandBar } from "@/components/brand/brand-mark"
import { Reveal } from "@/components/motion/reveal"
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

        <ol className="relative mt-4 grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-brand/20 lg:block" />
          {approach.steps.map(({ icon: Icon, title }, index) => (
            <Reveal key={title} as="li" delay={index * 0.08} className="group relative flex items-center gap-5 sm:flex-col sm:items-start">
              <span className="relative inline-flex size-16 items-center justify-center rounded-leaf bg-brand text-highlight transition-transform duration-300 group-hover:-translate-y-1">
                <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1 sm:gap-5">
                <span className="font-heading text-3xl font-bold tracking-tight text-foreground sm:order-1 sm:text-4xl">
                  {title}
                  <span className="text-brand-2">.</span>
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase tabular-nums sm:order-2">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </span>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-14 grid gap-6 border-t border-border pt-10 text-base leading-relaxed text-muted-foreground sm:text-lg lg:grid-cols-3 lg:gap-10">
          {approach.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
