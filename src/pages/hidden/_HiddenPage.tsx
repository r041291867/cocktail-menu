import "./styles.scss";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import CocktailItem from "@/components/cocktailItem";
import { toChinese } from "@/data/engToCht";
import Popup from "@/components/popup";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import QrCode from "@/components/qrcode";
import { isExcluded } from "@/data/recipeUtils";
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

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const getMatchInfo = useCallback(
    (cocktail: Cocktail) => computeMatchInfo(myBar)(cocktail),
    [myBar]
  );

  const filteredRecipes = useMemo(
    () => filterByKeywords(keywd)(recipes),
    [recipes, keywd]
  );

  const visibleCategories = useMemo(
    () =>
      buildVisibleCategories({
        filteredRecipes,
        showOnlyMakeable,
        myBar,
        getMatchInfo,
      }),
    [filteredRecipes, showOnlyMakeable, myBar, getMatchInfo]
  );

  // ── Effects ────────────────────────────────────────────────────────────────
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
  }, [keywd]);

  useEffect(() => {
    if (!activeSection || !navRef.current) return;
    navRef.current
      .querySelector(`[data-nav-id="${activeSection}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeSection]);

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
    setShowFilterPopup(false);
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

          <div className="filter-input-frame">
            <div className="handwrite-ch">Search / Add:</div>
            <input
              className="filter-input handwrite-ch"
              type="text"
              value={inputText}
              placeholder="Type to filter..."
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
            />
            <div
              style={{
                fontWeight: "bold",
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={addTag}
            >
              +
            </div>
          </div>

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

          <div className="filter-input-frame">
            <div className="handwrite-ch">新增材料:</div>
            <input
              className="filter-input handwrite-ch"
              type="text"
              value={barInputText}
              placeholder="輸入材料..."
              onChange={(e) => setBarInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addToBar()}
            />
            <div
              style={{
                fontWeight: "bold",
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={addToBar}
            >
              +
            </div>
          </div>

          <div className="bar-list handwrite-ch">
            {[...myBar]
              .sort((a, b) => a.localeCompare(b))
              .map((ing) => (
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

function getRequiredIngredients(cocktail: Cocktail): string[] {
  return (cocktail.ingredients ?? []).filter(
    (ing) => !isExcluded(ing) && !isExcluded(cocktail.recipe?.[ing] ?? "")
  );
}

function normalizeSpelling(s: string): string {
  return s.toLowerCase().replace(/whiskey/g, "whisky");
}

function matchIngredient(ingredient: string, barItem: string): boolean {
  const a = normalizeSpelling(ingredient);
  const b = normalizeSpelling(barItem);
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    new RegExp(`\\b${escape(b)}\\b`).test(a) ||
    new RegExp(`\\b${escape(a)}\\b`).test(b)
  );
}

function computeMatchInfo(myBar: string[]) {
  return (cocktail: Cocktail): MatchInfo | null => {
    if (!myBar.length) return null;
    const ingredients = getRequiredIngredients(cocktail);
    if (!ingredients.length) return null;
    const missing = ingredients.filter(
      (ing) => !myBar.some((barItem) => matchIngredient(ing, barItem))
    ).length;
    return { missing, total: ingredients.length };
  };
}

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
    const diff = (a.shots ?? 0) - (b.shots ?? 0);
    return diff !== 0 ? diff : a.nameEng > b.nameEng ? 1 : -1;
  });
}

interface BuildArgs {
  filteredRecipes: Cocktail[];
  showOnlyMakeable: boolean;
  myBar: string[];
  getMatchInfo: (c: Cocktail) => MatchInfo | null;
}

function buildVisibleCategories({
  filteredRecipes,
  showOnlyMakeable,
  myBar,
  getMatchInfo,
}: BuildArgs) {
  return CATEGORIES.map((category) => {
    const cocktails = sortCocktails(
      filteredRecipes
        .filter((c) => c.category === category)
        .filter(
          (c) =>
            !showOnlyMakeable || !myBar.length || getMatchInfo(c)?.missing === 0
        )
    );
    return { category, categoryCh: toChinese(category), cocktails };
  }).filter(({ cocktails }) => cocktails.length > 0);
}
