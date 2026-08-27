import type { Book } from "./types";

export type SortKey = "recent" | "title-asc" | "title-desc" | "author" | "year-desc";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Recently Added" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
  { key: "author", label: "Author" },
  { key: "year-desc", label: "Publication Year" },
];

export const DEFAULT_SORT: SortKey = "recent";

export function isSortKey(v: string | null | undefined): v is SortKey {
  return !!v && SORT_OPTIONS.some((o) => o.key === v);
}

export function sortBooks(books: Book[], key: SortKey): Book[] {
  const copy = [...books];
  switch (key) {
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "author":
      return copy.sort((a, b) => (a.authors[0] ?? "").localeCompare(b.authors[0] ?? ""));
    case "year-desc":
      return copy.sort((a, b) => (b.publicationYear ?? 0) - (a.publicationYear ?? 0));
    case "recent":
    default:
      return copy.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  }
}
