import {
    DeleteUserButton,
    PlaceholderDeleteUserButton,
  } from "@/components/delete-user-button";
  import { ReturnHomeButton } from "@/components/return-home-button";
  import { UserRoleSelect } from "@/components/user-role-select";
  import { auth } from "@/lib/auth";
  import { headers } from "next/headers";
  import { redirect } from "next/navigation";
  import type { UserRole } from "@/generated/prisma";
import Image from "next/image";
  
  export default async function Page() {
   const headersList = await headers();

     const session = await auth.api.getSession({
        headers: await headers()
    })
 
    if(!session) {
        redirect("/auth/login");
    }
 

  
    if (session.user.role !== "ADMIN") {
      return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
          <div className="space-y-4">
            <ReturnHomeButton />
  
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
  
            <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
              FORBIDDEN
            </p>
          </div>
        </div>
      );
    }
  
    const { users } = await auth.api.listUsers({
      headers: headersList,
      query: {
        sortBy: "name",
      },
    });
  
    const sortedUsers = users.sort((a, b) => {
      if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
      if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
      return 0;
    });
  
    return (
      <div className="px-8 py-6 container mx-auto max-w-screen-lg space-y-6">
        <div className="space-y-2">
          <ReturnHomeButton />
  
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
  
          <p className="p-2 rounded-md text-lg bg-cyan-500 text-zinc-900 font-bold">
            ACCESS GRANTED
          </p>
        </div>
  
        <div className="mb-2 w-full rounded-md  p-4 bg-muted ">
          <table className=" min-w-full rounded-md  md:table ">
          <thead className="rounded-md  text-left text-sm font-normal text-cyan-400">
              <tr >
                <th className="px-4 py-5 font-medium sm:pl-6">ID</th>
                <th className="px-3 py-5 font-medium">Name</th>
                <th className="px-3 py-5 font-medium">Email</th>
                <th className="px-3 py-5 font-medium">Role</th>
                <th className="px-3 py-5 font-medium">Actions</th>
              </tr>
            </thead>
  
            <tbody className="divide-y">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="group">
                  <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                  <td className="whitespace-nowrap  py-5 pl-4 pr-3 text-sm  group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.image || "/img/avatar-300x300.png"}
                            className="rounded-full"
                            alt={`${user.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{user.name}</p>
                        </div>
                      </td>
                
                      <td className="whitespace-nowrap   px-4 py-5 text-sm">{user.email}</td>
                      <td className="whitespace-nowrap   px-4 py-5 text-sm">
                    <UserRoleSelect
                      userId={user.id}
                      role={user.role as UserRole}
                    />
                  </td>
                  <td className="whitespace-nowrap   px-4 py-5 text-sm">
                    {user.role === "USER" ? (
                      <DeleteUserButton userId={user.id} />
                    ) : (
                      <PlaceholderDeleteUserButton />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }