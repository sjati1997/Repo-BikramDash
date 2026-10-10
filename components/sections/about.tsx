import { Building2 } from "lucide-react"
import Image from "next/image"

import { BrandMark } from "@/components/brand/brand-mark"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { SectionHeading } from "@/components/ui/section-heading"
import { images } from "@/config/images"
import { organization } from "@/config/organization"

export function About() {
  const { about } = organization

  return (
    <section id="about" aria-labelledby="about-heading" className="section-y">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7 lg:order-2">
          <Reveal>
            <SectionHeading id="about-heading" eyebrow={about.eyebrow} title={about.heading} />
          </Reveal>
          <Reveal delay={0.08} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5 lg:order-1">
          <TiltCard className="mr-4 rounded-leaf-lg sm:mr-0" max={6}>
            <div className="relative aspect-4/3 overflow-hidden rounded-leaf-lg bg-surface shadow-[0_40px_70px_-40px_oklch(0.2_0.1_280/0.55)] sm:aspect-16/10 lg:aspect-4/5">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-brand/45 via-transparent to-transparent" />
            </div>
            {/* Floats in front of the photo when the card tilts. */}
            <div className="absolute -right-4 -bottom-6 flex items-center gap-3 rounded-leaf bg-background p-4 pr-6 shadow-[0_20px_40px_-20px_oklch(0.2_0.1_280/0.5)] translate-z-16 sm:right-auto sm:-left-6">
              <BrandMark className="size-10" />
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{organization.legalName}</p>
                <p className="text-xs text-muted-foreground">Technology consulting &amp; talent solutions</p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>

      <div className="container-page mt-20">
        <Reveal>
          <div className="rounded-leaf border border-border bg-surface p-6 sm:p-8">
            <h3 className="flex items-center gap-3 font-heading text-lg font-bold text-foreground">
              <span className="inline-flex size-9 items-center justify-center rounded-leaf-sm bg-brand text-highlight">
                <Building2 className="size-4" aria-hidden="true" />
              </span>
              Company at a glance
            </h3>
            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
              {about.companyFacts.map((fact) => (
                <div key={fact.label} className="border-l-2 border-brand-2 pl-4">
                  <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{fact.label}</dt>
                  <dd className="mt-1 font-medium text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
