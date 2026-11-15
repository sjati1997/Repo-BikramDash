import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { SectionHeading } from "@/components/ui/section-heading"
import { organization, type Service } from "@/config/organization"

export function Services() {
  const { services } = organization

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="services-heading" eyebrow={services.eyebrow} title={services.heading} />
        </Reveal>

        <Spotlight as="ul" className="mt-14 grid gap-6 md:grid-cols-2">
          {services.items.map((service, index) => (
            <Reveal key={service.title} as="li" delay={index * 0.06} className="h-full">
              <ServiceCard {...service} number={index + 1} />
            </Reveal>
          ))}
        </Spotlight>
      </div>
    </section>
  )
}

export function ServiceCard({ icon: Icon, title, description, cta, number }: Service & { number: number }) {
  return (
    <article
      data-spotlight-item
      className="spotlight-card group relative flex h-full flex-col border border-border bg-card p-7 transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_40px_-28px_oklch(0.2_0.1_280/0.4)] has-focus-visible:border-brand sm:p-9"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="inline-flex size-12 items-center justify-center rounded-leaf-sm bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-highlight">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="font-heading text-4xl font-bold text-brand/10 tabular-nums transition-colors duration-300 group-hover:text-brand-2/25">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-heading text-xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{description}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-7 inline-flex items-center gap-1.5 self-start text-xs font-semibold tracking-[0.14em] text-brand-2 uppercase after:absolute after:inset-0 focus-visible:outline-offset-4"
        >
          {cta.label}
          <span className="sr-only"> about {title}</span>
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </article>
  )
}
