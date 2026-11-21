import { PageHero } from "@/components/layout/page-hero"
import { PageSheet } from "@/components/layout/page-sheet"
import { Approach } from "@/components/sections/approach"
import { Commitment } from "@/components/sections/commitment"
import { CallToAction } from "@/components/sections/cta"
import { organization } from "@/config/organization"
import { pageMetadata } from "@/lib/metadata"

const page = organization.pages.approach

export const metadata = pageMetadata(page)

export default function ApproachPage() {
  return (
    <>
      <PageHero page={page} />
      <PageSheet>
        <Approach />
      </PageSheet>
      <Commitment />
      <CallToAction />
    </>
  )
}
