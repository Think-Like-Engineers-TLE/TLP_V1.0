"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="border-line bg-bg/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`hover:text-fg rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="border-line bg-surface text-fg-muted hover:text-fg hidden h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors sm:inline-flex"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="border-line bg-surface text-fg-muted inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-line bg-bg border-t md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-fg-muted hover:bg-surface hover:text-fg block rounded-md px-3 py-2.5 text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="text-fg-muted hover:bg-surface hover:text-fg block rounded-md px-3 py-2.5 text-sm"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
