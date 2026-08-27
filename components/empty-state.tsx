import type { ReactNode } from "react";

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border-line bg-surface/50 rounded-lg border border-dashed p-8 text-center">
      <p className="text-fg font-medium">{title}</p>
      {children && <div className="text-fg-muted mt-2 text-sm">{children}</div>}
    </div>
  );
}
