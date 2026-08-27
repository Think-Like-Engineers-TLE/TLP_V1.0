export function PageHeader({
  title,
  lead,
  eyebrow,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
}) {
  return (
    <header className="border-line mb-8 border-b pb-6">
      {eyebrow && (
        <p className="text-fg-subtle mb-2 font-mono text-xs tracking-widest uppercase">{eyebrow}</p>
      )}
      <h1 className="text-fg text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {lead && <p className="text-fg-muted mt-3 max-w-2xl text-base">{lead}</p>}
    </header>
  );
}

/** Temporary marker for routes that are scaffolded but not yet built. */
export function PhaseNote({ phase, children }: { phase: string; children: React.ReactNode }) {
  return (
    <div className="border-line bg-surface/50 text-fg-muted rounded-lg border border-dashed p-6 text-sm">
      <p className="text-accent-purple mb-1 font-mono text-xs tracking-widest uppercase">{phase}</p>
      {children}
    </div>
  );
}
