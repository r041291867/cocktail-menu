"use client";

import "../styles.css";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import HiddenPage from "@/components/hiddenPage";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from "@/data/reciepe.js";
import Loading from "@/components/loading";

export default function Hidden() {
  const [fontReady, setFontReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [resiepeItem, setResiepeItem] = useState(null);
  const router = useRouter();

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
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
