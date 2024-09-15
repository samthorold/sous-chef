"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b bg-gray-100 p-4">
      <div className="text-xl font-semibold">Sous Chef</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <div>Create</div>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
