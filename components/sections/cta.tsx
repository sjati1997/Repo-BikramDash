import { ArrowRight } from "lucide-react"

import { brandMarkPaths } from "@/components/brand/brand-mark"
import { Magnetic } from "@/components/motion/magnetic"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { Reveal } from "@/components/motion/reveal"
import { buttonVariants } from "@/components/ui/button"
import { images } from "@/config/images"
import { organization } from "@/config/organization"
import { cn } from "@/lib/utils"

/** "Building Relationships That Last" band, closing with a route to the contact form. */
export function CallToAction() {
  const { relationships } = organization

  return (
    <section aria-labelledby="relationships-heading" className="section-y">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-leaf-lg bg-brand-2 px-6 py-14 text-brand-2-foreground sm:px-12 md:py-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-16">
            {/* Glass towers behind the blue, dimmed on the text side for readability. */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-40 mix-blend-luminosity">
              <ParallaxImage src={images.relationships.src} alt={images.relationships.alt} strength={12} sizes="(min-width: 1280px) 1200px, 100vw" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-brand-2 via-brand-2/85 to-brand-2/40" />
            {/* Logo shapes as a quiet outline motif. */}
            <svg aria-hidden="true" viewBox="0 0 626 626" className="absolute -top-10 -right-10 size-72 text-white opacity-15 sm:size-80">
              {Object.values(brandMarkPaths).map((d) => (
                <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="6" />
              ))}
            </svg>
            <div className="relative lg:col-span-8">
              <h2 id="relationships-heading" className="font-heading text-3xl leading-tight font-bold sm:text-4xl">
                {relationships.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed opacity-90 sm:text-lg">
                {relationships.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <Magnetic className="relative mt-8 inline-flex lg:col-span-4 lg:mt-0 lg:justify-self-end">
              <a
                href={relationships.action.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group bg-highlight text-highlight-foreground hover:bg-white focus-visible:ring-white focus-visible:ring-offset-brand-2"
                )}
              >
                {relationships.action.label}
                <ArrowRight data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
