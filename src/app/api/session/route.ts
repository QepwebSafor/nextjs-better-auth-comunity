import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { _success } from "zod/v4/core";

export const dynamic = "force-dynamic";

export async function GET() {
  const resolvedHeaders = await headers();
  const session = await auth.api.getSession({ headers: resolvedHeaders });
  if (!session) {
    return new Response(JSON.stringify({ _success }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Puedes retornar la sesión si existe
  return new Response(JSON.stringify({ session }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Nueva función para borrar la sesión
export async function DELETE() {
  const resolvedHeaders = await headers();
  // You need to extract the userId from the session or request
  const session = await auth.api.getSession({ headers: resolvedHeaders });
  
  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ error: "User not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }



  // Opcional: puedes devolver una cabecera para que el cliente sepa que debe refetch
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Session-Invalidated": "true",
    },
  });
}