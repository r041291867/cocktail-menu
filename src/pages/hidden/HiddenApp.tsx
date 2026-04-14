"use client";

import { useEffect, useState } from "react";
import HiddenPage from "./HiddenPage";
import Popup from "@/components/popup";
import Recipe from "@/components/recipe";
import { getRecipe } from "@/data/recipeUtils";
import Loading from "@/components/loading";
import type { Cocktail } from "@/types";

interface Props {
  recipes?: Cocktail[];
}

export default function HiddenApp({ recipes = [] }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [recipeItem, setRecipeItem] = useState<Cocktail | null>(null);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, [setFontReady]);

  return (
    <div>
      <HiddenPage
        recipes={recipes}
        onCocktailClick={(cocktail) => {
          setShowPopup(true);
          setRecipeItem(getRecipe(recipes, cocktail.nameEng));
        }}
        onCloseClick={() => window.location.assign("/")}
      />

      {!fontReady && <Loading />}

      {showPopup && (
        <Popup onCloseClick={() => setShowPopup(false)}>
          <Recipe recipe={recipeItem} />
        </Popup>
      )}
    </div>
  );
}

