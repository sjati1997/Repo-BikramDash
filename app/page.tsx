import type { Metadata } from "next"

import { PageSheet } from "@/components/layout/page-sheet"
import { CallToAction } from "@/components/sections/cta"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { WhyRks } from "@/components/sections/why-rks"
import { organization } from "@/config/organization"
import { siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
}

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <PageSheet>
        <WhyRks />
        <Services />
        <CallToAction />
      </PageSheet>
    </>
  )
}

/** Structured data that helps search engines understand the organization. */
function OrganizationJsonLd() {
  const { contact } = organization
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    legalName: organization.legalName,
    description: organization.description,
    url: siteUrl.href,
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.street,
        addressLocality: contact.address.city,
        addressRegion: contact.address.region,
        postalCode: contact.address.postalCode,
        addressCountry: contact.address.country,
      },
    }),
    ...(organization.socialLinks.length > 0 && { sameAs: organization.socialLinks.map((link) => link.href) }),
  }

  return (
    <script
      type="application/ld+json"
      // Content comes from static config; "<" is escaped so it can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
