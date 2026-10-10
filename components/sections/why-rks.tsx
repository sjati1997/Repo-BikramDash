import { ParallaxImage } from "@/components/motion/parallax-image"
import { Reveal } from "@/components/motion/reveal"
import { Spotlight } from "@/components/motion/spotlight"
import { images } from "@/config/images"
import { organization } from "@/config/organization"

export function WhyRks() {
  const { whyRks } = organization

  return (
    <Spotlight
      as="section"
      id="why-rks"
      aria-labelledby="why-rks-heading"
      className="relative overflow-hidden bg-brand py-16 text-brand-foreground md:py-20"
    >
      {/* City lights across the globe glow through the indigo, fading out behind the text. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden opacity-55 mix-blend-screen [mask-image:linear-gradient(to_right,transparent_5%,black_55%)]"
      >
        <ParallaxImage src={images.network.src} alt={images.network.alt} strength={10} sizes="70vw" />
      </div>
      <div aria-hidden="true" className="spotlight-glow" />
      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <h2 id="why-rks-heading" className="font-heading text-3xl leading-tight font-bold sm:text-4xl">
            {whyRks.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">{whyRks.description}</p>
        </Reveal>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-highlight uppercase">{whyRks.label}</p>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-leaf bg-white/15 sm:grid-cols-2">
            {whyRks.items.map(({ icon: Icon, title }, index) => (
              <Reveal
                key={title}
                as="li"
                delay={index * 0.06}
                className="group flex items-center gap-4 bg-brand/85 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--brand)_80%,white)]"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-leaf-sm bg-highlight text-highlight-foreground transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-heading text-lg font-bold">{title}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Spotlight>
  )
}
