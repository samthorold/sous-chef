import type { Recipe } from "~/server/repository";

export default function RecipeCard({
  recipe,
  img_src,
}: {
  recipe: Recipe;
  img_src: string;
}) {
  return (
    <div className="card flex flex-col rounded-lg p-4 shadow-lg">
      <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200">
        {/* Placeholder for an image */}
        <img
          src={`${img_src}`}
          alt={`${recipe.name} image`}
          className="h-full w-full object-cover"
          id={recipe.id.toString()}
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
