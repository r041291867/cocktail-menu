import type { CocktailTag } from "@/data/deriveTags";

/** Full cocktail data fetched from Sanity CMS */
export interface Cocktail {
  category: string;
  nameCht: string;
  nameEng: string;
  method?: string;
  ingredients: string[];
  recipe: Record<string, string>;
  glass?: string;
  shots?: number;
  alcohol?: number;
  note?: string;
  tags: CocktailTag[];
}

/** Minimal cocktail entry used in the static main-menu data */
export interface CocktailSummary {
  nameCht: string;
  nameEng: string;
  hasImage?: boolean;
  src?: string;
  imgPosition?: "left" | "right";
}

/** One section in the main menu */
export interface MenuCategory {
  category: string;
  categoryCh: string;
  cocktails: CocktailSummary[];
}

/** Result of matching a cocktail against the user's bar inventory */
export interface MatchInfo {
  missing: number;
  total: number;
}
