import { createSanityReadClient } from "@/data/sanityClient";
import { calculateAbv } from "@/data/calculateAbv";
import { deriveTags } from "@/data/deriveTags";
import type { SanityRecipeRow, SanityDoc, Cocktail } from "@/types";

const COCKTAILS_QUERY = `*[_type == "cocktail" && defined(nameEng)] | order(nameEng asc) {
  ...
}`;

function recipeArrayToObject(
  recipe: SanityRecipeRow[] | undefined
): Record<string, string> {
  if (!recipe || !Array.isArray(recipe)) return {};
  return recipe.reduce<Record<string, string>>((acc, row) => {
    if (!row?.ingredient) return acc;
    acc[row.ingredient] = row.amount ?? "";
    return acc;
  }, {});
}

function mapDoc(doc: SanityDoc): Cocktail {
  const recipe = recipeArrayToObject(doc.recipe);
  const { abv, unknown } = calculateAbv(recipe, doc.method);

  if (unknown)
    console.log(`[ABV] ${doc.nameEng}: 無法計算，未知食材 → "${unknown}"`);
  return {
    ...doc,
    ingredients: Array.isArray(doc.ingredients) ? doc.ingredients : [],
    recipe,
    shots: typeof doc.shots === "number" ? doc.shots : undefined,
    alcohol: abv ?? undefined,
    tags: doc.tags?.length
      ? doc.tags
      : deriveTags(
          doc.nameEng,
          Array.isArray(doc.ingredients) ? doc.ingredients : [],
          recipe,
          doc.method
        ),
  };
}

export async function fetchCocktailsFromSanity(): Promise<Cocktail[]> {
  const client = createSanityReadClient();
  const rows = await client.fetch<SanityDoc[]>(COCKTAILS_QUERY);
  return rows.map(mapDoc);
}
