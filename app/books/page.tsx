import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { categoriesByGroup } from "@/lib/categories";
import { getPublishedBooks } from "@/lib/books";
import { PageHeader } from "@/components/page-header";

export const metadata = createMetadata({
  title: "Books",
  path: "/books",
  description: "Browse the Think Like Programmer library by category.",
});

export default async function BooksIndexPage() {
  const books = await getPublishedBooks();
  const counts = new Map<string, number>();
  for (const b of books) counts.set(b.category, (counts.get(b.category) ?? 0) + 1);

  const groups = [...categoriesByGroup().entries()];

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Books"
        lead={`${books.length} ${books.length === 1 ? "resource" : "resources"} across ${groups.length} groups. Every entry lists its license and official source.`}
      />

      <div className="flex flex-col gap-10">
        {groups.map(([group, categories]) => (
          <section key={group}>
            <h2 className="text-fg-subtle mb-3 text-sm font-semibold tracking-widest uppercase">
              {group}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/books/${c.slug}`}
                    className="border-line bg-surface hover:border-fg-subtle flex items-center justify-between rounded-md border px-4 py-3 text-sm transition-colors"
                  >
                    <span className="text-fg">{c.label}</span>
                    <span className="text-fg-subtle font-mono text-xs">
                      {counts.get(c.slug) ?? 0}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
