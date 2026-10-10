"use client"

import { AnimatePresence, m } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Logo } from "@/components/layout/logo"
import { buttonVariants } from "@/components/ui/button"
import { organization } from "@/config/organization"
import { cn } from "@/lib/utils"

const navItems = organization.navigation
const sectionIds = navItems.map((item) => item.href.slice(1))

/** Tracks which navigation section currently occupies the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on Escape, when resizing to desktop, and move focus into it when opened.
  useEffect(() => {
    if (!menuOpen) return
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onChange = () => desktop.matches && setMenuOpen(false)

    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onChange)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onChange)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  // Scrolling while the menu animates closed gets cancelled on mobile, so the
  // target is queued and scrolled to once the exit animation has finished.
  const pendingTarget = useRef<string | null>(null)

  const navigateFromMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href")
    if (href?.startsWith("#") && document.getElementById(href.slice(1))) {
      event.preventDefault()
      pendingTarget.current = href
    }
    setMenuOpen(false)
  }

  const scrollToPendingTarget = () => {
    const href = pendingTarget.current
    pendingTarget.current = null
    if (!href) return
    document.getElementById(href.slice(1))?.scrollIntoView()
    history.pushState(null, "", href)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        // Always solid: the logo needs a light backdrop, and the hero is a dark photo.
        "border-border bg-background/95 backdrop-blur-md",
        solid && "shadow-[0_6px_24px_-12px_oklch(0.2_0.1_280/0.35)]"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Logo priority />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300",
                      "hover:text-foreground hover:after:scale-x-100",
                      isActive ? "text-foreground after:scale-x-100" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={organization.hero.primaryCta.href}
            className={cn(buttonVariants({ size: "sm" }), "hidden bg-brand text-brand-foreground hover:bg-brand-2 sm:inline-flex")}
          >
            {organization.hero.primaryCta.label}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center text-foreground transition-colors hover:bg-muted md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false} onExitComplete={scrollToPendingTarget}>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navItems.map((item, index) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.3 }}
                >
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={navigateFromMenu}
                    aria-current={active === item.href.slice(1) ? "true" : undefined}
                    className="flex items-center justify-between border-b border-border py-4 font-heading text-xl font-semibold aria-[current]:text-brand"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
              <li className="pt-6">
                <a
                  href={organization.hero.primaryCta.href}
                  onClick={navigateFromMenu}
                  className={cn(buttonVariants({ size: "lg" }), "w-full bg-brand text-brand-foreground hover:bg-brand-2")}
                >
                  {organization.hero.primaryCta.label}
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
