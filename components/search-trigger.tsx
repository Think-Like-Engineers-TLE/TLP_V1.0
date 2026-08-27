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
      className="border-line bg-surface text-fg-subtle hover:text-fg inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors"
    >
      <span aria-hidden>⌕</span>
      <span className="hidden lg:inline">Search…</span>
      <kbd className="border-line bg-bg hidden rounded border px-1.5 text-xs lg:inline">
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
      className="border-line bg-surface text-fg-subtle hover:border-fg-subtle flex h-11 w-full items-center gap-2 rounded-md border px-4 text-sm transition-colors"
    >
      <span aria-hidden>⌕</span>
      <span>Search programming books…</span>
      <kbd className="border-line bg-bg ml-auto rounded border px-1.5 py-0.5 text-xs">/</kbd>
    </button>
  );
}
