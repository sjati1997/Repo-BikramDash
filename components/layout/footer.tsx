import { Logo } from "@/components/layout/logo"
import { SocialIcon } from "@/components/ui/social-icon"
import { organization, websiteLabel } from "@/config/organization"

export function Footer() {
  const { contact, navigation, socialLinks } = organization
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background">
      {/* Three-colour rule echoing the logo. */}
      <div aria-hidden="true" className="grid h-1 grid-cols-[3fr_2fr_1fr]">
        <span className="bg-brand" />
        <span className="bg-brand-2" />
        <span className="bg-highlight" />
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo size="lg" />
          <p className="mt-6 max-w-sm font-heading text-lg font-bold text-foreground">{organization.tagline}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{organization.description}</p>
          {socialLinks.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${organization.name} on ${link.label} (opens in a new tab)`}
                    className="inline-flex size-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-brand hover:bg-brand hover:text-highlight"
                  >
                    <SocialIcon platform={link.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-foreground/80 transition-colors hover:text-brand-2">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">Contact</h2>
          <address className="mt-5 space-y-3 text-sm text-foreground/80 not-italic">
            {contact.address && (
              <p>
                {contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
            {contact.email && (
              <p>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-brand-2">
                  {contact.email}
                </a>
              </p>
            )}
            {contact.phone && (
              <p>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-brand-2">
                  {contact.phone}
                </a>
              </p>
            )}
            <p>
              <a href={contact.website} className="transition-colors hover:text-brand-2">
                {websiteLabel}
              </a>
            </p>
            <p>
              <a href="#contact" className="font-medium text-brand-2 underline-offset-4 hover:underline">
                Send us a message
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {organization.legalName}. All rights reserved.
          </p>
          <a href="#top" className="transition-colors hover:text-brand-2">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
