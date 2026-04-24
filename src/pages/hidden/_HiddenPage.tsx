import "./styles.scss";
import { useState, useEffect, useMemo, useCallback } from "react";
import CocktailItem from "@/components/cocktailItem";
import { toChinese } from "@/data/engToCht";
import Popup from "@/components/popup";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import QrCode from "@/components/qrcode";
import { computeMatchInfo } from "@/data/recipeUtils";
import InputWithButton from "@/components/inputWithButton";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Cocktail, MatchInfo } from "@/types";

interface Props {
  recipes?: Cocktail[];
  onCocktailClick?: (cocktail: Cocktail, myBar: string[]) => void;
  onCloseClick?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HiddenPage({
  recipes = [],
  onCocktailClick = () => {},
  onCloseClick = () => {},
}: Props) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [keywd, setKeywd] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([...TAGS]);
  const [inputText, setInputText] = useState("");
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const [myBar, setMyBar] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("myBar") ?? "[]");
    } catch {
      return [];
    }
  });
  const [barInputText, setBarInputText] = useState("");
  const [showOnlyMakeable, setShowOnlyMakeable] = useState(false);
  const [showBarPopup, setShowBarPopup] = useState(false);

  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const [currentUrl, setCurrentUrl] = useState("");
  const [showQrPopup, setShowQrPopup] = useState(false);

  const { activeSection, navRef } = useActiveSection(".menu__section", [keywd]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const getMatchInfo = useMemo(() => computeMatchInfo(myBar), [myBar]);

  const filteredRecipes = useMemo(
    () => filterByKeywords(keywd)(recipes),
    [recipes, keywd]
  );

  const sortedBar = useMemo(
    () => [...myBar].sort((a, b) => a.localeCompare(b)),
    [myBar]
  );

  const visibleCategories = useMemo(
    () =>
      buildVisibleCategories(filteredRecipes, showOnlyMakeable, getMatchInfo),
    [filteredRecipes, showOnlyMakeable, getMatchInfo]
  );

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("myBar", JSON.stringify(myBar));
  }, [myBar]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const addTag = useCallback(() => {
    const tag = inputText.trim();
    if (!tag) return;
    setTagList((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setKeywd((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
    setInputText("");
  }, [inputText]);

  const toggleTag = useCallback((tag: string) => {
    setKeywd((prev) =>
      prev.includes(tag) ? prev.filter((k) => k !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilter = useCallback(() => {
    setKeywd([]);
    // setShowFilterPopup(false);
  }, []);

  const addToBar = useCallback(() => {
    const ing = barInputText.trim().toLowerCase();
    if (!ing) return;
    setMyBar((prev) => (prev.includes(ing) ? prev : [...prev, ing]));
    setBarInputText("");
  }, [barInputText]);

  const removeFromBar = useCallback(
    (ing: string) => setMyBar((prev) => prev.filter((i) => i !== ing)),
    []
  );

  const openQr = useCallback(() => {
    setCurrentUrl(window.location.href);
    setShowQrPopup(true);
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="hidden-page__frame">
      <div className="menu__header">
        <div className="menu__header--inner handwrite-border">
          <img
            src="/images/favicon.ico"
            style={{ filter: "grayscale(1)" }}
            alt=""
          />
          <div className="handwrite-en">The Mixology Recipe Book</div>
          <div style={{ flex: 1 }} />
          <div className="close-btn" onClick={onCloseClick}>
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
            <div className="menu__title handwrite-border">
              <span className="handwrite-ch">{categoryCh}</span>
              <span className="handwrite-en" style={{ marginLeft: 6 }}>
                {category}
              </span>
            </div>
            {cocktails.map((cocktail, index) => (
              <CocktailItem
                key={index + cocktail.nameEng}
                cocktail={cocktail}
                recipes={recipes}
                onCocktailClick={() => onCocktailClick(cocktail, myBar)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Float buttons */}
      <div
        className="floatBtn floatBtn--filter"
        onClick={() => setShowFilterPopup(true)}
      >
        <SearchOutlinedIcon style={{ fontSize: 28 }} />
        {keywd.length > 0 && <div className="tag-count">{keywd.length}</div>}
      </div>

      <div
        className={`floatBtn floatBtn--bar${showOnlyMakeable ? " active" : ""}`}
        onClick={() => setShowBarPopup(true)}
      >
        <LiquorOutlinedIcon style={{ fontSize: 28 }} />
        {myBar.length > 0 && showOnlyMakeable && (
          <div className="tag-count">{myBar.length}</div>
        )}
      </div>

      <div className="floatBtn floatBtn--qr" onClick={openQr}>
        <QrCode2OutlinedIcon style={{ fontSize: 28 }} />
      </div>

      {/* Filter popup */}
      {showFilterPopup && (
        <Popup onCloseClick={() => setShowFilterPopup(false)}>
          <h3 className="popup-h3 handwrite-ch" style={{ marginTop: 8 }}>
            篩選
            {keywd.length > 0 && (
              <div className="popup-h3-clear" onClick={clearFilter}>
                clear
              </div>
            )}
          </h3>

          <InputWithButton
            label="新增材料:"
            value={inputText}
            placeholder="Type to filter..."
            onChange={setInputText}
            onSubmit={addTag}
          />

          <div className="tags-list handwrite-ch">
            {tagList.map((tag) => (
              <div
                key={tag}
                className={`tags${keywd.includes(tag) ? " active" : ""}`}
                onClick={() => toggleTag(tag)}
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
              onClick={() => setShowOnlyMakeable((v) => !v)}
            >
              只顯示可做的
            </div>
          </h3>

          <InputWithButton
            label="新增材料:"
            value={barInputText}
            placeholder="輸入材料..."
            onChange={setBarInputText}
            onSubmit={addToBar}
          />

          <div className="bar-list handwrite-ch">
            {sortedBar.map((ing) => (
              <div key={ing} className="bar-item">
                {ing}
                <div
                  className="bar-item-remove close-btn"
                  onClick={() => setConfirmRemove(ing)}
                >
                  +
                </div>
              </div>
            ))}
            {!myBar.length && <div className="bar-empty">尚未新增任何材料</div>}
          </div>
        </Popup>
      )}

      {/* Confirm remove popup */}
      {confirmRemove !== null && (
        <Popup width={200} onCloseClick={() => setConfirmRemove(null)}>
          <p className="handwrite-ch" style={{ margin: "8px 0 20px" }}>
            確定移除「{confirmRemove}」？
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <div
              className="tags handwrite-ch"
              onClick={() => setConfirmRemove(null)}
            >
              取消
            </div>
            <div
              className="tags active handwrite-ch"
              onClick={() => {
                removeFromBar(confirmRemove);
                setConfirmRemove(null);
              }}
            >
              確定
            </div>
          </div>
        </Popup>
      )}

      {/* QR popup */}
      {showQrPopup && (
        <Popup onCloseClick={() => setShowQrPopup(false)}>
          <QrCode currentUrl={currentUrl} />
        </Popup>
      )}
    </div>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
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

const TAGS = [
  ...CATEGORIES,
  "Campari",
  "Grapefruit",
  "Grenadine",
  "Orgeat",
  "Prosecco",
  "Champagne",
  "Absinthe",
  "Bénédictine",
];

// ─── Pure Functions ───────────────────────────────────────────────────────────

function filterByKeywords(keywords: string[]) {
  return (cocktails: Cocktail[]): Cocktail[] =>
    keywords.reduce((result, keyword) => {
      const lc = keyword.toLowerCase();
      return result.filter(
        (c) =>
          c.category?.toLowerCase().includes(lc) ||
          c.nameEng?.toLowerCase().includes(lc) ||
          c.nameCht?.includes(keyword) ||
          c.ingredients?.some((ing) => ing.toLowerCase().includes(lc))
      );
    }, cocktails);
}

function sortCocktails(cocktails: Cocktail[]): Cocktail[] {
  return [...cocktails].sort((a, b) => {
    const aAbv = a.alcohol ?? Infinity;
    const bAbv = b.alcohol ?? Infinity;
    const diff = aAbv - bAbv;
    return diff !== 0 ? diff : a.nameEng > b.nameEng ? 1 : -1;
  });
}

function buildVisibleCategories(
  filteredRecipes: Cocktail[],
  showOnlyMakeable: boolean,
  getMatchInfo: (c: Cocktail) => MatchInfo | null
) {
  const isMakeable = (c: Cocktail): boolean => {
    if (!showOnlyMakeable) return true;
    const info = getMatchInfo(c);
    return info === null || info.missing === 0;
  };

  return CATEGORIES.flatMap((category) => {
    const cocktails = sortCocktails(
      filteredRecipes.filter((c) => c.category === category && isMakeable(c))
    );
    return cocktails.length > 0
      ? [{ category, categoryCh: toChinese(category), cocktails }]
      : [];
  });
}
