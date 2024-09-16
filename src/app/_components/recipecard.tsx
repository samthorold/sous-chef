import Image from "next/image";
import type { Recipe } from "~/server/repository";

export default function RecipeCard({
  recipe,
  img_src,
}: {
  recipe: Recipe;
  img_src: string;
}) {
  return (
    <div className="flex h-48 w-48 flex-col">
      <Image
        src={`${img_src}`}
        alt={`${recipe.name} image`}
        style={{ objectFit: "contain" }}
        width={480}
        height={480}
      />
      <div className="flex flex-1 flex-col justify-between">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
        <p className="text-gray-500">
          Created: {recipe.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
