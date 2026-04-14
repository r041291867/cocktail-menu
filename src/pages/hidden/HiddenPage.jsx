import "./styles.scss";
import { useState, useEffect, useRef } from "react";
import CocktailItem from "@/components/cocktailItem";
// import { cocktailMenu } from "@/data/hidden";
import { toChinese } from "@/data/engToCht";
import Popup from "@/components/popup";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";

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
  const excludedKeywords = ["optional", "garnish", "ratio"];
export default function HiddenPage({
  recipes = [],
  onCocktailClick = () => {},
  onCloseClick = () => {},
}) {
  const [showAll, setShowAll] = useState(true);
  const [keywd, setKeywd] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showBarPopup, setShowBarPopup] = useState(false);
  const [tagList, setTagList] = useState([...tags]);
  const [inputText, setInputText] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const navRef = useRef(null);

  // My Bar state
  const [myBar, setMyBar] = useState(() => {
    try {
      const saved = localStorage.getItem("myBar");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyMakeable, setShowOnlyMakeable] = useState(false);
  const [barInputText, setBarInputText] = useState("");

  const visibleCategories = categories
    .map((category) => ({
      category,
      categoryCh: toChinese(category),
      cocktails: getCategoryCocktails(category),
    }))
    .filter(({ cocktails }) => cocktails.filter((c) => c.show).length || showAll);

  useEffect(() => {
    localStorage.setItem("myBar", JSON.stringify(myBar));
  }, [myBar]);

  useEffect(() => {
    const sections = document.querySelectorAll(".menu__section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    if (sections.length > 0) setActiveSection(sections[0].id);
    return () => observer.disconnect();
  }, [keywd, showAll]);

  useEffect(() => {
    if (!activeSection || !navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-nav-id="${activeSection}"]`);
    activeEl?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeSection]);



  function getMatchInfo(cocktail) {
    if (!myBar.length) return null;
    const recipe = cocktail.recipe || {};
    const ingredients = (cocktail.ingredients || []).filter((ing) => {
      const ingLower = ing.toLowerCase();
      // 排除帶有 excludedKeywords 的材料或份量
      if (excludedKeywords.some((kw) => ingLower.includes(kw))) return false;
      const amountLower = (recipe[ing] ?? "").toLowerCase();
      return !excludedKeywords.some((kw) => amountLower.includes(kw));
    });
    if (!ingredients.length) return null;

    const missingCount = ingredients.filter((ing) => {
      const a = ing.toLowerCase();
      return !myBar.some((barIng) => {
        const b = barIng.toLowerCase();
        return a.includes(b) || b.includes(a);
      });
    }).length;

    return { missing: missingCount, total: ingredients.length };
  }

  function getCategoryCocktails(category) {
    let result = filterByKeyword(recipes, keywd).filter(
      (item) => item.category === category
    );

    if (showOnlyMakeable && myBar.length) {
      result = result.filter((cocktail) => getMatchInfo(cocktail)?.missing === 0);
    }

    return result.sort((a, b) => {
      if (a.shots === b.shots) return a.nameEng > b.nameEng ? 1 : -1;
      return a.shots - b.shots;
    });
  }

  function filterByKeyword(cocktails, keywords = []) {
    if (!keywords.length) return cocktails;

    let result = cocktails;

    keywords.forEach((keyword) => {
      const lowerCaseKeyword = keyword.toLowerCase();
      result = result.filter((cocktail) => {
        return (
          cocktail.category?.toLowerCase().includes(lowerCaseKeyword) ||
          cocktail.nameEng?.toLowerCase().includes(lowerCaseKeyword) ||
          cocktail.nameCht?.includes(keyword) ||
          cocktail.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(lowerCaseKeyword)
          )
        );
      });
    });

    return result;
  }

  function addToBar() {
    if (!barInputText.trim()) return;
    const newIng = barInputText.trim().toLowerCase();
    if (!myBar.includes(newIng)) {
      setMyBar([...myBar, newIng]);
    }
    setBarInputText("");
  }

  return (
    <div className="hidden-page__frame">
      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img
            src={"/images/favicon.ico"}
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

      <nav className="category-nav">
        <div className="category-nav__inner" ref={navRef}>
          {visibleCategories.map(({ category, categoryCh }) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className={`category-nav__item handwrite-ch${activeSection === category.toLowerCase() ? " active" : ""}`}
              data-nav-id={category.toLowerCase()}
            >
              {categoryCh}
            </a>
          ))}
        </div>
      </nav>

      <div className="menu__grid">
        {visibleCategories.map(({ category, categoryCh, cocktails }) => (
          <div
            key={category}
            id={category.toLowerCase()}
            className="menu__section"
          >
            <div className="menu__title handwrite-border sticky">
              <span className="handwrite-ch">{categoryCh}</span>
              <span className="handwrite-en" style={{ marginLeft: 6 }}>
                {category}
              </span>
            </div>
            {cocktails.map((cocktail, index) =>
              cocktail.show || showAll ? (
                <CocktailItem
                  key={index + cocktail.nameEng}
                  showAll={showAll}
                  cocktail={cocktail}
                  recipes={recipes}
                  matchInfo={getMatchInfo(cocktail)}
                  onCocktailClick={() => onCocktailClick(cocktail)}
                />
              ) : null
            )}
          </div>
        ))}
      </div>

      {/* Filter button */}
      <div className="floatBtn" onClick={() => setShowFilterPopup(true)}>
        {keywd.length > 0 && (
          <div className="tag-count">{keywd.length}</div>
        )}
      </div>

      {/* My Bar button */}
      <div
        className={`floatBtn floatBtn--bar${showOnlyMakeable ? " active" : ""}`}
        onClick={() => setShowBarPopup(true)}
      >
        <LiquorOutlinedIcon style={{ fontSize: 28 }} />
        {myBar.length > 0 && showOnlyMakeable && (
          <div className="tag-count">{myBar.length}</div>
        )}
      </div>

      {/* Filter popup */}
      {showFilterPopup && (
        <Popup onCloseClick={() => setShowFilterPopup(false)}>
          <h3 className="popup-h3 handwrite-ch" style={{ marginTop: 8 }}>
            篩選
            {keywd.length ? (
              <div
                className="popup-h3-clear"
                onClick={() => {
                  setKeywd([]);
                  setShowFilterPopup(false);
                }}
              >
                clear
              </div>
            ) : null}
          </h3>

          <div className="filter-input-frame">
            <div className="handwrite-ch">Search / Add:</div>
            <input
              className="filter-input handwrite-ch"
              type="text"
              value={inputText}
              placeholder="Type to filter..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!inputText.trim()) return;
                  const newTag = inputText.trim();
                  if (!tagList.includes(newTag)) setTagList([...tagList, newTag]);
                  if (!keywd.includes(newTag)) setKeywd([...keywd, newTag]);
                  setInputText("");
                }
              }}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div
              style={{ fontWeight: "bold", userSelect: "none", cursor: "pointer" }}
              onClick={() => {
                if (!inputText.trim()) return;
                const newTag = inputText.trim();
                if (!tagList.includes(newTag)) setTagList([...tagList, newTag]);
                if (!keywd.includes(newTag)) setKeywd([...keywd, newTag]);
                setInputText("");
              }}
            >
              +
            </div>
          </div>

          <div className="tags-list handwrite-ch">
            {tagList.map((tag) => (
              <div
                key={tag}
                className={`tags${keywd.includes(tag) ? " active" : ""}`}
                onClick={() => {
                  if (keywd.includes(tag)) {
                    setKeywd(keywd.filter((k) => k !== tag));
                  } else {
                    setKeywd([...keywd, tag]);
                  }
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </Popup>
      )}

      {/* My Bar popup */}
      {showBarPopup && (
        <Popup onCloseClick={() => setShowBarPopup(false)}>
          <h3 className="popup-h3 handwrite-ch" style={{ marginTop: 8 }}>
            我的吧台
            <div
              className={`popup-h3-toggle handwrite-ch${showOnlyMakeable ? " active" : ""}`}
              onClick={() => setShowOnlyMakeable(!showOnlyMakeable)}
            >
              只顯示可做的
            </div>
          </h3>

          <div className="filter-input-frame">
            <div className="handwrite-ch">新增材料:</div>
            <input
              className="filter-input handwrite-ch"
              type="text"
              value={barInputText}
              placeholder="輸入材料..."
              onKeyDown={(e) => {
                if (e.key === "Enter") addToBar();
              }}
              onChange={(e) => setBarInputText(e.target.value)}
            />
            <div
              style={{ fontWeight: "bold", userSelect: "none", cursor: "pointer" }}
              onClick={addToBar}
            >
              +
            </div>
          </div>

          <div className="tags-list handwrite-ch">
            {myBar.map((ing) => (
              <div
                key={ing}
                className="tags active"
                onClick={() => setMyBar(myBar.filter((i) => i !== ing))}
              >
                {ing} ×
              </div>
            ))}
            {!myBar.length && (
              <div className="bar-empty">尚未新增任何材料</div>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}
