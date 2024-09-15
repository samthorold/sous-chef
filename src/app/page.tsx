import { db } from "~/server/db";
import RecipeList from "./_components/recipelist";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recipes = await db.query.recipes.findMany();
  return (
    <main className="p-4">
      <div className="flex flex-wrap">
        <RecipeList recipes={recipes} />
      </div>
    </main>
  );
}
