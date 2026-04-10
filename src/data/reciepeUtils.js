export function getReciepe(recipes, nameEng) {
  if (!nameEng || !recipes?.length) return "";
  return recipes.find((cocktail) => cocktail.nameEng === nameEng) ?? "";
}
