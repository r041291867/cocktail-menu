import "./styles.scss";
import type { Cocktail } from "@/types";

interface Props {
  recipe: Cocktail | null;
}

type AlcoholLevel = "low" | "medium" | "mediumHigh" | "high";

export default function Recipe({ recipe }: Props) {
  if (!recipe) return null;

  const { nameEng, method, recipe: ing, glass, alcohol } = recipe;

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
        {Object.keys(ing).map((item) => (
          <div key={item}>
            <div className="ing-name">{capitalize(item)}</div>
            <div className="ing-content">{ing[item]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
