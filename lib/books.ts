import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { bookSchema, normalizeBook } from "./validation";
import type { Book } from "./types";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");

let cache: Book[] | null = null;

/**
 * Load, validate and normalize every book entry from `content/books/*.json`.
 * Runs at build time (static export). Invalid entries throw — CI catches them
 * first via `scripts/validate-books.ts`, but we fail loudly here too.
 */
export async function getAllBooks(): Promise<Book[]> {
  if (cache) return cache;

  let entries: string[] = [];
  try {
    entries = await fs.readdir(BOOKS_DIR);
  } catch {
    // No content directory yet — return empty so the site still builds.
    cache = [];
    return cache;
  }

  const files = entries.filter((f) => f.endsWith(".json") && !f.startsWith("_"));

  const books = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(BOOKS_DIR, file), "utf8");
      const json = JSON.parse(raw);
      const parsed = bookSchema.safeParse(json);
      if (!parsed.success) {
        throw new Error(
          `Invalid book entry "${file}":\n${parsed.error.issues
            .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
            .join("\n")}`,
        );
      }
      return normalizeBook(parsed.data);
    }),
  );

  const slugs = new Set<string>();
  for (const book of books) {
    if (slugs.has(book.slug)) throw new Error(`Duplicate book slug: "${book.slug}"`);
    slugs.add(book.slug);
  }

  cache = books.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  return cache;
}

/** Only entries safe to show publicly. */
export async function getPublishedBooks(): Promise<Book[]> {
  const books = await getAllBooks();
  return books.filter((b) => b.status === "published");
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  const books = await getPublishedBooks();
  return books.filter((b) => b.category === category);
}

export async function getBook(slug: string): Promise<Book | undefined> {
  const books = await getAllBooks();
  return books.find((b) => b.slug === slug);
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const books = await getPublishedBooks();
  return books.filter((b) => b.featured);
}

export async function getRecentBooks(limit = 8): Promise<Book[]> {
  const books = await getPublishedBooks();
  return books.slice(0, limit);
}
