"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { searchRecords, type SearchRecord, type SearchType } from "@/lib/search";

interface SearchContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within <SearchProvider>");
  return ctx;
}

let indexCache: SearchRecord[] | null = null;
let indexPromise: Promise<SearchRecord[]> | null = null;

function loadIndex(): Promise<SearchRecord[]> {
  if (indexCache) return Promise.resolve(indexCache);
  if (!indexPromise) {
    indexPromise = fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SearchRecord[]) => {
        indexCache = data;
        return data;
      })
      .catch(() => {
        indexPromise = null;
        return [];
      });
  }
  return indexPromise;
}

const TYPE_LABEL: Record<SearchType, string> = {
  book: "Books",
  topic: "Topics",
  author: "Authors",
};
const TYPE_ORDER: SearchType[] = ["book", "topic", "author"];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </SearchContext.Provider>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<SearchRecord[]>(indexCache ?? []);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadIndex().then(setRecords);
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const results = useMemo(
    () => (query.trim() ? searchRecords(records, query, 24) : []),
    [records, query],
  );

  useEffect(() => setActive(0), [query]);

  const groups = useMemo(() => {
    const map = new Map<SearchType, SearchRecord[]>();
    for (const r of results) {
      const list = map.get(r.type) ?? [];
      list.push(r);
      map.set(r.type, list);
    }
    return TYPE_ORDER.filter((t) => map.has(t)).map((t) => [t, map.get(t)!] as const);
  }, [results]);

  const go = useCallback(
    (record: SearchRecord | undefined) => {
      if (!record) return;
      onClose();
      router.push(record.href);
    },
    [onClose, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let flatIdx = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 h-full w-full cursor-default bg-black/50"
        onClick={onClose}
        tabIndex={-1}
      />
      <div className="border-line bg-bg relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border shadow-2xl">
        <div className="border-line flex items-center gap-2 border-b px-4">
          <span aria-hidden className="text-fg-subtle">
            ⌕
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search books, topics, authors…"
            aria-label="Search query"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length > 0 ? `search-opt-${active}` : undefined}
            autoComplete="off"
            className="text-fg placeholder:text-fg-subtle h-12 flex-1 bg-transparent text-sm outline-none"
          />
          <kbd className="border-line bg-surface text-fg-subtle rounded border px-1.5 py-0.5 text-xs">
            Esc
          </kbd>
        </div>

        <div className="overflow-y-auto">
          {query.trim() === "" ? (
            <p className="text-fg-subtle px-4 py-8 text-center text-sm">
              Type to search the library.
            </p>
          ) : results.length === 0 ? (
            <p className="text-fg-muted px-4 py-8 text-center text-sm">No results for “{query}”.</p>
          ) : (
            <div
              ref={listRef}
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="py-2"
            >
              {groups.map(([type, items]) => (
                <div key={type} role="group" aria-label={TYPE_LABEL[type]}>
                  <p className="text-fg-subtle px-4 pt-2 pb-1 font-mono text-xs tracking-widest uppercase">
                    {TYPE_LABEL[type]}
                  </p>
                  {items.map((r) => {
                    flatIdx += 1;
                    const idx = flatIdx;
                    return (
                      <div
                        key={r.href}
                        id={`search-opt-${idx}`}
                        role="option"
                        aria-selected={idx === active}
                        data-idx={idx}
                        onClick={() => go(r)}
                        onMouseMove={() => setActive(idx)}
                        className={`flex cursor-pointer flex-col items-start px-4 py-2 ${
                          idx === active ? "bg-surface" : ""
                        }`}
                      >
                        <span className="text-fg text-sm">{r.title}</span>
                        {r.subtitle && <span className="text-fg-subtle text-xs">{r.subtitle}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
