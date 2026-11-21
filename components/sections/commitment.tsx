import { Quote } from "lucide-react"
import Image from "next/image"

import { BrandBar } from "@/components/brand/brand-mark"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { images } from "@/config/images"
import { organization } from "@/config/organization"

export function Commitment() {
  const { commitment } = organization

  return (
    <section aria-labelledby="commitment-heading" className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6">
          <TiltCard className="rounded-leaf-lg" max={6}>
            <div className="relative aspect-4/3 overflow-hidden rounded-leaf-lg shadow-[0_40px_70px_-40px_oklch(0.2_0.1_280/0.55)]">
              <Image
                src={images.commitment.src}
                alt={images.commitment.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-tr from-brand/50 via-transparent to-transparent" />
            </div>
            {/* The client's lead statement, floating in front of the photo. */}
            <div className="relative -mt-14 ml-6 max-w-sm rounded-leaf bg-brand p-6 text-brand-foreground shadow-[0_24px_48px_-20px_oklch(0.2_0.1_280/0.6)] translate-z-16 sm:ml-10 sm:p-7 lg:absolute lg:-right-8 lg:-bottom-10 lg:mt-0 lg:ml-0">
              <Quote className="size-7 text-highlight" fill="currentColor" strokeWidth={0} aria-hidden="true" />
              <h2 id="commitment-heading" className="mt-3 font-heading text-xl leading-snug font-bold sm:text-2xl">
                {commitment.lead}
              </h2>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-highlight uppercase">
            <BrandBar />
            {commitment.eyebrow}
          </p>
          <div className="space-y-6 text-base leading-relaxed text-white/80 sm:text-lg">
            {commitment.paragraphs.map((paragraph) => (
              <p key={paragraph} className="border-l-2 border-brand-2 pl-5">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
