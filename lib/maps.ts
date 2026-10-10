/** A point on the map, in decimal degrees (e.g. from "What's here?" in Google Maps). */
export type GeoLocation = {
  latitude: number
  longitude: number
  /** Map zoom level, 1 (world) to 21 (building). Defaults to 15 (street). */
  zoom?: number
}

export function isValidLocation(location: GeoLocation) {
  const { latitude, longitude, zoom = 15 } = location
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180 &&
    zoom >= 1 &&
    zoom <= 21
  )
}

const coordinates = ({ latitude, longitude }: GeoLocation) => `${latitude},${longitude}`

/** Keyless Google Maps embed URL, centred on the location with a marker. */
export function googleMapsEmbedUrl(location: GeoLocation) {
  const params = new URLSearchParams({ q: coordinates(location), z: String(location.zoom ?? 15), output: "embed" })
  return `https://www.google.com/maps?${params}`
}

/** Opens the location in Google Maps (app on mobile), where visitors can get directions. */
export function googleMapsLinkUrl(location: GeoLocation) {
  const params = new URLSearchParams({ api: "1", query: coordinates(location) })
  return `https://www.google.com/maps/search/?${params}`
}
