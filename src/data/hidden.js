import { reciepe } from "./reciepe";

function getCategoryCocktails(category) {
  return reciepe
    .filter((item) => item.category === category)
    .sort((a, b) => {
      if (a.shots === b.shots) return a.nameEng > b.nameEng ? 1 : -1;
      else return a.shots - b.shots;
    });
}

export const cocktailMenu = [
  {
    category: "Whiskey",
    categoryCh: "威士忌",
    cocktails: getCategoryCocktails("Whiskey"),
  },
  {
    category: "Gin",
    categoryCh: "琴酒",
    cocktails: getCategoryCocktails("Gin"),
  },
  {
    category: "Rum",
    categoryCh: "蘭姆酒",
    cocktails: getCategoryCocktails("Rum"),
  },
  {
    category: "Vodka",
    categoryCh: "伏特加",
    cocktails: getCategoryCocktails("Vodka"),
  },
  {
    category: "Brandy",
    categoryCh: "白蘭地",
    cocktails: getCategoryCocktails("Brandy"),
  },
  {
    category: "Tequila",
    categoryCh: "龍舌蘭",
    cocktails: getCategoryCocktails("Tequila"),
  },
  {
    category: "Else",
    categoryCh: "其他",
    cocktails: getCategoryCocktails("Else"),
  },
  {
    category: "Signature",
    categoryCh: "特調",
    cocktails: getCategoryCocktails("Signature"),
  },
];
