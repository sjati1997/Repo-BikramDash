import Image from "next/image"

import logo from "@/assets/brand/rks-logo.png"
import { organization } from "@/config/organization"
import { cn } from "@/lib/utils"

/** Full RKS lockup (mark + wordmark), rendered from the official artwork. */
type LogoProps = { className?: string; priority?: boolean; size?: "default" | "lg" }

export function Logo({ className, priority = false, size = "default" }: LogoProps) {
  return (
    <a href="#top" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={logo}
        alt={organization.name}
        priority={priority}
        sizes="160px"
        className={size === "lg" ? "h-16 w-auto" : "h-11 w-auto md:h-14"}
      />
    </a>
  )
}
