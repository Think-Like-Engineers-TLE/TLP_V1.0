import Link from "next/link";
import type { Book } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { licenseBadge } from "@/lib/labels";
import { Badge, difficultyTone } from "./ui/badge";
import { BookCover } from "./book-cover";

/** Book card (§12). Whole card is a link to the detail page. */
export function BookCard({ book }: { book: Book }) {
  const category = getCategory(book.category);

  return (
    <Link
      href={`/books/${book.category}/${book.slug}`}
      className="group border-line bg-surface hover:border-fg-subtle focus-visible:border-fg-subtle flex w-full gap-4 rounded-lg border p-4 transition-colors"
    >
      <BookCover book={book} className="w-20 shrink-0 sm:w-24" sizes="96px" />

      <div className="flex min-w-0 flex-col">
        <h3 className="text-fg group-hover:text-primary font-medium">{book.title}</h3>
        <p className="text-fg-muted mt-0.5 truncate text-sm">{book.authors.join(", ")}</p>

        <p className="text-fg-muted mt-2 line-clamp-2 text-sm">{book.description}</p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          {category && <Badge tone="neutral">{category.label}</Badge>}
          <Badge tone={difficultyTone(book.difficulty)}>{book.difficulty}</Badge>
          <Badge tone="green" mono>
            {licenseBadge(book.license.name, book.license.type)}
          </Badge>
          <span className="text-fg-subtle font-mono text-xs">
            {book.format}
            {book.download.size ? ` · ${book.download.size}` : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
