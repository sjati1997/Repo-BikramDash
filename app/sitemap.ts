import type { MetadataRoute } from "next"

import { organization } from "@/config/organization"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(organization.pages).map((page) => ({
    url: new URL(page.path, siteUrl).href,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }, ...pages]
}
