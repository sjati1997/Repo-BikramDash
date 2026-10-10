import { ExternalLink, MapPin } from "lucide-react"

import { googleMapsEmbedUrl, googleMapsLinkUrl, isValidLocation, type GeoLocation } from "@/lib/maps"

type LocationMapProps = {
  location: GeoLocation
  /** Accessible name for the map, e.g. "RKS Technology Group office location". */
  title: string
}

/**
 * Embedded Google Map pinned to the office coordinates. Uses Google's keyless
 * embed, loads lazily (only when scrolled near), and offers a link to open the
 * location in Google Maps for directions.
 */
export function LocationMap({ location, title }: LocationMapProps) {
  if (!isValidLocation(location)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[LocationMap] Ignoring invalid coordinates in config/organization.ts:", location)
    }
    return null
  }

  return (
    <figure className="overflow-hidden rounded-leaf border border-border bg-background shadow-[0_24px_60px_-40px_oklch(0.2_0.1_280/0.35)]">
      <div className="relative aspect-4/3 bg-surface">
        {/* Shown until the map tiles load (or if the embed is blocked). */}
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-brand/40">
          <MapPin className="size-10" />
        </div>
        <iframe
          src={googleMapsEmbedUrl(location)}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <MapPin className="size-4 text-brand" aria-hidden="true" />
          Our location
        </span>
        <a
          href={googleMapsLinkUrl(location)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-2 underline-offset-4 hover:underline"
        >
          Open in Google Maps
          <ExternalLink className="size-3.5" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  )
}
