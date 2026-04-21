import type { Cocktail } from "@/types";

export function getRecipe(
  recipes: Cocktail[],
  nameEng: string
): Cocktail | null {
  if (!nameEng || !recipes?.length) return null;
  return recipes.find((cocktail) => cocktail.nameEng === nameEng) ?? null;
}

const EXCLUDED = [
  "optional",
  "garnish",
  "ratio",
  "float",
  "egg white",
  "mint",
  "crushed ice",
  "rinse",
  "salt",
];

export function isExcluded(text: string): boolean {
  const lower = text.toLowerCase();
  return EXCLUDED.some((kw) => lower.includes(kw));
}

function normalizeSpelling(s: string): string {
  return s.toLowerCase().replace(/whiskey/g, "whisky");
}

export function matchIngredient(ingredient: string, barItem: string): boolean {
  const a = normalizeSpelling(ingredient);
  const b = normalizeSpelling(barItem);
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    new RegExp(`\\b${escape(b)}\\b`).test(a) ||
    new RegExp(`\\b${escape(a)}\\b`).test(b)
  );
}
