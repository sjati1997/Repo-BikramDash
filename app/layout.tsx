import type { Metadata, Viewport } from "next"
import { Archivo, Noto_Sans } from "next/font/google"

import { MotionProvider } from "@/components/motion/motion-provider"
import { organization } from "@/config/organization"
import { siteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"
import "./globals.css"

// A sturdy grotesque for headings, in keeping with the logo's bold sans wordmark.
const archivoHeading = Archivo({ subsets: ["latin"], variable: "--font-heading", display: "swap" })

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${organization.name} — ${organization.tagline}`,
    template: `%s | ${organization.name}`,
  },
  description: organization.description,
  applicationName: organization.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: organization.name,
    title: organization.name,
    description: organization.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: organization.name,
    description: organization.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#1800ad",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased font-sans", notoSans.variable, archivoHeading.variable)}
    >
      {/* Browser extensions (e.g. Grammarly) add attributes to <body> before React
          hydrates. This ignores attribute mismatches on <body> only — the rest of
          the tree is still checked. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
