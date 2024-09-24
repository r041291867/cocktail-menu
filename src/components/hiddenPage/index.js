import "./styles.css";
import { useState } from "react";
import CocktailItem from "@/components/cocktailItem";
import { cocktailMenu } from "@/data/hidden";

export default function HiddenPage({ onCocktailClick = () => {}, onCloseClick = () => {} }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="hidden-page__frame">
      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img
            src={"./favicon.ico"}
            style={{ filter: "grayscale(1)" }}
            alt=""
          />
          <div
            className="handwrite-en"
            onDoubleClick={() => {
              setShowAll(!showAll);
            }}
          >
            The Hidden Menu
            {showAll && <span>.</span> }
          </div>
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
        {cocktailMenu.map(({ category, categoryCh, cocktails }) =>
          cocktails.filter((c) => c.show).length || showAll ? (
            <div
              key={category}
              className="menu__section"
            >
              <div className="menu__title handwrite-border sticky">
                <span className="handwrite-ch">{categoryCh}</span>
                <span
                  className="handwrite-en"
                  style={{ marginLeft: 6 }}
                >
                  {category}
                </span>
              </div>
              {cocktails.map((cocktail, index) =>
                cocktail.show || showAll ? (
                  <CocktailItem
                    key={index + cocktail.nameEng}
                    cocktail={cocktail}
                    onCocktailClick={() => onCocktailClick(cocktail)}
                  />
                ) : null
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
