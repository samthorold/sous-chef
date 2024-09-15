import "server-only";

import { db } from "./db";
import { image, recipe } from "./db/schema";
import { sql } from "drizzle-orm";

export type Recipe = {
  id: number;
  lifetimeId: number;
  parentId: number | null;
  userId: string;
  name: string;
  createdAt: Date;
  contentId: string;
  vectorId: string;
};

export type RecipeWithLatestImage = {
  recipe: Recipe;
  img_src: string;
};

export class RecipeRepository {
  async createRecipe(newRecipe: Recipe) {
    await db.insert(recipe).values(newRecipe);
  }

  async getRecipe(id: number) {
    const recipe = await db.query.recipe.findFirst({
      where: (model, { eq }) => eq(model.id, id),
    });
    if (!recipe) throw new Error(`getRecipe: Recipe [${id}] not found`);
    return recipe;
  }

  async getRecipes() {
    const recipes = await db.query.recipe.findMany({
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
    return recipes;
  }

  async getUserRecipes(userId: string) {
    const recipes = await db.query.recipe.findMany({
      where: (model, { eq }) => eq(model.userId, userId),
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
    return recipes;
  }

  async addImageToRecipe(
    recipeId: number,
    fileKey: string,
    fileUrl: string,
    userId: string,
  ) {
    try {
      // const _ = await this.getRecipe(recipeId);
      // could check recipe id existence
      const newFileId = await db
        .insert(image)
        .values({
          key: fileKey,
          url: fileUrl,
          userId: userId,
          recipeId: recipeId,
        })
        .returning({ id: image.id });
      if (!newFileId[0])
        throw new Error(
          `addImageToRecipe: File [${fileKey}] not inserted into DB.`,
        );
    } catch (error) {
      throw error;
    }
  }
}
