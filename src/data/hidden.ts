import type { Cocktail } from "@/types";

interface HiddenCategory {
  category: string;
  categoryCh: string;
  cocktails: Cocktail[];
}

function getCategoryCocktails(recipes: Cocktail[], category: string): Cocktail[] {
  return recipes
    .filter((item) => item.category === category)
    .sort((a, b) => {
      if (a.shots === b.shots) return a.nameEng > b.nameEng ? 1 : -1;
      return (a.shots ?? 0) - (b.shots ?? 0);
    });
}

export function buildHiddenCocktailMenu(recipes: Cocktail[]): HiddenCategory[] {
  return [
    { category: "Whiskey", categoryCh: "威士忌", cocktails: getCategoryCocktails(recipes, "Whiskey") },
    { category: "Gin", categoryCh: "琴酒", cocktails: getCategoryCocktails(recipes, "Gin") },
    { category: "Rum", categoryCh: "蘭姆酒", cocktails: getCategoryCocktails(recipes, "Rum") },
    { category: "Vodka", categoryCh: "伏特加", cocktails: getCategoryCocktails(recipes, "Vodka") },
    { category: "Brandy", categoryCh: "白蘭地", cocktails: getCategoryCocktails(recipes, "Brandy") },
    { category: "Tequila", categoryCh: "龍舌蘭", cocktails: getCategoryCocktails(recipes, "Tequila") },
    { category: "Else", categoryCh: "其他", cocktails: getCategoryCocktails(recipes, "Else") },
    { category: "Signature", categoryCh: "特調", cocktails: getCategoryCocktails(recipes, "Signature") },
  ];
}
