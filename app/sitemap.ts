import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { getPublishedBooks } from "@/lib/books";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/books",
    "/topics",
    "/authors",
    "/about",
    "/contribute",
    "/legal",
    "/privacy",
  ].map((path) => ({ url: `${base}${path}`, lastModified: now }));

  const categoryRoutes = CATEGORY_SLUGS.map((slug) => ({
    url: `${base}/books/${slug}`,
    lastModified: now,
  }));

  const books = await getPublishedBooks();
  const bookRoutes = books.map((b) => ({
    url: `${base}/books/${b.category}/${b.slug}`,
    lastModified: new Date(b.addedAt),
  }));

  return [...staticRoutes, ...categoryRoutes, ...bookRoutes];
}
