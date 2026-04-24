"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Popup from "@/components/popup";
import Recipe from "@/components/recipe";
import { getRecipe } from "@/data/recipeUtils";
import type { Cocktail } from "@/types";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import QrCode from "@/components/qrcode";

interface Props {
  recipes?: Cocktail[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomeInteractions({ recipes = [] }: Props) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [fontReady, setFontReady] = useState(false);
  const [recipeItem, setRecipeItem] = useState<Cocktail | null>(null);
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.fonts.ready.then(() => setFontReady(true));

    const header = document.querySelector("[data-home-title]");
    const onHeaderDoubleClick = () => window.location.assign("/recipe");
    header?.addEventListener("dblclick", onHeaderDoubleClick);

    const items = document.querySelectorAll<HTMLElement>("[data-recipe-name]");
    const onItemDoubleClick = (event: Event) => {
      const el = event.currentTarget as HTMLElement;
      const recipeName = el.dataset.recipeName ?? "";
      setRecipeItem(getRecipe(recipes, recipeName));
    };
    items.forEach((item) =>
      item.addEventListener("dblclick", onItemDoubleClick)
    );

    const navItems = document.querySelectorAll<HTMLElement>("[data-nav-id]");
    const sections = document.querySelectorAll(".menu__section[id]");

    const setActiveNav = (id: string) => {
      navItems.forEach((el) =>
        el.classList.toggle("active", el.dataset.navId === id)
      );
      document
        .querySelector(`[data-nav-id="${id}"]`)
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [topmost] = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (topmost) setActiveNav(topmost.target.id);
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    if (sections.length > 0) setActiveNav(sections[0].id);

    return () => {
      header?.removeEventListener("dblclick", onHeaderDoubleClick);
      items.forEach((item) =>
        item.removeEventListener("dblclick", onItemDoubleClick)
      );
      observer.disconnect();
    };
  }, [recipes]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {!fontReady && <Loading />}

      {recipeItem && (
        <Popup onCloseClick={() => setRecipeItem(null)}>
          <Recipe recipe={recipeItem} />
        </Popup>
      )}

      <div
        className="float-qr-btn"
        onClick={() => {
          setCurrentUrl(window.location.href);
          setShowQrPopup(true);
        }}
      >
        <QrCode2OutlinedIcon style={{ fontSize: 28 }} />
      </div>

      {showQrPopup && (
        <Popup onCloseClick={() => setShowQrPopup(false)}>
          <QrCode currentUrl={currentUrl} />
        </Popup>
      )}
    </>
  );
}
