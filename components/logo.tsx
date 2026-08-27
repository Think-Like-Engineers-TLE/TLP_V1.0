import Link from "next/link";

/** Typographic mark: <TLP/> */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center font-mono text-lg font-semibold tracking-tight text-fg ${className}`}
      aria-label="Think Like Programmer — home"
    >
      <span className="text-fg-subtle">&lt;</span>
      <span>TLP</span>
      <span className="text-fg-subtle">/&gt;</span>
    </Link>
  );
}
