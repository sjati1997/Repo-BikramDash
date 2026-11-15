import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { brandMarkPaths } from "@/components/brand/brand-mark"
import { Logo } from "@/components/layout/logo"
import { SocialIcon } from "@/components/ui/social-icon"
import { addressLines, organization, phoneHref, websiteLabel } from "@/config/organization"

const linkClass = "text-white/70 transition-colors hover:text-white"

export function Footer() {
  const { contact, navigation, socialLinks } = organization
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate mt-10 overflow-hidden bg-ink text-white sm:mt-16 [&_a:focus-visible]:outline-white">
      {/* Three-colour rule echoing the logo. */}
      <div aria-hidden="true" className="grid h-1 grid-cols-[3fr_2fr_1fr]">
        <span className="bg-brand" />
        <span className="bg-brand-2" />
        <span className="bg-highlight" />
      </div>

      {/* Soft indigo glow and an oversized outline of the logo mark as a watermark. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 size-[36rem] rounded-full bg-brand/45 blur-3xl" />
        <div className="absolute -right-20 -bottom-48 size-[28rem] rounded-full bg-brand-2/30 blur-3xl" />
        <svg viewBox="0 0 626 626" className="absolute -right-16 -bottom-24 size-[26rem] text-white opacity-[0.06] sm:size-[32rem]">
          {Object.values(brandMarkPaths).map((d) => (
            <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="5" />
          ))}
        </svg>
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-5">
          {/* The logo keeps its own light tile: its indigo letters need a light backdrop. */}
          <div className="inline-flex rounded-leaf bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]">
            <Logo size="lg" />
          </div>
          <p className="mt-8 max-w-sm font-heading text-xl font-bold">{organization.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{organization.description}</p>
          {socialLinks.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${organization.name} on ${link.label} (opens in a new tab)`}
                    className="inline-flex size-10 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-highlight hover:bg-highlight hover:text-highlight-foreground"
                  >
                    <SocialIcon platform={link.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-highlight uppercase">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-highlight uppercase">Contact</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            {contact.address && (
              <p className="text-white/70">
                {addressLines(contact.address).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </p>
            )}
            {contact.phone && (
              <p>
                <a href={phoneHref(contact.phone)} className={linkClass}>
                  {contact.phone}
                </a>
              </p>
            )}
            {contact.officeHours?.map((entry) => (
              <p key={`${entry.days ?? ""}${entry.hours}`} className="text-white/70">
                {entry.days ? `${entry.days}: ` : "Office hours: "}
                {entry.hours}
              </p>
            ))}
            <p>
              <a href={contact.website} className={linkClass}>
                {websiteLabel}
              </a>
            </p>
          </address>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-leaf-sm bg-highlight px-5 py-3 text-xs font-semibold tracking-[0.14em] text-highlight-foreground uppercase transition-colors hover:bg-white"
          >
            Send us a message
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {organization.legalName}. All rights reserved.
          </p>
          <a href="#main" className="transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
