import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { Lock } from "lucide-react";
import { IUser} from "@/interfaces";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { SignOutButton } from "@/components/sign-out-button";

export default function UserButton({ user }: { user:IUser }) {
 
  if (!user) return null;
  return (
    <div className="flex  items-center  ">
      {user && (
      
          <p className="flex items-center gap-2">
            <span
              data-role={user.role}
              className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
            />
            Bienvenida, {user.name}! 👋
          </p>)}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center  cursor-pointer ">
                <Image
                  src={user?.image || avatarPlaceholder}
                  alt="User profile picture"
                  width={44}
                  height={44}
                  priority
                  className="aspect-square rounded-full object-cover"
                />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 ">
              <DropdownMenuLabel>
                {user.name || "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <Lock className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
              <Link href="/posts/show">
                <Settings className="mr-2 h-4 w-4 " />
               Posts publicados 
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/posts/create">
                <Settings className="mr-2 h-4 w-4" />
                Crea Post
              </Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/dashboard/posts">
                <Settings className="mr-2 h-4 w-4" />
               Edita Post
              </Link>
            </DropdownMenuItem> */}
                {(user.role  === "ADMIN")  && (
                  <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">
                      <Lock className="mr-2 h-4 w-4" />
                      Users
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link href="/admin/messages">
                      <Lock className="mr-2 h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>       
    </div>
  );
};
