import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/contact/contact-form"
import { LocationMap } from "@/components/contact/location-map"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import { SocialIcon } from "@/components/ui/social-icon"
import { organization } from "@/config/organization"
import { googleMapsLinkUrl } from "@/lib/maps"

const linkClass = "underline-offset-4 hover:text-brand-2 hover:underline"

export function Contact() {
  const { contact, contactSection, socialLinks } = organization

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-y bg-surface">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id="contact-heading"
              eyebrow={contactSection.eyebrow}
              title={contactSection.heading}
              description={contactSection.description}
            />
          </Reveal>

          {/* Only details that have been supplied are shown. */}
          <Reveal delay={0.08}>
            <ul className="mt-12 space-y-7">
              {contact.address && (
                <InfoItem icon={<MapPin />} label="Office">
                  <address className="not-italic">
                    {contact.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  {contact.location && (
                    <a
                      href={googleMapsLinkUrl(contact.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-brand-2 underline-offset-4 hover:underline"
                    >
                      View on map<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </InfoItem>
              )}
              {contact.email && (
                <InfoItem icon={<Mail />} label="Email">
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </InfoItem>
              )}
              {contact.phone && (
                <InfoItem icon={<Phone />} label="Phone">
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </InfoItem>
              )}
              {contact.officeHours && (
                <InfoItem icon={<Clock />} label="Business hours">
                  <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                    {contact.officeHours.map((entry) => (
                      <div key={entry.days} className="contents">
                        <dt>{entry.days}</dt>
                        <dd className="text-muted-foreground">{entry.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </InfoItem>
              )}
            </ul>

            {contact.location && (
              <div className="mt-10">
                <LocationMap location={contact.location} title={`${organization.name} office location on Google Maps`} />
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">Follow us</p>
                <ul className="mt-4 flex gap-2">
                  {socialLinks.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.label} (opens in a new tab)`}
                        className="inline-flex size-10 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-brand hover:bg-brand hover:text-highlight"
                      >
                        <SocialIcon platform={link.platform} className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-leaf border border-border border-t-4 border-t-brand bg-background p-6 shadow-[0_24px_60px_-40px_oklch(0.2_0.1_280/0.35)] sm:p-10">
            <h3 className="font-heading text-2xl font-bold text-foreground">Send us a message</h3>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">
              Tell us what you&apos;re looking for and our team will get back to you by email.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function InfoItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden="true"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-leaf-sm bg-brand-soft text-brand [&_svg]:size-4"
      >
        {icon}
      </span>
      <div className="text-sm leading-relaxed text-foreground sm:text-base">
        <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
        {children}
      </div>
    </li>
  )
}
