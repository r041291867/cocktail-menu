import { INGREDIENT_ABV } from "./alcoholAbv";
import { isExcluded } from "./recipeUtils";

// ── 物理常數 ──────────────────────────────────────────────────────────────────
const C = 4.18;  // 液體比熱容，J/(g·°C)
const L = 334;   // 冰的融化潛熱，J/g
const T0 = 26;   // 假設材料初始溫度，°C

// 計算冰塊融化後的加水量（ml）
// 熱平衡推導：液體放熱 = 冰吸熱（融化 + 溫差）
//   VC(T0 - Tf) = m(L - Tf × C)  →  m = VC(T0 - Tf) / (L + Tf × C)
// shake 終溫 -3°C → 稀釋約 37.7%
// 其他方法終溫  0°C → 稀釋約 32.5%
function iceDilution(volumeMl: number, tFinal: number): number {
  return (volumeMl * C * (T0 - tFinal)) / (L + tFinal * C);
}

// 將 amount 字串轉換為毫升數
// 支援：ml、tsp（1 tsp = 2.5ml）、dash（1 dash = 0.8ml）
function parseAmountMl(amount: string): number | null {
  const s = amount.toLowerCase().trim();
  const dash = s.match(/^(\d+(?:\.\d+)?)\s*dash/);
  if (dash) return parseFloat(dash[1]) * 0.8;
  const tsp = s.match(/^(\d+(?:\.\d+)?)\s*tsp/);
  if (tsp) return parseFloat(tsp[1]) * 2.5;
  const bsp = s.match(/^(\d+(?:\.\d+)?)\s*bar\s*spoon/);
  if (bsp) return parseFloat(bsp[1]) * 2.5;
  const drop = s.match(/^(\d+(?:\.\d+)?)\s*drop/);
  if (drop) return parseFloat(drop[1]) * 0.05;
  const ml = s.match(/(\d+(?:\.\d+)?)\s*ml/i);
  if (ml) return parseFloat(ml[1]);
  return null;
}

// 查詢食材酒精濃度
// 優先完全比對，否則取「包含關鍵字中最長的那個」
// 例如 "Green Chartreuse" 會比對到 "green chartreuse"(55%) 而非 "chartreuse"(55%)
function lookupAbv(ingredient: string): number | null {
  const lower = ingredient.trim().toLowerCase();
  if (INGREDIENT_ABV[lower] !== undefined) return INGREDIENT_ABV[lower];
  let best: number | null = null;
  let bestLen = 0;
  for (const [key, abv] of Object.entries(INGREDIENT_ABV)) {
    if (lower.includes(key) && key.length > bestLen) {
      best = abv;
      bestLen = key.length;
    }
  }
  return best;
}

// 判斷 amount 是否為 to top（補滿）
function isToTop(amount: string): boolean {
  return /top/i.test(amount);
}

export type AbvResult =
  | { abv: number; unknown: null }    // 計算成功
  | { abv: null; unknown: string };   // 遇到未知食材，回傳名稱方便除錯

export function calculateAbv(
  recipe: Record<string, string>,
  method: string | undefined
): AbvResult {
  const isShake = /shake/i.test(method ?? "");
  const tFinal = isShake ? -3 : 0; // shake 終溫 -3°C，其他 0°C

  const baseItems: { volume: number; abv: number }[] = []; // 一般食材
  const topAbvs: number[] = [];                            // to top 食材的 ABV

  for (const [ingredient, amount] of Object.entries(recipe)) {
    // 跳過 garnish / optional / ratio 等標記
    if (isExcluded(ingredient) || isExcluded(amount)) continue;

    const abv = lookupAbv(ingredient);
    if (abv === null) return { abv: null, unknown: ingredient }; // 字典缺這個食材

    if (isToTop(amount)) {
      topAbvs.push(abv);
    } else {
      const volume = parseAmountMl(amount);
      if (volume === null) continue; // 無法解析用量時略過（如：適量、少許）
      baseItems.push({ volume, abv });
    }
  }

  if (!baseItems.length) return { abv: null, unknown: "no base ingredients" };

  const vBase = baseItems.reduce((s, e) => s + e.volume, 0);       // 基底總容積（ml）
  const alcoholMl = baseItems.reduce((s, e) => s + e.volume * e.abv / 100, 0); // 純酒精量（ml）

  // ── 沒有 to top 食材：直接計算稀釋後 ABV ─────────────────────────────────
  if (!topAbvs.length) {
    const dilution = iceDilution(vBase, tFinal);
    const abv = (alcoholMl / (vBase + dilution)) * 100;
    return { abv: Math.round(abv * 10) / 10, unknown: null };
  }

  // ── 有 to top 食材：基底 ABV 與 to top 以 1:3 混合 ──────────────────────
  const topAbv = topAbvs.reduce((a, b) => a + b, 0) / topAbvs.length; // 多個 to top 取平均

  if (isShake) {
    // shake：先對基底套用冰塊稀釋，再與 to top 1:2 混合
    const dilution = iceDilution(vBase, tFinal);
    const baseAbv = (alcoholMl / (vBase + dilution)) * 100;
    const abv = (baseAbv * 1 + topAbv * 2) / 3;
    return { abv: Math.round(abv * 10) / 10, unknown: null };
  } else {
    // build：直接用基底原始平均 ABV，不套用冰塊稀釋，再與 to top 1:3 混合
    const baseAbv = (alcoholMl / vBase) * 100;
    const abv = (baseAbv * 1 + topAbv * 3) / 4;
    return { abv: Math.round(abv * 10) / 10, unknown: null };
  }
}
