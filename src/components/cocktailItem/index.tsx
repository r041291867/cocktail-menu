import "./styles.scss";
import ShotIcon from "../shotIcon";
import { toChinese } from "../../data/engToCht";
import { getRecipe } from "@/data/recipeUtils";
import type { Cocktail, CocktailSummary, MatchInfo } from "@/types";

interface Props {
  cocktail: Cocktail | CocktailSummary;
  recipes?: Cocktail[];
  matchInfo?: MatchInfo | null;
  onCocktailClick?: () => void;
}

function isFull(c: Cocktail | CocktailSummary): c is Cocktail {
  return "ingredients" in c && Array.isArray((c as Cocktail).ingredients);
}

function getAlcoholShots(alcohol: number): number {
  if (alcohol <= 10) return 1;
  if (alcohol <= 16) return 1.5;
  if (alcohol <= 22) return 2;
  if (alcohol <= 25) return 2.5;
  return 3;
}

export default function CocktailItem({
  cocktail,
  recipes = [],
  matchInfo = null,
  onCocktailClick = () => {},
}: Props) {
  const {
    hasImage = false,
    src = "",
    imgPosition = "left",
  } = cocktail as CocktailSummary;

  function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function numToRate(num: number) {
    const result = [];
    for (let i = 0; i < Math.floor(num); i++) {
      result.push(<ShotIcon key={"fill" + i} status="filled" />);
    }
    if (num % 1 === 0.5) {
      result.push(<ShotIcon key="half" status="half" />);
    }
    while (result.length < 3) {
      result.push(<ShotIcon key={"empty" + result.length} status="empty" />);
    }
    return result;
  }

  const recipe: Cocktail | null =
    isFull(cocktail) && cocktail.ingredients.length > 0
      ? cocktail
      : getRecipe(recipes, cocktail.nameEng);

  if (!recipe) return null;

  const shots = recipe.alcohol
    ? getAlcoholShots(recipe.alcohol)
    : (recipe.shots ?? 0);

  return (
    <div className="cocktail__outer" onDoubleClick={onCocktailClick}>
      {hasImage && imgPosition === "left" && (
        <div
          className="cocktail__image cocktail__image--left"
          style={
            src
              ? { background: `url(${src}) center/cover no-repeat` }
              : undefined
          }
        />
      )}

      <div className="cocktail__frame">
        <div className="cocktail__main">
          <div className="cocktail__name">
            <div className="cocktail__cht handwrite-ch">{cocktail.nameCht}</div>
            <div className="cocktail__eng handwrite-en">{cocktail.nameEng}</div>
          </div>

          <div className="cocktail__stars">
            {numToRate(shots)}
            {matchInfo !== null && (
              <div
                className={`cocktail__match ${
                  matchInfo!.missing === 0
                    ? "match-full"
                    : matchInfo!.missing === 1
                      ? "match-near"
                      : "match-miss"
                }`}
              >
                {matchInfo!.missing === 0 ? "✓" : `缺${matchInfo!.missing}`}
              </div>
            )}
          </div>
        </div>

        <div className="cocktail__ingredients--ch handwrite-ch">
          {recipe.ingredients.map((str) => toChinese(str)).join(" / ")}
        </div>
        <div className="cocktail__ingredients handwrite-en">
          {recipe.ingredients.map((str) => capitalize(str)).join(" / ")}
        </div>
      </div>

      {hasImage && imgPosition === "right" && (
        <div
          className="cocktail__image cocktail__image--right"
          style={
            src
              ? { background: `url(${src}) center/cover no-repeat` }
              : undefined
          }
        />
      )}
    </div>
  );
}
