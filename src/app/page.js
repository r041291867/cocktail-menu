"use client";

import "./styles.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import CocktailItem from "@/components/cocktailItem";
import Loading from "@/components/loading";
import HiddenPage from "@/components/hiddenPage";
import { cocktailMenu } from "@/data/cocktails";
import { toChinese } from "@/data/engToCht";

const randomNum = Math.round(Math.random() * 1000);
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showHiddenPage, setShowHiddenPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 2000 + randomNum);
  }, []);

  useEffect(() => {
    if (showHiddenPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showHiddenPage]);

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </Head>

      <div className="menu__header ">
        <div className="menu__header--inner handwrite-border">
          <img
            src={"./favicon.ico"}
            alt=""
          />
          <div className="handwrite-en2">The Mixology Menu</div>
          <div style={{ flex: 1 }}></div>
          <div onClick={() => setShowHiddenPage(true)}>+</div>
        </div>
      </div>

      <div className="menu__grid">
        {cocktailMenu.map(({ category, categoryCh, cocktails }) => (
          <div
            key={category}
            className="menu__section"
          >
            <div className="menu__title handwrite-border">
              <span className="handwrite-ch">{categoryCh}</span>
              <span
                className="handwrite-en2"
                style={{ marginLeft: 6 }}
              >
                {category}
              </span>
            </div>
            {cocktails.map((cocktail, index) => (
              <CocktailItem
                key={index + cocktail.nameEng}
                cocktail={cocktail}
              />
            ))}
          </div>
        ))}
      </div>

      {loading && <Loading />}

      {showHiddenPage && (
        <HiddenPage onCloseClick={() => setShowHiddenPage(false)} />
      )}
    </>
  );
}
