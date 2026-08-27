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
    <header className="mb-8 border-b border-line pb-6">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-fg-subtle">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-base text-fg-muted">{lead}</p>}
    </header>
  );
}

/** Temporary marker for routes that are scaffolded but not yet built. */
export function PhaseNote({ phase, children }: { phase: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface/50 p-6 text-sm text-fg-muted">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent-purple">
        {phase}
      </p>
      {children}
    </div>
  );
}
