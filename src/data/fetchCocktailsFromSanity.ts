import { createSanityReadClient } from "@/data/sanityClient";
import type { Cocktail } from "@/types";

const COCKTAILS_QUERY = `*[_type == "cocktail" && defined(nameEng)] | order(nameEng asc) {
  category,
  nameCht,
  nameEng,
  method,
  ingredients,
  glass,
  shots,
  alcohol,
  show,
  recipe,
  note
}`;

interface SanityRecipeRow {
  ingredient?: string;
  amount?: string;
}

interface SanityDoc {
  category: string;
  nameCht: string;
  nameEng: string;
  method?: string;
  ingredients?: string[];
  glass?: string;
  shots?: number;
  alcohol?: number;
  show?: boolean;
  recipe?: SanityRecipeRow[];
  note?: string;
}

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
  return {
    category: doc.category,
    nameCht: doc.nameCht,
    nameEng: doc.nameEng,
    method: doc.method,
    ingredients: Array.isArray(doc.ingredients) ? doc.ingredients : [],
    recipe: recipeArrayToObject(doc.recipe),
    glass: doc.glass,
    shots: typeof doc.shots === "number" ? doc.shots : undefined,
    alcohol: typeof doc.alcohol === "number" ? doc.alcohol : undefined,
    show: doc.show !== false,
    note: doc.note,
  };
}

export async function fetchCocktailsFromSanity(): Promise<Cocktail[]> {
  const client = createSanityReadClient();
  const rows = await client.fetch<SanityDoc[]>(COCKTAILS_QUERY);
  return rows.map(mapDoc);
}
