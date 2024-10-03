"use client";

import "./styles.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import CocktailItem from "@/components/cocktailItem";
import Loading from "@/components/loading";
import HiddenPage from "@/components/hiddenPage";
import { cocktailMenu } from "@/data/cocktails";
import Popup from "@/components/popup";
import Reciepe from "@/components/reciepe";
import { getReciepe } from '@/data/reciepe.js'
// import { toChinese } from "@/data/engToCht";

const randomNum = Math.round(Math.random() * 1000);
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [resiepeItem, setResiepeItem] = useState(null);
  const [showHiddenPage, setShowHiddenPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1000 + randomNum);
  }, []);

  useEffect(() => {
    if (showHiddenPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showHiddenPage]);

  const item = {
    name: "Highball",
    method: "Build",
    reciepe: {
      whisky: "45ml",
      soda: "to top",
    },
    glass: "Lowball",
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img src={"./favicon.ico"} alt="" />
          <div className="handwrite-en" onDoubleClick={() => setShowHiddenPage(true)}>The Mixology Menu</div>
          <div style={{ flex: 1 }}></div>
          {/* <div onClick={() => setShowHiddenPage(true)}>+</div> */}
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
                  setResiepeItem(getReciepe(cocktail.nameEng))
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {loading && <Loading />}

      {showHiddenPage && (
        <HiddenPage
          onCocktailClick={(cocktail) => {
            setShowPopup(true);
            setResiepeItem(getReciepe(cocktail.nameEng))
          }}
          onCloseClick={() => setShowHiddenPage(false)}
        />
      )}

      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Reciepe reciepe={resiepeItem} />
        </Popup>
      )}
    </>
  );
}
