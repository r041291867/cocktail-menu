import "./styles.scss";
import ShotIcon from "@/components/shotIcon";
import { isExcluded, matchIngredient } from "@/data/recipeUtils";
import { toChinese } from "@/data/engToCht";
import type { Cocktail } from "@/types";

interface Props {
  recipe: Cocktail | null;
  myBar?: string[];
}

const GLASS_ICON: Record<string, string> = {
  coupe: "/images/glass/ic-glass-coupe.svg",
  lowball: "/images/glass/ic-glass-rocks.svg",
  highball: "/images/glass/ic-glass-highball.svg",
  collins: "/images/glass/ic-glass-collins.svg",
  martini: "/images/glass/ic-glass-martini.svg",
  nick_nora: "/images/glass/ic-glass-nick-nora.svg",
  hurricane: "/images/glass/ic-glass-hurricane.svg",
};

function capitalize(str: string) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getAlcoholShots(abv: number) {
  if (abv <= 10) return 1;
  if (abv <= 16) return 1.5;
  if (abv <= 22) return 2;
  if (abv <= 25) return 2.5;
  return 3;
}

function getShotList(shots: number) {
  const list: string[] = [];
  const full = Math.floor(shots);
  for (let i = 0; i < full; i++) list.push("filled");
  if (shots % 1 === 0.5) list.push("half");
  while (list.length < 3) list.push("empty");
  return list;
}

function isGarnishRow(key: string, val: string) {
  return (
    key.toLowerCase().includes("garnish") ||
    val.toLowerCase().includes("garnish")
  );
}

function getGarnishName(key: string, val: string) {
  return val.toLowerCase().includes("garnish") ? key : val;
}

export default function Recipe({ recipe, myBar = [] }: Props) {
  if (!recipe) return null;

  const {
    nameCht,
    nameEng,
    method,
    recipe: ing,
    glass,
    alcohol,
    shots,
    note,
  } = recipe;

  if (!ing || !Object.keys(ing).length) return null;

  const entries = Object.entries(ing);
  const mainIngredients = entries.filter(([k, v]) => !isGarnishRow(k, v));
  const garnishItems = entries
    .filter(([k, v]) => isGarnishRow(k, v))
    .map(([k, v]) => getGarnishName(k, v));

  const glassIcon = glass ? (GLASS_ICON[glass.toLowerCase()] ?? null) : null;
  const glassLabel = glass ? capitalize(glass.replace(/_/g, " ")) : null;

  const shotCount = alcohol ? getAlcoholShots(alcohol) : (shots ?? null);
  const shotList = shotCount ? getShotList(shotCount) : null;
  const abvPercent = alcohol ? Math.min((alcohol / 50) * 100, 100) : null;

  return (
    <div className="recipe">
      {/* Title */}
      <div className="recipe__title">
        <div className="recipe__name-ch handwrite-ch">{nameCht}</div>
        <div className="recipe__name-en handwrite-en">{nameEng}</div>
      </div>

      {/* Info row */}
      <div className="recipe__info-row">
        {glassIcon && (
          <div className="recipe__glass-img">
            <img src={glassIcon} alt={glass} />
          </div>
        )}
        <div className="recipe__info-panel">
          {glassLabel && (
            <div className="recipe__info-block">
              <div className="recipe__info-label handwrite-en">
                GLASS / <span className="handwrite-ch">杯型</span>
              </div>
              <div className="recipe__info-value handwrite-en">
                {glassLabel}
              </div>
            </div>
          )}
          {shotList && (
            <div className="recipe__info-block">
              <div className="recipe__info-label handwrite-en">
                STRENGTH / <span className="handwrite-ch">烈度</span>
              </div>
              <div className="recipe__shots">
                {shotList.map((status, i) => (
                  <ShotIcon
                    key={i}
                    status={status as "filled" | "half" | "empty"}
                    width={18}
                    color="#aaa"
                  />
                ))}
              </div>
            </div>
          )}
          {abvPercent !== null && (
            <div className="recipe__info-block">
              <div className="recipe__info-label handwrite-en">ABV</div>
              <div className="recipe__abv-row">
                <div className="recipe__abv-bar">
                  <div
                    className="recipe__abv-fill"
                    style={{ width: `${abvPercent}%` }}
                  />
                </div>
                <div className="recipe__abv-text handwrite-en">
                  {alcohol}% ABV
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="recipe__divider" />

      {/* Ingredients */}
      <div className="recipe__section-label handwrite-en">
        RECIPE / <span className="handwrite-ch">酒譜</span>
      </div>
      <div className="recipe__ingredients">
        {mainIngredients.map(([item, amount]) => {
          const excluded = isExcluded(item) || isExcluded(amount);
          const inBar =
            !excluded &&
            myBar.length > 0 &&
            myBar.some((b) => matchIngredient(item, b));
          const missing = !excluded && myBar.length > 0 && !inBar;
          return (
            <div
              key={item}
              className={`recipe__ing-row${missing ? " recipe__ing-row--miss" : ""}`}
            >
              <div className="recipe__ing-name">
                {myBar.length > 0 && !excluded && (
                  <span
                    className={`ing-check ${inBar ? "ing-check--have" : "ing-check--miss"}`}
                  >
                    {inBar ? "✓" : "✗"}
                  </span>
                )}
                <span className="recipe__ing-ch handwrite-ch">
                  {toChinese(item)}
                </span>
                <span className="recipe__ing-en handwrite-en">
                  {capitalize(item)}
                </span>
              </div>
              <div className="recipe__ing-amount handwrite-en">{amount}</div>
            </div>
          );
        })}
      </div>

      {/* Method */}
      {method && (
        <div className="recipe__bottom-block">
          <div className="flex-1">
            <div className="recipe__info-label handwrite-en">
              METHOD / <span className="handwrite-ch">作法</span>
            </div>
            <div className="recipe__bottom-value handwrite-ch">{method}</div>
          </div>
          <div className="flex-1">
            <div className="recipe__info-label handwrite-en">
              GARNISH / <span className="handwrite-ch">裝飾</span>
            </div>
            {garnishItems.map((g) => (
              <div key={g} className="recipe__bottom-value handwrite-ch">
                {toChinese(g)}
              </div>
            ))}
          </div>
        </div>
      )}

      {note && (
        <div className="recipe__bottom-block">
          <div className="recipe__info-label handwrite-en">
            NOTE / <span className="handwrite-ch">備註</span>
          </div>
          <div className="recipe__note handwrite-ch">{note}</div>
        </div>
      )}
    </div>
  );
}
