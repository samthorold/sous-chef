import { auth } from "@clerk/nextjs/server";
import { RecipeRepository } from "~/server/repository";

export const POST = async (req: Request) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!req.body) throw new Error("No body");

  const repo = new RecipeRepository();

  const formData = await req.formData();
  console.log("Recipe data:", formData);
  const recipeData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    recipeData[key] = value;
  }
  recipeData.userId = user.userId;
  console.log("Recipe data:", recipeData);

  const recipe = await repo.createRecipe(recipeData);
  console.log("Recipe created:", recipe);
  return new Response(JSON.stringify(recipe), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
