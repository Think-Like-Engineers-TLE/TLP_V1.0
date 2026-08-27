import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { CATEGORY_SLUGS, getCategory } from "@/lib/categories";
import { getBooksByCategory } from "@/lib/books";
import { PageHeader } from "@/components/page-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  return createMetadata({
    title: cat ? `${cat.label} Books` : "Books",
    path: `/books/${category}`,
    description: cat ? `Free ${cat.label} books and resources.` : undefined,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const books = await getBooksByCategory(category);

  return (
    <div>
      <PageHeader
        eyebrow={cat.group}
        title={cat.label}
        lead={`${books.length} ${books.length === 1 ? "resource" : "resources"}`}
      />

      {books.length === 0 ? (
        <div className="border-line bg-surface/50 text-fg-muted rounded-lg border border-dashed p-6 text-sm">
          No resources in this category yet.{" "}
          <Link href="/contribute" className="text-primary hover:underline">
            Contribute one
          </Link>
          .
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <li key={book.slug}>
              <Link
                href={`/books/${book.category}/${book.slug}`}
                className="border-line bg-surface hover:border-fg-subtle flex h-full flex-col rounded-lg border p-4 transition-colors"
              >
                <span className="text-fg font-medium">{book.title}</span>
                <span className="text-fg-muted mt-1 text-sm">{book.authors.join(", ")}</span>
                <span className="text-fg-subtle mt-3 font-mono text-xs">
                  {cat.label} • {book.difficulty} • {book.format}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
