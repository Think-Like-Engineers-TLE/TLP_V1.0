import type { Book } from "./types";

/**
 * Search index — Phase 3 will build this into a real client-side search
 * (title / author / topic / language / tag / category, per §17).
 *
 * For Phase 0 this just defines the record shape and a builder so the
 * architecture is in place. The build step can emit `public/search-index.json`
 * from `buildSearchIndex(await getAllBooks())` later.
 */

export interface SearchRecord {
  type: "book" | "author" | "topic" | "category";
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  tags: string[];
  keywords: string;
}

export function buildSearchIndex(books: Book[]): SearchRecord[] {
  return books
    .filter((b) => b.status === "published")
    .map((b) => ({
      type: "book" as const,
      slug: b.slug,
      title: b.title,
      subtitle: b.subtitle,
      category: b.category,
      tags: b.tags,
      keywords: [b.title, b.subtitle, ...b.authors, b.category, ...b.tags, b.language]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    }));
}
