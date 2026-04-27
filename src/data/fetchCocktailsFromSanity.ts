import { createSanityReadClient } from "@/data/sanityClient";
import { calculateAbv } from "@/data/calculateAbv";
import { deriveTags } from "@/data/deriveTags";
import type { SanityRecipeRow, SanityDoc, Cocktail, IngredientMeta } from "@/types";

const COCKTAILS_QUERY = `*[_type == "cocktail" && defined(nameEng)] | order(nameEng asc) {
  ...
}`;

function buildRecipeData(recipe: SanityRecipeRow[] | undefined): {
  recipeObj: Record<string, string>;
  ingredientMeta: Record<string, IngredientMeta> | undefined;
} {
  if (!recipe || !Array.isArray(recipe)) return { recipeObj: {}, ingredientMeta: undefined };

  const { recipeObj, meta } = recipe.reduce<{
    recipeObj: Record<string, string>;
    meta: Record<string, IngredientMeta>;
  }>(
    (acc, row) => {
      if (!row?.ingredient) return acc;

      const hasMeta = row.chineseName || row.chineseFullName || row.abv !== undefined;
      return {
        recipeObj: { ...acc.recipeObj, [row.ingredient]: row.amount ?? "" },
        meta: hasMeta
          ? {
              ...acc.meta,
              [row.ingredient]: {
                ...(row.chineseName && { chineseName: row.chineseName }),
                ...(row.chineseFullName && { chineseFullName: row.chineseFullName }),
                ...(row.abv !== undefined && { abv: row.abv }),
              },
            }
          : acc.meta,
      };
    },
    { recipeObj: {}, meta: {} }
  );

  return {
    recipeObj,
    ingredientMeta: Object.keys(meta).length ? meta : undefined,
  };
}

function mapDoc(doc: SanityDoc): { cocktail: Cocktail; warning?: string } {
  const { recipeObj, ingredientMeta } = buildRecipeData(doc.recipe);
  const { abv, unknown } = calculateAbv(recipeObj, doc.method, ingredientMeta);

  const cocktail: Cocktail = {
    ...doc,
    ingredients: Array.isArray(doc.ingredients) ? doc.ingredients : [],
    recipe: recipeObj,
    ingredientMeta,
    shots: typeof doc.shots === "number" ? doc.shots : undefined,
    alcohol: abv ?? undefined,
    tags: doc.tags?.length
      ? doc.tags
      : deriveTags(
          doc.nameEng,
          Array.isArray(doc.ingredients) ? doc.ingredients : [],
          recipeObj,
          doc.method
        ),
  };

  return {
    cocktail,
    warning: unknown ? `[ABV] ${doc.nameEng}: 無法計算，未知食材 → "${unknown}"` : undefined,
  };
}

export async function fetchCocktailsFromSanity(): Promise<Cocktail[]> {
  const client = createSanityReadClient();
  const rows = await client.fetch<SanityDoc[]>(COCKTAILS_QUERY);
  return rows.map((doc) => {
    const { cocktail, warning } = mapDoc(doc);
    if (warning) console.log(warning);
    return cocktail;
  });
}
