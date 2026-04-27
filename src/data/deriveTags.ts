export type CocktailTag =
  | "清新"
  | "氣泡"
  | "酸甜"
  | "苦甜"
  | "草本"
  | "果香"
  | "熱帶"
  | "奶香"
  | "重酒感"
  | "煙燻"
  | "泥煤";

const TAG_RULES: { tag: CocktailTag; keywords: string[] }[] = [
  {
    tag: "氣泡",
    keywords: [
      "soda",
      "soda water",
      "tonic",
      "tonic water",
      "champagne",
      "prosecco",
      "sparkling wine",
      "ginger beer",
      "ginger ale",
      "cola",
    ],
  },
  {
    tag: "酸甜",
    keywords: [
      "lemon juice",
      "lime juice",
      "lemon",
      "lime",
      "yuzu",
      "grapefruit juice",
      "grapefruit",
    ],
  },
  {
    tag: "草本",
    keywords: [
      "chartreuse",
      "green chartreuse",
      "yellow chartreuse",
      "absinthe",
      "fernet",
      "fernet branca",
      "cynar",
      "suze",
      "bénédictine",
      "basil",
      "mint",
    ],
  },
  {
    tag: "果香",
    keywords: [
      "mango",
      "mango juice",
      "passionfruit",
      "passionfruit juice",
      "pineapple",
      "pineapple juice",
      "raspberry",
      "berries",
      "cassis",
      "crème de cassis",
      "peach",
      "peach juice",
      "white peach",
      "peach schnapps",
      "cranberry",
      "cranberry juice",
      "grape juice",
      "melon",
      "midori",
      "cointreau",
      "triple sec",
      "curacao",
      "blue curacao",
      "grand marnier",
      "maraschino",
      "limoncello",
      "aperol",
      "crème de mûre",
    ],
  },
  {
    tag: "苦甜",
    keywords: [
      "campari",
      "aperol",
      "amaro",
      "cynar",
      "fernet",
      "fernet branca",
      "suze",
      "amer picon",
    ],
  },
  {
    tag: "熱帶",
    keywords: [
      "pineapple", "pineapple juice",
      "passionfruit", "passionfruit juice",
      "mango", "mango juice",
      "coconut milk", "coconut cream", "coconut water",
      "falernum", "orgeat",
    ],
  },
  {
    tag: "奶香",
    keywords: [
      "cream", "heavy cream",
      "milk", "coconut milk", "coconut cream",
      "amarula",
    ],
  },
  {
    tag: "清新",
    keywords: [
      "cucumber",
      "mint",
      "basil",
      "yuzu",
      "elderflower",
      "st-germain",
    ],
  },
  {
    tag: "煙燻",
    keywords: ["mezcal"],
  },
  {
    tag: "泥煤",
    keywords: ["peaty"],
  },
];

// 手動覆蓋：nameEng → 強制加入的 tag（用於無法從食材推導的情況）
const TAG_OVERRIDES: Record<string, CocktailTag[]> = {};

const CITRUS = ["lemon", "lime", "grapefruit", "orange juice", "yuzu"];

export function deriveTags(
  nameEng: string,
  ingredients: string[],
  recipe: Record<string, string>,
  method?: string,
): CocktailTag[] {
  const allIngredients = [...ingredients, ...Object.keys(recipe)].map((s) =>
    s.toLowerCase()
  );

  const hasKeyword = (keyword: string) => {
    const re = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    return allIngredients.some((ing) => re.test(ing));
  };

  const tags = new Set<CocktailTag>();

  for (const { tag, keywords } of TAG_RULES) {
    if (keywords.some(hasKeyword)) tags.add(tag);
  }

  // 重酒感：stir 手法且無柑橘類果汁
  if (/stir/i.test(method ?? "") && !CITRUS.some(hasKeyword)) {
    tags.add("重酒感");
  }

  // 酸甜 需要有甜味才成立，避免純酸味的攢紋式調酒被誤標
  if (tags.has("酸甜")) {
    const hasSweetener = [
      "syrup",
      "grenadine",
      "orgeat",
      "honey",
      "sugar",
      "cointreau",
      "triple sec",
      "curacao",
      "grand marnier",
      "liqueur",
      "amaretto",
    ].some(hasKeyword);
    if (!hasSweetener) tags.delete("酸甜");
  }

  for (const override of TAG_OVERRIDES[nameEng] ?? []) {
    tags.add(override);
  }

  return [...tags];
}
