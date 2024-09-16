import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function CreateRecipePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignedOut>Please sign in.</SignedOut>
      <SignedIn>
        <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Create Recipe</h2>
          <form action="/api/create-recipe" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </form>
        </div>
      </SignedIn>
    </main>
  );
}
