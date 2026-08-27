import type { LicenseType } from "./types";

export const LICENSE_TYPE_LABEL: Record<LicenseType, string> = {
  public_domain: "Public Domain",
  creative_commons: "Creative Commons",
  open_license: "Open License",
  author_permission: "Author Permission",
  official_free_distribution: "Official Free Distribution",
};

/** Short badge text for a license (prefers the concrete name if compact). */
export function licenseBadge(name: string, type: LicenseType): string {
  const short = name.match(/\b(CC[\s-]?BY[\w-]*|MIT|Apache[\s-]?2\.0|GPL[\w-]*|BSD[\w-]*)\b/i);
  if (short) return short[0].toUpperCase().replace(/\s+/g, " ");
  return LICENSE_TYPE_LABEL[type];
}
