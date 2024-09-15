import Link from "next/link";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export const dynamic = "force-dynamic";

type Recipe = {
  id: string;
  lifetimeId: string;
  parentId: string;
  name: string;
  createdAt: Date;
  vectorId: string;
};

const mockRecipes: Recipe[] = [
  {
    id: "1",
    lifetimeId: "1",
    parentId: "1",
    name: "Tiramisu",
    createdAt: new Date(),
    vectorId: "1",
  },
  {
    id: "2",
    lifetimeId: "2",
    parentId: "2",
    name: "Linguine de fruiti de mare",
    createdAt: new Date(),
    vectorId: "2",
  },
];

// React component for a recipe card
function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="card flex flex-col rounded-lg p-4 shadow-lg">
      <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200">
        {/* Placeholder for an image */}
        <img
          src="https://via.placeholder.com/75"
          alt={`${recipe.name} image`}
          className="h-full w-full object-cover"
          id={recipe.id}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
        <p className="text-gray-500">
          Created at: {recipe.createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

// React component for a list of recipe cards
function RecipeList({ recipes }: { recipes: Recipe[] }) {
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

export default async function HomePage() {
  const recipes = await db.query.posts.findMany();
  console.log(recipes);
  return (
    <main className="p-4">
      <div className="flex flex-wrap">
        <RecipeList
          recipes={[
            ...mockRecipes,
            //...mockRecipes,
            //...mockRecipes,
            //...mockRecipes,
          ]}
        />
      </div>
    </main>
  );
}
