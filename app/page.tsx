import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { About } from "@/components/sections/about"
import { Approach } from "@/components/sections/approach"
import { Commitment } from "@/components/sections/commitment"
import { Contact } from "@/components/sections/contact"
import { CallToAction } from "@/components/sections/cta"
import { Hero } from "@/components/sections/hero"
import { Mission } from "@/components/sections/mission"
import { Services } from "@/components/sections/services"
import { WhatWeDo } from "@/components/sections/what-we-do"
import { WhyRks } from "@/components/sections/why-rks"
import { organization } from "@/config/organization"
import { siteUrl } from "@/lib/site"

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <WhyRks />
        <About />
        <WhatWeDo />
        <Services />
        <Approach />
        <Mission />
        <Commitment />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
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
      address: { "@type": "PostalAddress", streetAddress: contact.address.lines.join(", ") },
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
