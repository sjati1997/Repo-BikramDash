/**
 * Public site URL used for canonical URLs, Open Graph metadata, robots.txt and
 * the sitemap. Safe to use on the client (NEXT_PUBLIC_ prefix).
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
)
