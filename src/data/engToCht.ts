import { ALCOHOL_DATA } from "./alcoholData";

// 非食材的類別標籤翻譯
const MISC_DICT: Record<string, string> = {
  "applejack":     "蘋果白蘭地",
  "apricot":       "杏桃",
  "apricot brandy": "杏桃白蘭地",
  "cacao":         "可可",
  "cherry":        "櫻桃",
  "else":          "其他",
  "fruits":        "水果",
  "grapes":        "葡萄",
  "imbibe":        "Imbibe雜誌",
  "mocktail":      "無酒精",
  "peaty":         "泥煤",
  "signature":     "特調",
  "souler gin":    "琴酒",
};

export function toChinese(englishText: string): string {
  const lower = englishText.toLowerCase();
  return ALCOHOL_DATA[lower]?.shortName ?? MISC_DICT[lower] ?? englishText;
}

export function toChineseFull(englishText: string): string {
  const lower = englishText.toLowerCase();
  return ALCOHOL_DATA[lower]?.fullName ?? MISC_DICT[lower] ?? englishText;
}
