"use client";

import { useEffect, useState } from "react";
import HiddenPage from "@/components/hiddenPage";
import Popup from "@/components/popup";
import Recipe from "@/components/recipe";
import { getRecipe } from "@/data/recipeUtils";
import Loading from "@/components/loading";

export default function HiddenApp({ recipes = [] }) {
  const [showPopup, setShowPopup] = useState(false);
  const [recipeItem, setRecipeItem] = useState(null);
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

