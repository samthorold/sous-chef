import { db } from "~/server/db";
import RecipeCard from "./recipecard";

export default async function RecipeList() {
  const recipes = await db.query.recipes.findMany();
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
