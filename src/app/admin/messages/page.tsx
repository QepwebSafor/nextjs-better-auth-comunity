
import {getContacts} from "@/actions/contact-action";
import SingleContact from "@/components/SingleContact";
import { Metadata } from "next";
  import { auth } from "@/lib/auth";
  import { headers } from "next/headers";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "contacts List",
};
const AdminPage = async () => {
  const contacts = await getContacts();
  const session = await auth.api.getSession({
        headers: await headers()
    })
 
    if(!session) {
        redirect("/auth/login");
    }
 

  if (session?.user?.role !== "ADMIN") {
    return <div>No eres administrador</div>;
  }

  return (
    <div className="mx-auto max-w-fit">
    <h4> Listado de mensajes</h4>
    <div className="gap-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  ">
    {contacts.map((item) => (item &&
          (<SingleContact key={item.id} data={item} />)
        ))}
    </div>
  </div>
  );
};
export default AdminPage;
