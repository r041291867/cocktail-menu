import "./styles.scss";
import { matchIngredient } from "@/data/recipeUtils";
import type { Cocktail } from "@/types";

interface Props {
  recipe: Cocktail | null;
  myBar?: string[];
}

type AlcoholLevel = "low" | "medium" | "mediumHigh" | "high";

export default function Recipe({ recipe, myBar = [] }: Props) {
  if (!recipe) return null;

  const { nameEng, method, recipe: ing, glass, alcohol, note } = recipe;

  function capitalize(str: string): string {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function getAlcoholColor(abv: number): AlcoholLevel {
    if (abv <= 10) return "low";
    if (abv <= 22) return "medium";
    if (abv <= 25) return "mediumHigh";
    return "high";
  }

  if (!ing || !Object.keys(ing).length) return null;

  return (
    <div
      className="handwrite-en"
      style={{ padding: "0 20px", transform: "none" }}
    >
      <div className="recipe-name">
        {nameEng}
        {alcohol ? (
          <div className={`recipe-alcohol ${getAlcoholColor(alcohol)}`}>
            abv {alcohol}%
          </div>
        ) : null}
      </div>
      <div className="method-and-glass">
        <div className="recipe-method">{method}</div>
        <div className="recipe-glass">{glass} Glass</div>
      </div>
      <div className="recipe-ing">
        {Object.keys(ing).map((item) => {
          const inBar = myBar.length > 0 && myBar.some((b) => matchIngredient(item, b));
          const missing = myBar.length > 0 && !inBar;
          return (
            <div key={item}>
              <div className="ing-name">
                {myBar.length > 0 && (
                  <span className={`ing-check ${inBar ? "ing-check--have" : "ing-check--miss"}`}>
                    {inBar ? "✓" : "✗"}
                  </span>
                )}
                {capitalize(item)}
              </div>
              <div className={`ing-content${missing ? " ing-content--miss" : ""}`}>{ing[item]}</div>
            </div>
          );
        })}
      </div>
      {note && <div className="recipe-note handwrite-ch">{note}</div>}
    </div>
  );
}
