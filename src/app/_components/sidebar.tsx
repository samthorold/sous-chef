import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Sidebar() {
  return (
    <SignedIn>
      <div className="flex min-h-full min-h-screen w-72 flex-col bg-gray-100">
        <div className="p-4 text-lg font-semibold">
          <Link href="create-recipe">Create Recipe</Link>
        </div>
      </div>
    </SignedIn>
  );
}
