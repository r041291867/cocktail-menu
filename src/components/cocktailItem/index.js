import "./styles.scss";
import ShotIcon from "../shotIcon";
import { toChinese } from "../../data/engToCht";
import { getReciepe } from '@/data/reciepe.js'

export default function CocktailItem({ cocktail, onCocktailClick = () => {} }) {
  const { hasImage = false, src = "", imgPosition = "left" } = cocktail;

  const numToRate = (num) => {
    let result = [];

    // 處理滿杯子
    for (let i = 0; i < Math.floor(num); i++) {
      result = [...result, <ShotIcon key={"fill" + i} status="filled" />];
    }

    // 處理半滿杯子
    if (num % 1 === 0.5) {
      result = [...result, <ShotIcon key={"half"} status="half" />];
    }

    // 處理空杯子
    const emptyCups = 3 - result.length;
    for (let i = 0; i < emptyCups; i++) {
      result = [...result, <ShotIcon key={"empty" + i} status="empty" />];
    }

    return result;
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const reciepe = getReciepe(cocktail.nameEng);

  return (
    <div className={`cocktail__outer`} onDoubleClick={onCocktailClick}>
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

          <div className="cocktail__stars">{numToRate(reciepe.shots)}</div>
        </div>

        <div className="cocktail__ingredients--ch handwrite-ch">
          {reciepe.ingredients.map((str) => toChinese(str)).join(" / ")}
        </div>
        <div className="cocktail__ingredients handwrite-en">
          {reciepe.ingredients.map((str) => capitalize(str)).join(" / ")}
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
