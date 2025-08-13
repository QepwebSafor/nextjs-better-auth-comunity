"use client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";

export const SignInButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-16">
        <Image
          src="/img/loading.gif"
          alt="Loading"
          width={40}
          height={40}
          className="animate-spin"
        />
      </div>
    );
  }

  const href = session ? "/profile" : "/auth/login";

  return (
    <div className="flex  items-center  ">
      {session && (
        <p className="flex items-center gap-2">
          <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
          />
          Welcome back, {session.user.name}! 👋
        </p>
      )}
      <Link href={href}>
        <Image
          src={session?.user.image || avatarPlaceholder}
          alt="User profile picture"
          width={40}
          height={40}
          className="aspect-square rounded-full  object-cover "
        />
      </Link>
    </div>
  );
};
