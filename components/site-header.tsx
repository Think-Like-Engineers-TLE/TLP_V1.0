"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { HeaderSearchButton } from "./search-trigger";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Escape to close + scroll lock while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
          <HeaderSearchButton />
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="border-line bg-surface text-fg-muted hover:text-fg hidden h-9 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors sm:inline-flex"
          >
            GitHub <span aria-hidden>↗</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="border-line bg-surface text-fg-muted inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open navigation menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`border-line bg-bg absolute top-0 right-0 flex h-full w-72 max-w-[80vw] flex-col border-l shadow-xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="border-line flex h-14 items-center justify-between border-b px-4">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="border-line bg-surface text-fg-muted inline-flex h-9 w-9 items-center justify-center rounded-md border"
            >
              ✕
            </button>
          </div>
          <ul className="flex flex-col p-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`hover:bg-surface hover:text-fg block rounded-md px-3 py-2.5 text-sm ${
                    isActive(item.href) ? "text-fg" : "text-fg-muted"
                  }`}
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
      </div>
    </header>
  );
}
