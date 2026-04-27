import type { CSSProperties } from "react";

export interface SanityRecipeRow {
  ingredient?: string;
  amount?: string;
}

export interface SanityDoc {
  category: Category;
  nameCht: string;
  nameEng: string;
  method: Method;
  ingredients: string[];
  glass: Glass;
  shots?: number;
  recipe?: SanityRecipeRow[];
  story?: string;
  note?: string;
  tags?: string[];
}

/** Full cocktail data fetched from Sanity CMS */
export interface Cocktail extends Omit<SanityDoc, "recipe"> {
  category: Category;
  nameCht: string;
  nameEng: string;
  method: Method;
  ingredients: string[];
  recipe: RecipeIngredients;
  glass: Glass;
  shots?: number;
  alcohol?: number;
  story?: string;
  note?: string;
  tags: string[];
}

/** Minimal cocktail entry used in the static main-menu data */
export interface CocktailSummary {
  nameCht: string;
  nameEng: string;
  hasImage?: boolean;
  src?: string;
  imgPosition?: "left" | "right";
  color?: string;
  opacity?: number;
}

/** One section in the main menu */
export interface MenuCategory {
  category: string;
  categoryCh: string;
  cocktails: CocktailSummary[];
  color?: string;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

/** Result of matching a cocktail against the user's bar inventory */
export interface MatchInfo {
  missing: number;
  total: number;
}

export type Category =
  | "Whiskey"
  | "Gin"
  | "Rum"
  | "Vodka"
  | "Tequila"
  | "Brandy"
  | "Mocktail"
  | "Signature"
  | "Imbibe"
  | "Else";

export type Method = "Build" | "Shake" | "Stir" | "Rolling" | "Other";

export type Glass =
  | "Highball"
  | "Lowball"
  | "Martini"
  | "Coupe"
  | "Nick & Nora"
  | "Hurricane"
  | "Footed Beer";

export type RecipeIngredients = Record<string, string>;
