import type { Cocktail } from "@/types";

export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getAlcoholShots(abv: number): number {
  if (abv <= 12) return 1;
  if (abv <= 20) return 1.5;
  if (abv <= 27) return 2;
  if (abv <= 33) return 2.5;
  return 3;
}

export function getShotList(shots: number): ("filled" | "half" | "empty")[] {
  const list: ("filled" | "half" | "empty")[] = [];
  const full = Math.floor(shots);
  for (let i = 0; i < full; i++) list.push("filled");
  if (shots % 1 === 0.5) list.push("half");
  while (list.length < 3) list.push("empty");
  return list;
}

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
