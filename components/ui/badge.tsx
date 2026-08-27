import type { ReactNode } from "react";

type Tone = "neutral" | "primary" | "green" | "purple";

const TONE: Record<Tone, string> = {
  neutral: "border-line bg-surface-2 text-fg-muted",
  primary: "border-primary/30 bg-primary/10 text-primary",
  green: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  purple: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple",
};

export function Badge({
  children,
  tone = "neutral",
  mono = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  mono?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs whitespace-nowrap ${TONE[tone]} ${
        mono ? "font-mono" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function difficultyTone(difficulty: string): Tone {
  switch (difficulty) {
    case "Beginner":
      return "green";
    case "Intermediate":
      return "primary";
    case "Advanced":
      return "purple";
    default:
      return "neutral";
  }
}
