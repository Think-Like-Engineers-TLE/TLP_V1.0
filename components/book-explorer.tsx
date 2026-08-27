"use client";

import { Suspense, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Book } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { LICENSE_TYPE_LABEL } from "@/lib/labels";
import { DEFAULT_SORT, SORT_OPTIONS, isSortKey, sortBooks, type SortKey } from "@/lib/sort";
import { BookGrid } from "./book-grid";
import { EmptyState } from "./empty-state";

/** Filter + sort controls for a set of books (§18, §19). State lives in the URL. */
export function BookExplorer(props: { books: Book[]; showCategoryFilter?: boolean }) {
  return (
    <Suspense fallback={<BookGrid books={props.books} />}>
      <BookExplorerInner {...props} />
    </Suspense>
  );
}

const FACETS = ["category", "difficulty", "language", "format", "license"] as const;
type Facet = (typeof FACETS)[number];

function facetValue(book: Book, facet: Facet): string {
  switch (facet) {
    case "category":
      return getCategory(book.category)?.label ?? book.category;
    case "difficulty":
      return book.difficulty;
    case "language":
      return book.language;
    case "format":
      return book.format;
    case "license":
      return LICENSE_TYPE_LABEL[book.license.type];
  }
}

function BookExplorerInner({
  books,
  showCategoryFilter = false,
}: {
  books: Book[];
  showCategoryFilter?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeFacets = showCategoryFilter ? FACETS : FACETS.filter((f) => f !== "category");

  const options = useMemo(() => {
    const map = {} as Record<Facet, string[]>;
    for (const facet of activeFacets) {
      const values = new Set<string>();
      for (const b of books) values.add(facetValue(b, facet));
      map[facet] = [...values].sort();
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, showCategoryFilter]);

  const selected = useMemo(() => {
    const s = {} as Record<Facet, string>;
    for (const facet of activeFacets) s[facet] = params.get(facet) ?? "";
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, showCategoryFilter]);

  const sortParam = params.get("sort");
  const sort: SortKey = isSortKey(sortParam) ? sortParam : DEFAULT_SORT;

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const result = books.filter((b) =>
      activeFacets.every((facet) => !selected[facet] || facetValue(b, facet) === selected[facet]),
    );
    return sortBooks(result, sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, selected, sort, showCategoryFilter]);

  const activeCount = activeFacets.filter((f) => selected[f]).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-3">
        {activeFacets.map((facet) =>
          options[facet].length > 1 ? (
            <label key={facet} className="flex flex-col gap-1 text-xs text-fg-subtle">
              <span className="capitalize">{facet}</span>
              <select
                value={selected[facet]}
                onChange={(e) => setParam(facet, e.target.value)}
                className="h-9 rounded-md border border-line bg-surface px-2 text-sm text-fg"
              >
                <option value="">All</option>
                {options[facet].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          ) : null,
        )}

        <label className="ml-auto flex flex-col gap-1 text-xs text-fg-subtle">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value === DEFAULT_SORT ? "" : e.target.value)}
            className="h-9 rounded-md border border-line bg-surface px-2 text-sm text-fg"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-fg-muted">
        <span>
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border border-line px-2 py-0.5 text-xs text-fg-muted hover:text-fg"
          >
            Clear {activeCount} {activeCount === 1 ? "filter" : "filters"} ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No resources match these filters">
          <button type="button" onClick={clearAll} className="text-primary hover:underline">
            Clear filters
          </button>
        </EmptyState>
      ) : (
        <BookGrid books={filtered} />
      )}
    </div>
  );
}
