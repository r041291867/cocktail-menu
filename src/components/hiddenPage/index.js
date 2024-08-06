import "./styles.css";
import CocktailItem from "@/components/cocktailItem";
import { cocktailMenu } from "@/data/cocktails";
import { toChinese } from "@/data/engToCht";

export default function HiddenPage({ onCloseClick = () => {} }) {
  return (
    <div className="hidden-page__frame">
      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img
            src={"./favicon.ico"}
            alt=""
          />
          <div className="handwrite-en2">The Mixology Menu</div>
          <div style={{ flex: 1 }}></div>
          <div onClick={onCloseClick}>x</div>
        </div>
      </div>

      <div className="menu__grid">
        {cocktailMenu.map(({ category, cocktails }) => (
          <div
            key={category}
            className="menu__section"
          >
            <div className="menu__title handwrite-border">
              <span className="handwrite-ch">{toChinese(category)}</span>
              <span
                className="handwrite-en2"
                style={{ marginLeft: 6 }}
              >
                {category}
              </span>
            </div>
            {cocktails.map((cocktail, index) => (
              <CocktailItem
                key={index + cocktail.nameEng}
                cocktail={cocktail}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
