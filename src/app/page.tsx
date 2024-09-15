import { RecipeRepository } from "~/server/repository";
import RecipeList from "./_components/recipelist";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recipes = await new RecipeRepository().getRecipesWithImages();
  return (
    <main className="">
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <div className="p-4">
          <div className="flex flex-wrap">
            <RecipeList recipes={recipes} />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
