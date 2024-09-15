import { db } from "~/server/db";
import RecipeList from "./_components/recipelist";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <div className="p-4">
          <div className="flex flex-wrap">
            <RecipeList />
          </div>
        </div>
      </SignedIn>
    </main>
  );
}
