"use client";

import "../styles.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HiddenPage from "@/components/hiddenPage";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from "@/data/reciepe.js";
import Loading from "@/components/loading";
import { useFontReady } from "@/store";

export default function Hidden() {
  const [showPopup, setShowPopup] = useState(false);
  const [resiepeItem, setResiepeItem] = useState(null);
  const router = useRouter();
  const fontReady = useFontReady((state) => state.fontReady);
  const setFontReady = useFontReady((state) => state.setFontReady);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady();
    });
  }, []);

  return (
    <div>
      <HiddenPage
        onCocktailClick={(cocktail) => {
          setShowPopup(true);
          setResiepeItem(getReciepe(cocktail.nameEng));
        }}
        onCloseClick={() => router.push("/")}
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
