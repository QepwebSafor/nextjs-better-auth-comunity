import Link from "next/link";
import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { UserRound, UserRoundPlus, MessageCircle } from "lucide-react";
import UserButton from "./UserButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IUser } from "@/interfaces";
const Navbar = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });
  const user = session?.user
    ? ({
        ...session.user,
        emailVerified: session.user.emailVerified
          ? sessionStorage.user.createdAt().emailVerified
          : null,
      } as IUser)
    : null;

  return (
    <div className="flex w-full items-center justify-between">
      {/* Left Section - Logo & Desktop Navigation */}
      <div className="flex items-center w-1/2 justify-between">
        <Image
          src="/img/logofondo.png"
          alt="Esoma"
          width={44}
          height={44}
          className="navbar-brand w-auto mr-2 h-12 "
        />
        <Link href="/" className="flex items-center mr-auto space-x-2">
          <span className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-sky-500 to-cyan-700 dark:from-sky-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Comunidad   {"   "}
            </span>
            <span className="text-foreground">QEPDEV</span>
          </span>
        </Link>
      </div>
      {/* Desktop Navigation */}
      <div className="flex w-full items-center justify-end px-4 py-2">

        <div className="flex mt-5  ml-auto ">
          {user ? <UserButton user={user}  /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
function SignInButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex-none  cursor-pointer  rounded-full ">
          <Image
            src={avatarPlaceholder}
            alt="User profile picture"
            width={44}
            height={44}
            className="aspect-square rounded-full  object-cover "
            draggable={false}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-cyan-950 text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/auth/login">
              <UserRound className="mr-2 h-4 w-4" />
              Acceso
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/auth/register">
              <UserRoundPlus className="mr-2 h-4 w-4" />
              Registro
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <MessageCircle className="mr-2 h-4 w-4" />
              Reservas
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
