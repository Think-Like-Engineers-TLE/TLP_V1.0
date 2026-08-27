import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  children,
  href,
  linkLabel = "View all",
}: {
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <h2 className="text-fg-subtle text-sm font-semibold tracking-widest uppercase">{children}</h2>
      {href && (
        <Link href={href} className="text-fg-muted hover:text-fg text-sm">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
