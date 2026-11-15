import { PageHero } from "@/components/layout/page-hero"
import { PageSheet } from "@/components/layout/page-sheet"
import { Contact } from "@/components/sections/contact"
import { organization } from "@/config/organization"
import { pageMetadata } from "@/lib/metadata"

const page = organization.pages.contact

export const metadata = pageMetadata(page)

export default function ContactPage() {
  return (
    <>
      <PageHero page={page} />
      <PageSheet>
        <Contact />
      </PageSheet>
    </>
  )
}
