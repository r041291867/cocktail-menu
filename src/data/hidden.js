function getCategoryCocktails(recipes, category) {
  return recipes
    .filter((item) => item.category === category)
    .sort((a, b) => {
      if (a.shots === b.shots) return a.nameEng > b.nameEng ? 1 : -1;
      return a.shots - b.shots;
    });
}

export function buildHiddenCocktailMenu(recipes) {
  return [
    {
      category: "Whiskey",
      categoryCh: "威士忌",
      cocktails: getCategoryCocktails(recipes, "Whiskey"),
    },
    {
      category: "Gin",
      categoryCh: "琴酒",
      cocktails: getCategoryCocktails(recipes, "Gin"),
    },
    {
      category: "Rum",
      categoryCh: "\u862d\u59c6\u9152",
      cocktails: getCategoryCocktails(recipes, "Rum"),
    },
    {
      category: "Vodka",
      categoryCh: "伏特加",
      cocktails: getCategoryCocktails(recipes, "Vodka"),
    },
    {
      category: "Brandy",
      categoryCh: "\u767d\u862d\u5730",
      cocktails: getCategoryCocktails(recipes, "Brandy"),
    },
    {
      category: "Tequila",
      categoryCh: "\u9f8d\u820c\u862d",
      cocktails: getCategoryCocktails(recipes, "Tequila"),
    },
    {
      category: "Else",
      categoryCh: "其他",
      cocktails: getCategoryCocktails(recipes, "Else"),
    },
    {
      category: "Signature",
      categoryCh: "特調",
      cocktails: getCategoryCocktails(recipes, "Signature"),
    },
  ];
}
