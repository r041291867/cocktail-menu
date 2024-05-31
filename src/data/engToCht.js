const dictionary = {
  Features: "精選",
  Classics: "懷舊經典",
  "Just Relax": "輕鬆喝",
  Sour: "清新酸爽",
  Twist: "經典改編",
  gin: "琴酒",
  whisky: "威士忌",
  brandy: "白蘭地",
  rum: "蘭姆酒",
  vodka: "伏特加",
  tequila: "龍舌蘭",
  "rosso vermouth": "甜香艾酒",
  campari: "金巴利",
  cointreau: "君度橙酒",
  mint: "薄荷",
  lime: "萊姆",
  lemon: "檸檬",
  honey: "蜂蜜",
  sugar: "糖",
  soda: "蘇打水",
  "tonic water": "通寧水",
  water: "水",
  bitters: "苦精",
  ginger: "薑",
  cocoa: "可可",
  cream: "鮮奶油",
};

export function toChinese(englishText) {
  if (!dictionary[englishText]) return englishText;
  return dictionary[englishText];
}
