"use client";

import { useEffect, useState } from "react";
import HiddenPage from "@/components/hiddenPage";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from "@/data/reciepe.js";
import Loading from "@/components/loading";

export default function HiddenApp() {
  const [showPopup, setShowPopup] = useState(false);
  const [resiepeItem, setResiepeItem] = useState(null);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, [setFontReady]);

  return (
    <div>
      <HiddenPage
        onCocktailClick={(cocktail) => {
          setShowPopup(true);
          setResiepeItem(getReciepe(cocktail.nameEng));
        }}
        onCloseClick={() => window.location.assign("/")}
      />

      {!fontReady && <Loading />}

      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Reciepe reciepe={resiepeItem} />
        </Popup>
      )}
    </div>
  );
}

