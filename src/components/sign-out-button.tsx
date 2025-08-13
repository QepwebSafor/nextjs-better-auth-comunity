"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
      onRequest: () => {
        setIsPending(true);
      },
      onResponse: () => {
        setIsPending(false);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: async () => {
        toast.success("You’ve logged out. See you soon!");
        setIsPending(false);
        // Clear the session data
     
        // Optionally, you can also clear any local storage or cookies if needed
        // For example:
         localStorage.removeItem("userSession");
         document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       
    
        // Redirect to home page after successful sign out
        router.push("/");
        router.refresh();
      },
      },
    });
  }

  return (
    <Button
      onClick={handleClick}
      size="sm"
      variant="destructive"
      disabled={isPending}
    >
      Sign out
    </Button>
  );
};