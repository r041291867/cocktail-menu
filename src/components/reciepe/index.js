import "./styles.css";

export default function Reciepe({ reciepe }) {
  if (!reciepe) return null;

  const { nameEng, method, reciepe: ing, glass } = reciepe;

  function capitalize(str) {
    return str
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  if (ing) {
    return (
      <div
        className="handwrite-en"
        style={{ padding: "0 20px", transform: "none" }}
      >
        <div className="reciepe-name">
          {nameEng}
          {/* <div className="reciepe-alcohol lowMedium">12</div> */}

          {/* <div className="reciepe-alcohol">12 %</div> */}
          </div>
        <div className="method-and-glass">
          <div className="reciepe-method">{method}</div>
          <div className="reciepe-glass">{glass} Glass</div>
        </div>
        <div className="reciepe-ing">
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
