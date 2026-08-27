import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { getAllAuthors, getAuthor, getBooksByAuthor } from "@/lib/authors";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookGrid } from "@/components/book-grid";

export const dynamicParams = false;

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  return createMetadata({
    title: author?.name ?? "Author",
    path: `/authors/${slug}`,
    description: author
      ? `Books by ${author.name} in the Think Like Programmer library.`
      : undefined,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  const books = await getBooksByAuthor(slug);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Authors", href: "/authors" }, { label: author.name }]} />
      <PageHeader
        eyebrow="Author"
        title={author.name}
        lead={`${books.length} ${books.length === 1 ? "book" : "books"} in the library.`}
      />

      {author.bio && <p className="text-fg-muted mb-6 max-w-2xl">{author.bio}</p>}

      {author.links && author.links.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-2">
          {author.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="border-line bg-surface text-fg-muted hover:text-fg inline-flex rounded-md border px-3 py-1.5 text-sm"
              >
                {link.name} ↗
              </a>
            </li>
          ))}
        </ul>
      )}

      <BookGrid books={books} />
    </div>
  );
}
