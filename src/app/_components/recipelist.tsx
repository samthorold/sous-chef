import type { RecipeWithImages } from "~/server/repository";
import RecipeCard from "./recipecard";

function img_src(recipe: RecipeWithImages) {
  if (!recipe.images[0]) {
    return "";
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
    <div className="flex flex-wrap gap-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="w-48">
          <RecipeCard recipe={recipe} img_src={img_src(recipe)} />
        </div>
      ))}
    </div>
  );
}
