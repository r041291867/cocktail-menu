const dictionary = {
  gin: "琴酒",
  "souler gin": "琴酒",
  whisky: "威士忌",
  whiskey: "威士忌",
  brandy: "白蘭地",
  calvados: "蘋果白蘭地",
  "apricot brandy": "杏桃白蘭地",
  rum: "蘭姆酒",
  vodka: "伏特加",
  tequila: "龍舌蘭",
  mezcal: "梅茲卡爾",
  vermouth: "香艾酒",
  "rosso vermouth": "甜香艾酒",
  "dry vermouth": "不甜香艾酒",
  campari: "金巴利",
  cointreau: "橙酒",
  "grand marnier": "柑曼怡",
  curacao: "橙酒",
  "blue curacao": "藍柑橘",
  umeshu: "梅酒",
  mint: "薄荷",
  lime: "萊姆",
  lemon: "檸檬",
  honey: "蜂蜜",
  sugar: "糖",
  grapefruit: "葡萄柚",
  maraschino: "黑櫻桃",
  soda: "蘇打水",
  "tonic water": "通寧水",
  "green tea": "綠茶",
  water: "水",
  bitters: "苦精",
  ginger: "薑",
  cacao: "可可",
  cream: "鮮奶油",
  amarula: "大象奶酒",
  milk: "牛奶",
  "fernet branca": "芙內布蘭卡",
  mango: "芒果",
  coffee: "咖啡",
  espresso: "濃縮咖啡",
  "coconut milk": "椰奶",
  cola: "可樂",
  pineapple: "鳳梨",
  orange: "柳橙",
  grenadine: "紅石榴",
  prosecco: "氣泡酒",
  "sparkling wine": "氣泡酒",
  aperol: "阿普羅",
  lillet: "麗葉酒",
  absinthe: "艾碧斯",
  "egg white": "蛋白",
  "egg yolk": "蛋黃",
  "orange flower water": "橙花水",
  "white cacao": "白可可",
  "white crème de menthe": "白薄荷",
  "green crème de menthe": "綠薄荷",
  bénédictine: "班尼迪克汀",
  amaro: "義大利苦酒",
  chartreuse: "夏翠斯",
  "yellow chartreuse":"黃夏翠斯",
  "green chartreuse":"綠夏翠斯",
  "white wine": "白葡萄酒",
  "port wine": "波特酒",
  "peach schnapps": "蜜桃白蘭地",
  orgeat: "杏仁",
  amaretto: "杏仁酒",
  violet: "紫羅蘭",
  "agave syrup": "龍舌蘭糖漿",
  raspberry: "覆盆莓",
  cherry: "櫻桃",
  "white peach": "白桃",
  "sugar cane": "甘蔗",
  cranberry: "蔓越莓",
  cassis: "黑醋栗",
  champagne: "香檳",
  galliano: "加利安諾",
  passionfruit: "百香果",
  vanilla: "香草",
  tea: "茶",
  ponkan: "椪柑",
  cucumber: "小黃瓜",
  suze: "龍膽草"
};

export function toChinese(englishText) {
  const lowerCase = englishText.toLowerCase();
  if (!dictionary[lowerCase]) return englishText;
  return dictionary[lowerCase];
}
