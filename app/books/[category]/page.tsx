import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { CATEGORY_SLUGS, getCategory } from "@/lib/categories";
import { getBooksByCategory } from "@/lib/books";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookGrid } from "@/components/book-grid";
import { EmptyState } from "@/components/empty-state";

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
    description: cat ? `Free ${cat.label} books and learning resources.` : undefined,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const books = await getBooksByCategory(category);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Books", href: "/books" }, { label: cat.label }]} />
      <PageHeader
        eyebrow={cat.group}
        title={cat.label}
        lead={`${books.length} ${books.length === 1 ? "resource" : "resources"}`}
      />

      {books.length === 0 ? (
        <EmptyState title="No resources in this category yet">
          <Link href="/contribute" className="text-primary hover:underline">
            Contribute one
          </Link>{" "}
          or{" "}
          <Link href="/books" className="text-primary hover:underline">
            browse the full library
          </Link>
          .
        </EmptyState>
      ) : (
        <BookGrid books={books} />
      )}
    </div>
  );
}
