import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { getAllAuthors, groupAuthorsByLetter } from "@/lib/authors";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";

export const metadata = createMetadata({
  title: "Authors",
  path: "/authors",
  description: "Browse authors in the Think Like Programmer library.",
});

export default async function AuthorsPage() {
  const authors = await getAllAuthors();
  const groups = groupAuthorsByLetter(authors);

  return (
    <div>
      <PageHeader
        eyebrow="Discovery"
        title="Authors"
        lead={`${authors.length} ${authors.length === 1 ? "author" : "authors"} in the library.`}
      />

      {authors.length === 0 ? (
        <EmptyState title="No authors yet">
          Authors are derived from book credits. Add a book to get started.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map(([letter, list]) => (
            <section key={letter}>
              <h2 className="text-fg-subtle mb-3 font-mono text-sm">{letter}</h2>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/authors/${a.slug}`}
                      className="border-line bg-surface hover:border-fg-subtle flex items-center justify-between rounded-md border px-4 py-3 text-sm transition-colors"
                    >
                      <span className="text-fg">{a.name}</span>
                      <span className="text-fg-subtle font-mono text-xs">
                        {a.count} {a.count === 1 ? "book" : "books"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
