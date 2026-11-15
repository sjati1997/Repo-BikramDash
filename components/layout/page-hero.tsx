import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { BrandBar } from "@/components/brand/brand-mark"
import type { PageCopy } from "@/config/organization"
import { cn } from "@/lib/utils"

const enter = "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out"

/** Banner at the top of an inner page, sitting directly on the live site background. */
export function PageHero({ page }: { page: PageCopy }) {
  return (
    <section aria-labelledby="page-title" className="pt-32 pb-16 text-white md:pt-40 md:pb-20">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className={enter}>
          <ol className="flex items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-white">
              {page.eyebrow}
            </li>
          </ol>
        </nav>

        <p
          className={cn(enter, "mt-8 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-highlight uppercase")}
          style={{ animationDelay: "60ms" }}
        >
          <BrandBar />
          {page.eyebrow}
        </p>
        <h1
          id="page-title"
          className={cn(enter, "mt-4 max-w-4xl font-heading text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl")}
          style={{ animationDelay: "120ms" }}
        >
          {page.title}
        </h1>
        {page.description && (
          <p
            className={cn(enter, "mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg")}
            style={{ animationDelay: "180ms" }}
          >
            {page.description}
          </p>
        )}
      </div>
    </section>
  )
}
