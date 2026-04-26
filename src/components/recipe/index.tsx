import "./styles.scss";
import ShotIcon from "@/components/shotIcon";
import {
  isExcluded,
  matchIngredient,
  capitalize,
  getAlcoholShots,
  getShotList,
} from "@/data/recipeUtils";
import { toChinese, toChineseFull } from "@/data/engToCht";
import type { Cocktail } from "@/types";

const GLASS_ICON: Record<string, string> = {
  coupe: "/images/glass/ic-glass-coupe.svg",
  lowball: "/images/glass/ic-glass-rocks.svg",
  highball: "/images/glass/ic-glass-highball.svg",
  collins: "/images/glass/ic-glass-collins.svg",
  martini: "/images/glass/ic-glass-martini.svg",
  nick_nora: "/images/glass/ic-glass-nick-nora.svg",
  hurricane: "/images/glass/ic-glass-hurricane.svg",
};

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
    story,
    note,
    tags,
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
  const abvPercent = alcohol ? Math.min((alcohol / 40) * 100, 100) : null;

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
            <InfoBlock en="GLASS" ch="杯型">
              <div className="recipe__info-value handwrite-en">
                {glassLabel}
              </div>
            </InfoBlock>
          )}
          {shotList && (
            <InfoBlock en="STRENGTH" ch="烈度">
              <div className="recipe__shots">
                {shotList.map((status, i) => (
                  <ShotIcon key={i} status={status} width={18} color="#aaa" />
                ))}
              </div>
            </InfoBlock>
          )}
          {abvPercent !== null && (
            <InfoBlock en="ABV" ch="度數">
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
            </InfoBlock>
          )}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="tags-list">
          {tags.map((tag) => (
            <span key={tag} className="tags handwrite-ch">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="recipe__divider" />

      {/* Ingredients */}
      <div className="recipe__section-label handwrite-en">
        <InfoLabel en="RECIPE" ch="酒譜" />
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
                  {toChineseFull(item)}
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
            <InfoLabel en="METHOD" ch="作法" />
            <div className="recipe__bottom-value handwrite-ch">{method}</div>
          </div>

          {garnishItems.length > 0 && (
            <div className="flex-1">
              <InfoLabel en="GARNISH" ch="裝飾" />
              {garnishItems.map((g) => (
                <div key={g} className="recipe__bottom-value handwrite-ch">
                  {toChinese(g)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {story && (
        <div className="recipe__bottom-block">
          <div>
            <InfoLabel en="STORY" ch="故事" />
            <div className="recipe__note handwrite-ch">{story}</div>
          </div>
        </div>
      )}

      {note && (
        <div className="recipe__bottom-block">
          <div>
            <InfoLabel en="NOTE" ch="備註" />
            <div className="recipe__note handwrite-ch">{note}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  recipe: Cocktail | null;
  myBar?: string[];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoLabel({ en, ch }: { en: string; ch?: string }) {
  return (
    <div className="recipe__info-label">
      {ch ? (
        <>
          <span className="handwrite-ch">{ch}</span> /{" "}
          <span className="handwrite-en">{en}</span>
        </>
      ) : (
        <span className="handwrite-en">{en}</span>
      )}
    </div>
  );
}

function InfoBlock({
  en,
  ch,
  children,
}: {
  en: string;
  ch?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="recipe__info-block">
      <InfoLabel en={en} ch={ch} />
      {children}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isGarnishRow(key: string, val: string) {
  return (
    key.toLowerCase().includes("garnish") ||
    val.toLowerCase().includes("garnish")
  );
}

function getGarnishName(key: string, val: string) {
  return val.toLowerCase().includes("garnish") ? key : val;
}
