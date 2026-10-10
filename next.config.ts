import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  logging: {
    // Dev-only Server Function logging prints the arguments, i.e. the
    // candidate's name, email and message. Keep personal data out of logs.
    serverFunctions: false,
  },
  experimental: {
    serverActions: {
      // The contact form is the only Server Action; its largest legitimate
      // payload is ~20 KB, so reject anything far beyond that early.
      bodySizeLimit: "64kb",
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig
