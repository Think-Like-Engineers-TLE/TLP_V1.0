/**
 * Core content types for Think Like Programmer.
 *
 * These describe the *shape* of validated content. The runtime validation
 * (and the single source of truth for allowed values) lives in `lib/validation.ts`.
 */

export type LicenseType =
  | "public_domain"
  | "creative_commons"
  | "open_license"
  | "author_permission"
  | "official_free_distribution";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type FileFormat = "PDF" | "EPUB" | "HTML" | "MOBI";

export type ResourceStatus = "draft" | "published" | "archived";

/** Why is TLP legally allowed to list/redistribute this resource? */
export interface License {
  type: LicenseType;
  /** Human-readable name, e.g. "Creative Commons Attribution 4.0 International". */
  name: string;
  /** Canonical URL of the license text. */
  url?: string;
  /** True only when the license/permission allows redistribution of the file itself. */
  redistributionAllowed: boolean;
  /** Optional note explaining the specific permission (e.g. link to author's statement). */
  note?: string;
}

export interface SourceRef {
  /** e.g. "Official author website", "Publisher free download". */
  name: string;
  url: string;
}

export interface DownloadRef {
  /** Direct link to the file, or the official download page. */
  url: string;
  /** Human-readable size, e.g. "8.4 MB". */
  size?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  /** Comma-separated authors are split into this array. */
  authors: string[];
  description: string;
  /** Category slug, must exist in `lib/categories.ts`. */
  category: string;
  subcategory?: string;
  tags: string[];
  language: string;
  difficulty: Difficulty;
  publicationYear?: number;
  pages?: number;
  format: FileFormat;
  /** Path/URL to the cover image. */
  cover?: string;
  license: License;
  source: SourceRef;
  download: DownloadRef;
  /** Canonical/official page for the resource. */
  officialUrl: string;
  featured: boolean;
  status: ResourceStatus;
  /** ISO date the entry was added, used for "Recently Added" sorting. */
  addedAt: string;
}

export interface Category {
  slug: string;
  label: string;
  group: string;
  description?: string;
}

export interface Author {
  slug: string;
  name: string;
  bio?: string;
  links?: SourceRef[];
}

export interface Topic {
  slug: string;
  label: string;
  description?: string;
}
