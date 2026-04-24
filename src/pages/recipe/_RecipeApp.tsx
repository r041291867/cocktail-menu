"use client";

import { useEffect, useState } from "react";
import RecipePage from "./_RecipePage";
import Drawer from "@/components/drawer";
import Recipe from "@/components/recipe";
import { getRecipe } from "@/data/recipeUtils";
import Loading from "@/components/loading";
import type { Cocktail } from "@/types";

interface Props {
  recipes?: Cocktail[];
}

export default function RecipeApp({ recipes = [] }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [recipeItem, setRecipeItem] = useState<Cocktail | null>(null);
  const [recipeMyBar, setRecipeMyBar] = useState<string[]>([]);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontReady(true);
    });
  }, [setFontReady]);

  return (
    <div>
      <RecipePage
        recipes={recipes}
        onCocktailClick={(cocktail, myBar) => {
          setShowPopup(true);
          setRecipeItem(getRecipe(recipes, cocktail.nameEng));
          setRecipeMyBar(myBar);
        }}
        onCloseClick={() => window.location.assign("/")}
      />

      {!fontReady && <Loading />}

      {showPopup && (
        <Drawer onClose={() => setShowPopup(false)}>
          <Recipe recipe={recipeItem} myBar={recipeMyBar} />
        </Drawer>
      )}
    </div>
  );
}
