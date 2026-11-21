import { ValueEmblem } from "@/components/brand/value-emblem"
import { Reveal } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { SectionHeading } from "@/components/ui/section-heading"
import { organization } from "@/config/organization"

export function Mission() {
  const { mission } = organization

  return (
    <section id="mission" aria-labelledby="mission-heading" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="mission-heading" eyebrow={mission.eyebrow} title={mission.heading} tone="inverted" />
        </Reveal>

        <Spotlight className="mt-14 grid gap-6 md:grid-cols-2">
          {mission.pillars.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.08} as="article" className="h-full">
              <div data-spotlight-item className="spotlight-card group relative h-full border border-border bg-card p-8 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_18px_40px_-28px_oklch(0.2_0.1_280/0.4)] sm:p-10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-highlight transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="inline-flex size-14 items-center justify-center rounded-leaf bg-brand text-highlight">
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </Reveal>
          ))}
        </Spotlight>

        <div className="mt-16">
          <Reveal>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-highlight uppercase">Our values</h3>
          </Reveal>
          {/* On phones (2 columns) the 7th value spans the full last row. */}
          <Spotlight as="ul" className="mt-6 grid grid-cols-2 gap-4 max-sm:[&>li:last-child:nth-child(odd)]:col-span-2 sm:grid-cols-4 lg:grid-cols-7">
            {mission.values.map(({ emblem, title }, index) => (
              <Reveal key={title} as="li" delay={index * 0.05} className="h-full">
                <div
                  data-spotlight-item
                  className="spotlight-card group relative flex h-full flex-col items-center gap-4 rounded-leaf border border-border bg-card px-3 py-6 text-center transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_18px_36px_-24px_oklch(0.2_0.1_280/0.45)]"
                >
                  <ValueEmblem
                    name={emblem}
                    className="size-16 drop-shadow-[0_10px_14px_oklch(0.3_0.2_280/0.25)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
                  />
                  <span className="font-heading text-sm leading-snug font-bold text-foreground sm:text-base">{title}</span>
                </div>
              </Reveal>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  )
}
