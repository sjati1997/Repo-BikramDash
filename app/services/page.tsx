import { PageHero } from "@/components/layout/page-hero"
import { CallToAction } from "@/components/sections/cta"
import { Services } from "@/components/sections/services"
import { WhatWeDo } from "@/components/sections/what-we-do"
import { organization } from "@/config/organization"
import { pageMetadata } from "@/lib/metadata"

const page = organization.pages.services

export const metadata = pageMetadata(page)

export default function ServicesPage() {
  return (
    <>
      <PageHero page={page} />
      <WhatWeDo />
      <Services />
      <CallToAction />
    </>
  )
}
