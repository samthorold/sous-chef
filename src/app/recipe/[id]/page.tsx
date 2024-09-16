import { SignedIn, SignedOut } from "@clerk/nextjs";
import RecipeCard from "~/app/_components/recipecard";
import { RecipeRepository } from "~/server/repository";

export default async function RecipePage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;
  const recipe = await new RecipeRepository().getRecipe(id);
  return (
    <main>
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <RecipeCard recipe={recipe} img_src="" />
      </SignedIn>
    </main>
  );
}
