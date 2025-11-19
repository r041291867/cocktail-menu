import "./styles.css";
import { useState } from "react";
import CocktailItem from "@/components/cocktailItem";
// import { cocktailMenu } from "@/data/hidden";
import { reciepe } from "@/data/reciepe";
import { toChinese } from "@/data/engToCht";
import Popup from "../popup";

const categories = [
  "Whiskey",
  "Gin",
  "Rum",
  "Vodka",
  "Brandy",
  "Tequila",
  "Else",
  "Signature",
  "Imbibe",
  "Mocktail",
];

const tags = [
  ...categories,
  "Campari",
  "Grapefruit",
  "Grenadine",
  "Orgeat",
  "Prosecco",
  "Champagne",
  "Absinthe",
  "Bénédictine"
];

export default function HiddenPage({
  onCocktailClick = () => {},
  onCloseClick = () => {},
}) {
  const [showAll, setShowAll] = useState(true);
  const [keywd, setKeywd] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tagList, setTagList] = useState([...tags]);
  const [inputText, setInputText] = useState("");

  function getCategoryCocktails(category) {
    return filterByKeyword(reciepe, keywd)
      .filter((item) => item.category === category)
      .sort((a, b) => {
        if (a.shots === b.shots) return a.nameEng > b.nameEng ? 1 : -1;
        else return a.shots - b.shots;
      });
  }

  function filterByKeyword(cocktails, keywords = []) {
    if (!keywords.length) return cocktails;

    let result = cocktails;

    keywords.forEach((keyword) => {
      const lowerCaseKeyword = keyword.toLowerCase();
      result = result.filter((cocktail) => {
        return (
          cocktail.category.toLowerCase().includes(lowerCaseKeyword) ||
          cocktail.nameEng.toLowerCase().includes(lowerCaseKeyword) ||
          cocktail.nameCht.includes(keyword) ||
          cocktail.ingredients.filter((ingredient) =>
            ingredient.toLowerCase().includes(lowerCaseKeyword)
          ).length
          // Object.keys(cocktail.reciepe).filter(
          //   (key) => key.toLowerCase().includes(lowerCaseKeyword).length
          // )
        );
      });
    });

    return result;
  }

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
            The Mixology Menu
            {showAll && <span>.</span>}
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
        {categories
          .map((category) => ({
            category: category,
            categoryCh: toChinese(category),
            cocktails: getCategoryCocktails(category),
          }))
          .map(({ category, categoryCh, cocktails }) =>
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
                      showAll={showAll}
                      cocktail={cocktail}
                      onCocktailClick={() => onCocktailClick(cocktail)}
                    />
                  ) : null
                )}
              </div>
            ) : null
          )}
      </div>

      <div
        className="floatBtn"
        onClick={() => {
          setShowPopup(true);
        }}
        // onDoubleClick={() => setKeywd([])}
      >
        {keywd.length ? <div className="tag-count">{keywd.length}</div> : null}
      </div>

      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <h3
            className="popup-h3 handwrite-ch"
            style={{ marginTop: 8 }}
          >
            Filter
            {keywd.length ? (
              <div
                className="popup-h3-clear"
                onClick={() => {
                  setKeywd([]);
                  setShowPopup(false);
                }}
              >
                clear
              </div>
            ) : null}
          </h3>

          <div className="filter-input-frame">
            <div className="handwrite-ch">Add Tags:</div>

            <input
              className="filter-input handwrite-ch"
              type="text"
              value={inputText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!inputText) return;
                  // setKeywd([...keywd, inputText]);
                  setTagList([...tagList, inputText.trim()]);
                  setInputText("");
                }
              }}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
            <div
              style={{ fontWeight: "bold", userSelect: "none" }}
              onClick={() => {
                if (!inputText) return;
                setTagList([...tagList, inputText.trim()]);
                setInputText("");
              }}
            >
              +
            </div>
            {/* <img src="/images/ic-search.png" alt="" / */}
          </div>

          <div className="tags-list handwrite-ch">
            {tagList.map((tag) => (
              <div
                key={tag}
                className={`tags${keywd.includes(tag) ? " active" : ""}`}
                onClick={() => {
                  if (keywd.includes(tag)) {
                    setKeywd([...keywd.filter((key) => key !== tag)]);
                  } else {
                    setKeywd([...keywd, tag]);
                    setShowPopup(false);
                  }
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </Popup>
      )}
    </div>
  );
}
