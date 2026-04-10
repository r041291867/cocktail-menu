"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from "@/data/reciepeUtils";

export default function HomeInteractions({ recipes = [] }) {
  const [fontReady, setFontReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reciepeItem, setReciepeItem] = useState(null);

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
      setReciepeItem(getReciepe(recipes, recipeName));
      setShowPopup(true);
    };
    items.forEach((item) => item.addEventListener("dblclick", onItemDoubleClick));

    return () => {
      header?.removeEventListener("dblclick", onHeaderDoubleClick);
      items.forEach((item) =>
        item.removeEventListener("dblclick", onItemDoubleClick)
      );
    };
  }, [recipes]);

  return (
    <>
      {!fontReady && <Loading />}
      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Reciepe reciepe={reciepeItem} />
        </Popup>
      )}
    </>
  );
}

