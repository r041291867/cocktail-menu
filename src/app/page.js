"use client";

import "./styles.css";
// import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CocktailItem from "@/components/cocktailItem";
import Loading from "@/components/loading";
import { cocktailMenu } from "@/data/cocktailMinimal";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from "@/data/reciepe.js";
import { useFontReady } from "@/store";

export default function Home() {
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
    <>
      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img src={"./favicon.ico"} alt="" />
          <div
            className="handwrite-en"
            onDoubleClick={() => router.push("/hidden")}
          >
            The Mixology Menu
          </div>
        </div>
      </div>

      <div className="menu__grid">
        {cocktailMenu.map(({ category, categoryCh, cocktails }) => (
          <div key={category} className="menu__section">
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
                onCocktailClick={() => {
                  setShowPopup(true);
                  setResiepeItem(getReciepe(cocktail.nameEng));
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {!fontReady && <Loading />}

      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Reciepe reciepe={resiepeItem} />
        </Popup>
      )}
    </>
  );
}
