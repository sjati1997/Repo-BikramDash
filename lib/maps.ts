/** A point on the map, in decimal degrees (e.g. from "What's here?" in Google Maps). */
export type GeoLocation = {
  latitude: number
  longitude: number
  /** Map zoom level, 1 (world) to 21 (building). Defaults to 15 (street). */
  zoom?: number
}

/** A place Google Maps finds by its postal address. */
export type AddressLocation = {
  address: string
  /** Map zoom level, 1 (world) to 21 (building). Defaults to 15 (street). */
  zoom?: number
}

/** Exact coordinates are most precise; an address is simpler to maintain. */
export type MapLocation = GeoLocation | AddressLocation

export function isValidLocation(location: MapLocation) {
  const zoom = location.zoom ?? 15
  if (zoom < 1 || zoom > 21) return false
  if ("address" in location) return location.address.trim().length > 0
  const { latitude, longitude } = location
  return Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180
}

const query = (location: MapLocation) =>
  "address" in location ? location.address : `${location.latitude},${location.longitude}`

/** Keyless Google Maps embed URL, centred on the location with a marker. */
export function googleMapsEmbedUrl(location: MapLocation) {
  const params = new URLSearchParams({ q: query(location), z: String(location.zoom ?? 15), output: "embed" })
  return `https://www.google.com/maps?${params}`
}

/** Opens the location in Google Maps (app on mobile), where visitors can get directions. */
export function googleMapsLinkUrl(location: MapLocation) {
  const params = new URLSearchParams({ api: "1", query: query(location) })
  return `https://www.google.com/maps/search/?${params}`
}
