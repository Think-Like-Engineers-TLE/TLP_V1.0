import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-fg-subtle font-mono text-6xl font-bold">404</p>
      <h1 className="text-fg mt-4 text-xl font-semibold">
        Looks like this page escaped the repository.
      </h1>
      <p className="text-fg-muted mt-2 text-sm">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-fg hover:bg-primary-hover mt-6 inline-flex h-11 items-center rounded-md px-5 font-medium"
      >
        Return to Library
      </Link>
    </div>
  );
}
