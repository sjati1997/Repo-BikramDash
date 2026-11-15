import type { Metadata } from "next"

import type { PageCopy } from "@/config/organization"
import { organization } from "@/config/organization"

/** Per-page title, description, canonical URL and social preview text. */
export function pageMetadata(page: PageCopy): Metadata {
  const description = page.description ?? organization.description
  return {
    title: page.eyebrow,
    description,
    alternates: { canonical: page.path },
    openGraph: { url: page.path, title: `${page.eyebrow} | ${organization.name}`, description },
    twitter: { title: `${page.eyebrow} | ${organization.name}`, description },
  }
}
