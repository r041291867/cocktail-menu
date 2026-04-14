import "./styles.scss";

export default function Recipe({ recipe }) {
  if (!recipe) return null;

  const { nameEng, method, recipe: ing, glass, alcohol = undefined } = recipe;

  function capitalize(str) {
    return str
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  function getAlcoholColor(alcohol) {
    if (alcohol <= 10) {
      return "low";
    } else if (alcohol <= 22) {
      return "medium";
    } else if (alcohol <= 25) {
      return "mediumHigh";
    } else {
      return "high";
    }
  }

  if (ing) {
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
  } else {
    return null;
  }
}
