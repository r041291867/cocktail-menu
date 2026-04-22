import { ALCOHOL_DATA } from "./alcoholData";

export const INGREDIENT_ABV: Record<string, number> = Object.fromEntries(
  Object.entries(ALCOHOL_DATA).map(([eng, entry]) => [eng, entry.abv])
);
