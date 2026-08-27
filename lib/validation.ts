import { z } from "zod";
import { CATEGORY_SLUGS } from "./categories";
import type { Book } from "./types";

/**
 * Single source of truth for what a valid book entry looks like.
 * Used both at build time (`lib/books.ts`) and in CI (`scripts/validate-books.ts`).
 *
 * The on-disk JSON format is intentionally close to the description in
 * Full Project Description §16 / §29.
 */

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const urlSchema = z.string().url();

export const licenseSchema = z.object({
  type: z.enum([
    "public_domain",
    "creative_commons",
    "open_license",
    "author_permission",
    "official_free_distribution",
  ]),
  name: z.string().min(2),
  url: urlSchema.optional(),
  redistributionAllowed: z.boolean(),
  note: z.string().optional(),
});

export const bookSchema = z
  .object({
    slug: z.string().regex(slugRegex, "slug must be kebab-case"),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    // Accept a string ("A, B") or an array; normalized to string[] below.
    author: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
    description: z.string().min(20, "description should be at least a sentence"),
    category: z.enum(CATEGORY_SLUGS as [string, ...string[]]),
    subcategory: z.string().optional(),
    tags: z.array(z.string().min(1)).min(1),
    language: z.string().min(2),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced", "All Levels"]),
    publicationYear: z
      .number()
      .int()
      .min(1960)
      .max(new Date().getFullYear() + 1)
      .optional(),
    pages: z.number().int().positive().optional(),
    format: z.enum(["PDF", "EPUB", "HTML", "MOBI"]),
    cover: z.string().optional(),
    license: licenseSchema,
    source: z.object({ name: z.string().min(2), url: urlSchema }),
    download: z.object({ url: urlSchema, size: z.string().optional() }),
    officialUrl: urlSchema,
    featured: z.boolean().default(false),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "addedAt must be YYYY-MM-DD"),
  })
  .strict()
  .refine((b) => b.license.redistributionAllowed || b.download.url === b.officialUrl, {
    message:
      "If redistribution is not allowed, `download.url` must point at the official source, not a TLP-hosted copy.",
    path: ["download", "url"],
  });

export type BookInput = z.input<typeof bookSchema>;
export type BookParsed = z.output<typeof bookSchema>;

/** Normalize a parsed entry into the runtime `Book` shape. */
export function normalizeBook(parsed: BookParsed): Book {
  const authors = Array.isArray(parsed.author)
    ? parsed.author
    : parsed.author.split(",").map((a) => a.trim());

  return {
    id: parsed.slug,
    slug: parsed.slug,
    title: parsed.title,
    subtitle: parsed.subtitle,
    authors,
    description: parsed.description,
    category: parsed.category,
    subcategory: parsed.subcategory,
    tags: parsed.tags,
    language: parsed.language,
    difficulty: parsed.difficulty,
    publicationYear: parsed.publicationYear,
    pages: parsed.pages,
    format: parsed.format,
    cover: parsed.cover,
    license: parsed.license,
    source: parsed.source,
    download: parsed.download,
    officialUrl: parsed.officialUrl,
    featured: parsed.featured,
    status: parsed.status,
    addedAt: parsed.addedAt,
  };
}
