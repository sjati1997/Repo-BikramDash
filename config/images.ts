/**
 * Section photography. Stock photos from Unsplash (free for commercial use —
 * see assets/images/CREDITS.md). They illustrate the themes of each section
 * and do not depict RKS staff or clients; replace them with the company's own
 * photography whenever it is available, keeping the same file names or
 * updating the imports below.
 */

import aboutConsultation from "@/assets/images/about-consultation.jpg"
import commitmentPartners from "@/assets/images/commitment-partners.jpg"
import networkEarth from "@/assets/images/network-earth.jpg"
import relationshipsTowers from "@/assets/images/relationships-towers.jpg"

export const images = {
  /** "Why RKS" band — city lights across the globe, suggesting a connected network. Decorative. */
  network: { src: networkEarth, alt: "" },
  /** About section photo — a client consultation in a modern office. */
  about: { src: aboutConsultation, alt: "A consultant in conversation with a client at a meeting table in a bright, modern office" },
  /** Our Commitment photo. */
  commitment: { src: commitmentPartners, alt: "Two colleagues celebrating a successful result at the office" },
  /** "Building Relationships That Last" band — glass office towers. Decorative. */
  relationships: { src: relationshipsTowers, alt: "" },
} as const
