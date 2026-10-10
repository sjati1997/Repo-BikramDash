import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { organization } from "@/config/organization"

// Social sharing preview, generated at build time from the logo and config.
export const alt = `${organization.name} — ${organization.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "assets/brand/rks-logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f3f3f6" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logoSrc} alt="" width={330} height={141} />
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, fontWeight: 700, color: "#14122b", maxWidth: 980 }}>
            {organization.tagline}
          </div>
        </div>
        <div style={{ display: "flex", height: 18 }}>
          <div style={{ flex: 3, background: "#1800ad" }} />
          <div style={{ flex: 2, background: "#004aad" }} />
          <div style={{ flex: 1, background: "#ffde59" }} />
        </div>
      </div>
    ),
    size
  )
}
