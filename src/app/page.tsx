import { RecipeRepository } from "~/server/repository";
import RecipeList from "./_components/recipelist";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Sidebar from "./_components/sidebar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recipes = await new RecipeRepository().getRecipesWithImages();
  return (
    <main>
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <div className="flex flex-row">
          <Sidebar />
          <RecipeList recipes={recipes} />
        </div>
      </SignedIn>
    </main>
  );
}
