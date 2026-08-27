"use client";

import { useTheme, type ThemePreference } from "./theme-provider";

const ORDER: ThemePreference[] = ["system", "light", "dark"];
const LABEL: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

/** Minimal cycle button. Phase 1 can replace this with a proper menu. */
export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  const next = () => {
    const i = ORDER.indexOf(preference);
    setPreference(ORDER[(i + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      onClick={next}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm text-fg-muted transition-colors hover:text-fg"
      aria-label={`Theme: ${LABEL[preference]}. Click to change.`}
      title={`Theme: ${LABEL[preference]}`}
    >
      <Icon preference={preference} />
      <span className="hidden sm:inline">{LABEL[preference]}</span>
    </button>
  );
}

function Icon({ preference }: { preference: ThemePreference }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (preference === "light") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (preference === "dark") {
    return (
      <svg {...common}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M8 20h8M12 18v2" />
    </svg>
  );
}
