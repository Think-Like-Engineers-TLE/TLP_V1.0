"use client";

import { useEffect, useState } from "react";
import { useSearch } from "./search";

function useModKey() {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);
  return mac ? "⌘" : "Ctrl";
}

/** Compact search button for the header. */
export function HeaderSearchButton() {
  const { setOpen } = useSearch();
  const mod = useModKey();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Search"
      className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-fg-subtle transition-colors hover:text-fg"
    >
      <span aria-hidden>⌕</span>
      <span className="hidden lg:inline">Search…</span>
      <kbd className="hidden rounded border border-line bg-bg px-1.5 text-xs lg:inline">
        {mod} K
      </kbd>
    </button>
  );
}

/** Full-width search box for the homepage hero. */
export function HeroSearchButton() {
  const { setOpen } = useSearch();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex h-11 w-full items-center gap-2 rounded-md border border-line bg-surface px-4 text-sm text-fg-subtle transition-colors hover:border-fg-subtle"
    >
      <span aria-hidden>⌕</span>
      <span>Search programming books…</span>
      <kbd className="ml-auto rounded border border-line bg-bg px-1.5 py-0.5 text-xs">/</kbd>
    </button>
  );
}
