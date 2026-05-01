import type { MenuCategory } from "@/types";

// 顏色對照表
// export const COCKTAIL_COLORS = {
//   amber:    "#c47a18", // 琥珀金　　威士忌、波本
//   tawny:    "#a05c14", // 棕褐　　　黑蘭姆
//   pale:     "#c8e8ef", // 淡藍清　　琴酒、通寧水
//   crystal:  "#ddf4f8", // 近透明　　伏特加、清澈基酒
//   ruby:     "#b8103a", // 深紅　　　尼格羅尼、金巴利
//   coral:    "#f0a060", // 粉橙　　　葡萄柚、帕洛瑪
//   orange:   "#f07820", // 橙紅　　　奧佩羅、Spritz
//   crimson:  "#c40b1e", // 鮮紅　　　金巴利
//   golden:   "#e8c84a", // 黃金　　　啤酒、香檳
//   espresso: "#2a0e00", // 極深棕　　可樂系
//   lime:     "#3db82a", // 草綠　　　蜜多麗、黃瓜
//   cobalt:   "#1a6fa0", // 藍色　　　藍柑橘
//   cream:    "#f0e0c0", // 奶白　　　貝禮詩、奶油系
//   daiquiri: "#eeebd4", // 乳白檸檬黃　黛克瑞、瑪格麗塔
// } as const;
export const cocktailMenu: MenuCategory[] = [
  {
    category: "Signature",
    categoryCh: "特調",
    cocktails: [
      {
        nameCht: "桂花費士",
        nameEng: "Osmanthus Fizz",
        color: "golden",
      },
      {
        nameCht: "草莓黛綺麗",
        nameEng: "Daiquiri",
        color: "ruby",
      },
      {
        nameCht: "子夜烏龍",
        nameEng: "Midnight Oolong",
        color: "tawny",
      },
      {
        nameCht: "抹茶古典",
        nameEng: "Matcha Fashioned",
        color: "lime",
        opacity: 0.3,
      },
      {
        nameCht: "英吉利海峽",
        nameEng: "English Channel",
        color: "amber",
        opacity: 0.5,
      },
    ],
  },
  // {
  //   category: "Tea",
  //   categoryCh: "茶",
  //   cocktails: [
  //     {
  //       nameCht: "蜜香紅茶",
  //       nameEng: "Gin & Tonic",
  //     },
  //     // {
  //     //   nameCht: "蜜柚綠茶",
  //     //   nameEng: "Yuzu Green Tea",
  //     // },
  //     {
  //       nameEng: "Mandarin Time Fizz",
  //       nameCht: "橘時費斯",
  //     },
  //     {
  //       nameCht: "蜜蘋法式伯爵",
  //       nameEng: "Apple French Earl",
  //     },
  //     {
  //       nameCht: "伯爵茶",
  //       nameEng: "Kamikaze",
  //     },
  //   ],
  // },
  {
    category: "Classics",
    categoryCh: "懷舊經典",
    cocktails: [
      {
        nameCht: "黛綺麗",
        nameEng: "Daiquiri",
        color: "daiquiri",
      },
      {
        nameCht: "側車",
        nameEng: "Sidecar",
        color: "amber",
      },
      {
        nameCht: "往日情懷",
        nameEng: "Old Fashioned",
        color: "amber",
      },
      {
        nameCht: "曼哈頓",
        nameEng: "Manhattan",
        color: "ruby",
      },
      {
        nameCht: "馬丁尼",
        nameEng: "Martini",
        color: "crystal",
        opacity: 0.5,
      },
    ],
  },
  {
    category: "New Era",
    categoryCh: "新經典",
    cocktails: [
      {
        nameCht: "盤尼西林",
        nameEng: "Penicillin",
        color: "golden",
      },
      {
        nameCht: "海明威特調",
        nameEng: "Hemingway Special",
        color: "coral",
      },
      {
        nameCht: "亡者復甦二號",
        nameEng: "Corpse Reviver #2",
        color: "crystal",
      },
      {
        nameCht: "瑪格麗特",
        nameEng: "Margarita",
        color: "daiquiri",
      },
      {
        nameCht: "茉莉",
        nameEng: "Jasmine",
        color: "coral",
      },
    ],
  },
  {
    category: "Modern Classic",
    categoryCh: "現代經典",
    cocktails: [
      {
        nameCht: "克朗代克高球",
        nameEng: "Klondike Highball",
        color: "tawny",
      },
      {
        nameCht: "M30-雨",
        nameEng: "M30 - Rain",
        color: "cobalt",
      },
      {
        nameCht: "伊麗莎白皇后",
        nameEng: "Queen Elizabeth",
        color: "golden",
        opacity: 0.5,
      },
      {
        nameCht: "翻雲覆雨",
        nameEng: "Hanky Panky",
        color: "ruby",
      },
    ],
  },
  {
    category: "Just Relax",
    categoryCh: "輕鬆喝",
    cocktails: [
      {
        nameCht: "嗨波魯",
        nameEng: "Highball",
        color: "amber",
      },
      {
        nameCht: "琴費士",
        nameEng: "Gin Fizz",
        color: "daiquiri",
      },
      {
        nameCht: "琴通寧",
        nameEng: "Gin & Tonic",
        color: "pale",
      },
      {
        nameCht: "夜黑風高",
        nameEng: "Dark 'N' Stormy",
        color: "tawny",
      },
    ],
  },
];
