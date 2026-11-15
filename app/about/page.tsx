import { PageHero } from "@/components/layout/page-hero"
import { PageSheet } from "@/components/layout/page-sheet"
import { About } from "@/components/sections/about"
import { CallToAction } from "@/components/sections/cta"
import { Mission } from "@/components/sections/mission"
import { organization } from "@/config/organization"
import { pageMetadata } from "@/lib/metadata"

const page = organization.pages.about

export const metadata = pageMetadata(page)

export default function AboutPage() {
  return (
    <>
      <PageHero page={page} />
      <PageSheet>
        <About />
        <Mission />
        <CallToAction />
      </PageSheet>
    </>
  )
}
