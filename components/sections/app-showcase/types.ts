export const CATEGORY_FILTERS = [
  "All",
  "Traffic",
  "Testing",
  "Recon",
  "Utility",
] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export interface ShowcaseItem {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly iconSrc: string;
  readonly category: "Traffic" | "Testing" | "Recon" | "Utility";
  readonly badge: string;
  readonly isNew?: boolean;
  readonly features: readonly string[];
  readonly route: string;
}
