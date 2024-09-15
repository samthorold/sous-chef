import type { Recipe } from "~/server/repository";
import RecipeCard from "./recipecard";

export default async function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="w-48">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}
