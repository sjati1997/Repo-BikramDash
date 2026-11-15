import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { SectionHeading } from "@/components/ui/section-heading"
import { organization } from "@/config/organization"

export function WhatWeDo() {
  const { whatWeDo, contactSection } = organization

  return (
    <section id="what-we-do" aria-labelledby="what-we-do-heading" className="section-y bg-surface">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="what-we-do-heading" eyebrow={whatWeDo.eyebrow} title={whatWeDo.heading} />
        </Reveal>

        {/* Hairline grid: the dividers light up near the cursor. */}
        <Spotlight as="ul" className="spotlight-grid mt-14 grid gap-px p-px md:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              as="li"
              delay={index * 0.06}
              className="group bg-background p-7 transition-colors duration-300 hover:bg-brand-soft sm:p-8"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-leaf-sm bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-highlight">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Reveal>
          ))}
          {/* Sixth cell (large screens): a route to the contact form keeps the grid even. */}
          <li className="hidden lg:block">
            <Link
              href="/contact"
              className="group flex h-full flex-col justify-between bg-brand p-8 text-brand-foreground transition-colors duration-300 hover:bg-brand-2"
            >
              <span className="text-xs font-semibold tracking-[0.18em] text-highlight uppercase">{contactSection.eyebrow}</span>
              <span className="flex items-center justify-between gap-4 font-heading text-2xl font-bold">
                {contactSection.heading}
                <ArrowRight className="size-6 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </Spotlight>
      </div>
    </section>
  )
}
