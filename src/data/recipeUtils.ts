import type { Cocktail } from "@/types";

export function getRecipe(recipes: Cocktail[], nameEng: string): Cocktail | null {
  if (!nameEng || !recipes?.length) return null;
  return recipes.find((cocktail) => cocktail.nameEng === nameEng) ?? null;
}
