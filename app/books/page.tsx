import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { categoriesByGroup } from "@/lib/categories";
import { getPublishedBooks } from "@/lib/books";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { BookGrid } from "@/components/book-grid";
import { EmptyState } from "@/components/empty-state";

export const metadata = createMetadata({
  title: "Books",
  path: "/books",
  description: "Browse the Think Like Programmer library of legally free programming books.",
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
        lead={`${books.length} ${books.length === 1 ? "resource" : "resources"}. Every entry lists its license and links to an official source.`}
      />

      <section className="mb-12">
        <SectionHeading>Browse by category</SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, categories]) => (
            <div key={group} className="border-line bg-surface rounded-lg border p-4">
              <h3 className="text-fg mb-2 text-sm font-semibold">{group}</h3>
              <ul className="flex flex-col gap-1 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/books/${c.slug}`}
                      className="text-fg-muted hover:text-primary flex items-center justify-between"
                    >
                      <span>{c.label}</span>
                      <span className="text-fg-subtle font-mono text-xs">
                        {counts.get(c.slug) ?? 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>All resources</SectionHeading>
        {books.length === 0 ? (
          <EmptyState title="No resources yet">
            <Link href="/contribute" className="text-primary hover:underline">
              Contribute the first one
            </Link>
            .
          </EmptyState>
        ) : (
          <BookGrid books={books} />
        )}
      </section>
    </div>
  );
}
