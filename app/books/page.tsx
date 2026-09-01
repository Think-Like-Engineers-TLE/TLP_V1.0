import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { getPublishedBooks } from "@/lib/books";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { BookExplorer } from "@/components/book-explorer";
import { EmptyState } from "@/components/empty-state";

export const metadata = createMetadata({
  title: "Books",
  path: "/books",
  description: "Browse the Think Like Programmer library of legally free programming books.",
});

export default async function BooksIndexPage() {
  const books = await getPublishedBooks();

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Books"
        lead={`${books.length} ${books.length === 1 ? "resource" : "resources"}. Every entry lists its license and links to an official source.`}
      />

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
          <BookExplorer books={books} showCategoryFilter />
        )}
      </section>
    </div>
  );
}
