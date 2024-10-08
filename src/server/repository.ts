import "server-only";

import { db } from "./db";
import { image, recipe } from "./db/schema";

export interface Recipe {
  id: number;
  parentId: number | null;
  userId: string;
  name: string;
  createdAt: Date;
  contentId: string;
  vectorId: string;
}

export interface NewRecipe {
  userId: string;
  name: string;
  description: string;
}

export interface Image {
  id: number;
  userId: string;
  recipeId: number;
  key: string;
  url: string;
}

export interface RecipeWithImages extends Recipe {
  images: Image[];
}

export class RecipeRepository {
  async createRecipe(r: NewRecipe): Promise<Recipe> {
    const newRecipes = await db
      .insert(recipe)
      .values({
        name: r.name,
        userId: r.userId,
        contentId: "1",
        vectorId: "1",
      })
      .returning();
    if (!newRecipes[0])
      throw new Error("createRecipe: Error creating new recipe.");
    const newRecipe = newRecipes[0];
    return {
      id: newRecipe.id,
      parentId: null,
      userId: newRecipe.userId,
      name: newRecipe.name,
      createdAt: newRecipe.createdAt,
      contentId: newRecipe.contentId,
      vectorId: newRecipe.vectorId,
    };
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

  async getRecipesWithImages() {
    const recipes = await db.query.recipe.findMany({
      with: {
        images: { orderBy: (images, { desc }) => [desc(images.createdAt)] },
      },
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
