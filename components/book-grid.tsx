import type { Book } from "@/lib/types";
import { BookCard } from "./book-card";

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {books.map((book) => (
        <li key={book.slug} className="flex">
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}
