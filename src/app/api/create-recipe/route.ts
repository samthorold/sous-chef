import { auth } from "@clerk/nextjs/server";
import { RecipeRepository } from "~/server/repository";

export const POST = async (req: Request) => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!req.body) throw new Error("No body");

  const formData = await req.formData();
  console.log("Recipe data:", formData);

  const recipeData: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      recipeData[key] = value;
    }
  }
  recipeData.userId = user.userId;
  console.log("Recipe data:", recipeData);

  if (!recipeData.name) throw new Error("Recipe name is required.");
  if (!recipeData.description)
    throw new Error("Recipe description is required.");
  if (!recipeData.userId) throw new Error("User ID is required.");

  const newRecipe = {
    name: recipeData.name,
    description: recipeData.description,
    userId: recipeData.userId,
  };
  console.log("New recipe:", newRecipe);

  const recipe = await new RecipeRepository().createRecipe(newRecipe);
  console.log("Recipe created:", recipe);
  return new Response(JSON.stringify(recipe), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
