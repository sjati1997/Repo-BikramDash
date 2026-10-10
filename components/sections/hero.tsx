import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"

import { BrandBar } from "@/components/brand/brand-mark"
import { Magnetic } from "@/components/motion/magnetic"
import { NetworkCanvas } from "@/components/motion/network-canvas"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { ParallaxMark } from "@/components/motion/parallax-mark"
import { TiltCard } from "@/components/motion/tilt-card"
import { buttonVariants } from "@/components/ui/button"
import { images } from "@/config/images"
import { organization } from "@/config/organization"
import { cn } from "@/lib/utils"

// The entrance uses CSS animations (not JS) so the headline paints immediately,
// keeping Largest Contentful Paint fast. Reduced-motion users get no movement.
const enter = "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out"

export function Hero() {
  const { hero, services } = organization

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink pt-28 pb-28 text-white md:pt-32"
    >
      {/* Live background: slowly zooming photo, navy/indigo overlays, then an animated network. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <ParallaxImage
          src={images.hero.src}
          alt={images.hero.alt}
          priority
          strength={18}
          className="object-[60%_center] motion-safe:animate-[kenburns_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--ink)_0%,color-mix(in_oklab,var(--ink)_90%,transparent)_38%,color-mix(in_oklab,var(--brand)_62%,transparent)_72%,color-mix(in_oklab,var(--brand)_45%,transparent)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink/70 to-transparent" />
        <NetworkCanvas className="absolute inset-0 size-full" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className={cn(enter, "mb-6 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-highlight uppercase")}>
            <BrandBar />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className={cn(enter, "font-heading text-[2.6rem] leading-[1.04] font-bold tracking-tight sm:text-6xl lg:text-7xl")}
            style={{ animationDelay: "80ms" }}
          >
            {hero.headline}
          </h1>

          <p
            className={cn(enter, "mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg")}
            style={{ animationDelay: "160ms" }}
          >
            {hero.description}
          </p>

          <div className={cn(enter, "mt-10 flex flex-col gap-3 sm:flex-row")} style={{ animationDelay: "240ms" }}>
            <Magnetic className="flex">
              <a
                href={hero.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group w-full bg-highlight text-highlight-foreground hover:bg-white focus-visible:ring-white focus-visible:ring-offset-ink"
                )}
              >
                {hero.primaryCta.label}
                <ArrowRight data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/15 hover:text-white focus-visible:ring-white focus-visible:ring-offset-ink"
              )}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className={cn(enter, "lg:col-span-5")} style={{ animationDelay: "200ms" }}>
          <HeroCard items={services.items.map((service) => service.title)} />
        </div>
      </div>

      <a
        href="#why-rks"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.7rem] font-semibold tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white sm:flex"
      >
        Scroll
        <ChevronDown className="size-5 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}

/** Services card that tilts in 3D towards the cursor, with the logo shapes floating in front of it. */
function HeroCard({ items }: { items: readonly string[] }) {
  return (
    <div className="relative mx-auto max-w-md pt-6 lg:mr-0 lg:ml-auto">
      <TiltCard className="rounded-leaf-lg" max={9}>
        {/* transform-3d (and no backdrop blur) so the inner layers keep their depth. */}
        <div className="rounded-leaf-lg border border-white/20 bg-white p-7 text-foreground shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] transform-3d sm:p-9">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase translate-z-6">Our services</p>
          <ul className="mt-6 space-y-3 translate-z-10">
            {items.map((item, index) => (
              <li key={item} className="flex items-center gap-4 rounded-leaf-sm bg-surface px-4 py-3 text-sm font-semibold">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-leaf-sm bg-brand font-heading text-xs text-highlight tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#services"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-brand-2 uppercase underline-offset-4 translate-z-6 hover:underline"
          >
            Explore our services
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        {/* Logo shapes hovering in front of the card, each drifting at its own depth. */}
        <ParallaxMark className="pointer-events-none absolute -top-10 right-3 w-24 sm:-right-6 translate-z-20 drop-shadow-[0_18px_24px_rgb(0_0_0/0.35)] sm:w-28" />
      </TiltCard>
    </div>
  )
}
