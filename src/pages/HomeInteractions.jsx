"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Popup from "@/components/popup";
import Recipe from "@/components/recipe";
import { getRecipe } from "@/data/recipeUtils";

export default function HomeInteractions({ recipes = [] }) {
  const [fontReady, setFontReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [recipeItem, setRecipeItem] = useState(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });

    const header = document.querySelector("[data-home-title]");
    const onHeaderDoubleClick = () => window.location.assign("/hidden");
    header?.addEventListener("dblclick", onHeaderDoubleClick);

    const items = document.querySelectorAll("[data-recipe-name]");
    const onItemDoubleClick = (event) => {
      const { recipeName } = event.currentTarget.dataset;
      setRecipeItem(getRecipe(recipes, recipeName));
      setShowPopup(true);
    };
    items.forEach((item) => item.addEventListener("dblclick", onItemDoubleClick));

    // Intersection Observer for active nav item
    const navItems = document.querySelectorAll("[data-nav-id]");
    const sections = document.querySelectorAll(".menu__section[id]");

    const setActiveNav = (id) => {
      navItems.forEach((el) => {
        el.classList.toggle("active", el.dataset.navId === id);
      });
      // scroll active nav item into view horizontally
      const activeEl = document.querySelector(`[data-nav-id="${id}"]`);
      activeEl?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // find the topmost section that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveNav(visible[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0,
      }
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

  return (
    <>
      {!fontReady && <Loading />}
      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Recipe recipe={recipeItem} />
        </Popup>
      )}
    </>
  );
}

