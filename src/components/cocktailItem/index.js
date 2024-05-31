import "./styles.scss";
import ShotIcon from "../shotIcon";
import { toChinese } from "../../data/engToCht";

export default function CocktailItem({ cocktail }) {
  const { hasImage = false, src = "", imgPosition = "left" } = cocktail;

  const numToRate = (num) => {
    let result = [];

    for (let i = 0; i < num; i++) {
      result = [...result, <ShotIcon key={"fill" + i} status="filled" />];
    }
    for (let i = 0; i < 3 - num; i++) {
      result = [...result, <ShotIcon key={"empty" + i} status="empty" />];
    }

    return result;
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={`cocktail__outer`}>
      {hasImage && imgPosition === "left" && (
        <div
          className="cocktail__image cocktail__image--left"
          style={
            src ? { background: `url(${src}) center/cover no-repeat` } : null
          }
        ></div>
      )}

      <div className="cocktail__frame">
        <div className="cocktail__main">
          <div className="cocktail__name">
            <div className="cocktail__cht handwrite-ch">{cocktail.nameCht}</div>
            <div className="cocktail__eng handwrite-en">{cocktail.nameEng}</div>
          </div>

          <div className="cocktail__stars">{numToRate(cocktail.shots)}</div>
        </div>

        <div className="cocktail__ingredients--ch handwrite-ch">
          {cocktail.ingredients.map((str) => toChinese(str)).join(" / ")}
        </div>
        <div className="cocktail__ingredients handwrite-en">
          {cocktail.ingredients.map((str) => capitalize(str)).join(" / ")}
        </div>
      </div>

      {hasImage && imgPosition === "right" && (
        <div
          className="cocktail__image cocktail__image--right"
          style={
            src ? { background: `url(${src}) center/cover no-repeat` } : null
          }
        ></div>
      )}
    </div>
  );
}
