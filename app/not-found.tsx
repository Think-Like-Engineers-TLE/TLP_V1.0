import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-mono text-6xl font-bold text-fg-subtle">404</p>
      <h1 className="mt-4 text-xl font-semibold text-fg">
        Looks like this page escaped the repository.
      </h1>
      <p className="mt-2 text-sm text-fg-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-5 font-medium text-primary-fg hover:bg-primary-hover"
      >
        Return to Library
      </Link>
    </div>
  );
}
