import type { Cocktail, MatchInfo } from "@/types";

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

export function getRequiredIngredients(cocktail: Cocktail): string[] {
  return (cocktail.ingredients ?? []).filter(
    (ing) => !isExcluded(ing) && !isExcluded(cocktail.recipe?.[ing] ?? "")
  );
}

// ─── Ingredient Matching ─────────────────────────────────────────────────────

function normalizeSpelling(s: string): string {
  return s.toLowerCase().replace(/whiskey/g, "whisky");
}

const WHISKY_SUBTYPES = ["scotch", "irish", "bourbon", "rye", "tennessee", "canadian", "japanese"] as const;
const GIN_SUBTYPES = ["old tom", "sloe"] as const;
const GINGER_SUBTYPES = ["ale", "beer"] as const;

type SpiritConfig = {
  subtypes: readonly string[];
  pattern: RegExp;
  // true:  配方需要 generic 時，bar 有任一 subtype 也算符合（e.g. whisky）
  // false: generic 與 subtype 完全不互通（e.g. gin、ginger）
  genericAcceptsSubtypes: boolean;
};

const SPIRIT_CONFIGS: SpiritConfig[] = [
  { subtypes: WHISKY_SUBTYPES,  pattern: /\bwhisky\b/,  genericAcceptsSubtypes: true  },
  { subtypes: GIN_SUBTYPES,     pattern: /\bgin\b/,     genericAcceptsSubtypes: false },
  { subtypes: GINGER_SUBTYPES,  pattern: /\bginger\b/,  genericAcceptsSubtypes: false },
];

function getSubtype(s: string, subtypes: readonly string[], pattern: RegExp): string | "generic" | null {
  if (!pattern.test(s)) return null;
  for (const sub of subtypes) {
    if (s.includes(sub)) return sub;
  }
  return "generic";
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function matchNormalized(a: string, b: string): boolean {
  for (const { subtypes, pattern, genericAcceptsSubtypes } of SPIRIT_CONFIGS) {
    const aType = getSubtype(a, subtypes, pattern);
    const bType = getSubtype(b, subtypes, pattern);
    if (aType !== null && bType !== null) {
      if (aType === "generic" && bType === "generic") return true;
      if (aType === "generic") return genericAcceptsSubtypes;
      if (bType === "generic") return false;
      return aType === bType;
    }
  }
  return (
    new RegExp(`\\b${escapeRegExp(b)}\\b`).test(a) ||
    new RegExp(`\\b${escapeRegExp(a)}\\b`).test(b)
  );
}

export function matchIngredient(ingredient: string, barItem: string): boolean {
  return matchNormalized(normalizeSpelling(ingredient), normalizeSpelling(barItem));
}

function makeBarMatcher(myBar: string[]) {
  const normalizedBar = myBar.map(normalizeSpelling);
  return (ingredient: string): boolean => {
    const normIng = normalizeSpelling(ingredient);
    return normalizedBar.some((barItem) => matchNormalized(normIng, barItem));
  };
}

export function computeMatchInfo(myBar: string[]) {
  const isInBar = makeBarMatcher(myBar);
  return (cocktail: Cocktail): MatchInfo | null => {
    if (!myBar.length) return null;
    const ingredients = getRequiredIngredients(cocktail);
    if (!ingredients.length) return null;
    const missing = ingredients.filter((ing) => !isInBar(ing)).length;
    return { missing, total: ingredients.length };
  };
}
