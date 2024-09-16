import type { RecipeWithImages } from "~/server/repository";
import RecipeCard from "./recipecard";

// read the img_src from the SOUS_CHEF_DEFAULT_RECIPE_LIST_IMG_SRC env var

function img_src(recipe: RecipeWithImages) {
  if (!recipe.images[0]) {
    const img_src = process.env.SOUS_CHEF_DEFAULT_RECIPE_LIST_IMG_SRC;
    if (!img_src) {
      return "";
    }
    return img_src;
  } else {
    return recipe.images[0].url;
  }
}

export default async function RecipeList({
  recipes,
}: {
  recipes: RecipeWithImages[];
}) {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} img_src={img_src(recipe)} />
      ))}
    </div>
  );
}
