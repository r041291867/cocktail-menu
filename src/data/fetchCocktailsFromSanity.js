import { createSanityReadClient } from "@/lib/sanityClient";

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
  recipe
}`;

function recipeArrayToObject(recipe) {
  if (!recipe || !Array.isArray(recipe)) return {};
  return recipe.reduce((acc, row) => {
    if (!row?.ingredient) return acc;
    acc[row.ingredient] = row.amount ?? "";
    return acc;
  }, {});
}

function mapDoc(doc) {
  return {
    category: doc.category,
    nameCht: doc.nameCht,
    nameEng: doc.nameEng,
    method: doc.method,
    ingredients: Array.isArray(doc.ingredients) ? doc.ingredients : [],
    reciepe: recipeArrayToObject(doc.recipe),
    glass: doc.glass,
    shots: typeof doc.shots === "number" ? doc.shots : undefined,
    alcohol: typeof doc.alcohol === "number" ? doc.alcohol : undefined,
    show: doc.show !== false,
  };
}

export async function fetchCocktailsFromSanity() {
  const client = createSanityReadClient();
  const rows = await client.fetch(COCKTAILS_QUERY);
  return rows.map(mapDoc);
}
