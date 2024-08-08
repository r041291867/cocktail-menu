import "./styles.css";
import CocktailItem from "@/components/cocktailItem";
import { cocktailMenu } from "@/data/hidden";

export default function HiddenPage({ onCloseClick = () => {} }) {
  return (
    <div className="hidden-page__frame">
      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img
            src={"./favicon.ico"}
            style={{ filter: "grayscale(1)" }}
            alt=""
          />
          <div className="handwrite-en2">The Hidden Menu</div>
          <div style={{ flex: 1 }}></div>
          <div
            className="close-btn"
            onClick={onCloseClick}
          >
            +
          </div>
        </div>
      </div>

      <div className="menu__grid">
        {cocktailMenu.map(({ category, categoryCh, cocktails }) => (
          <div
            key={category}
            className="menu__section"
          >
            <div className="menu__title handwrite-border sticky">
              <span className="handwrite-ch">{categoryCh}</span>
              <span
                className="handwrite-en2"
                style={{ marginLeft: 6 }}
              >
                {category}
              </span>
            </div>
            {cocktails.map((cocktail, index) =>
              cocktail.show ? (
                <CocktailItem
                  key={index + cocktail.nameEng}
                  cocktail={cocktail}
                />
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
