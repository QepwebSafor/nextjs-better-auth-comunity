"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { IContact } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteContact } from "@/actions/contact-action";
import Spinner from "@/components/Spinner";

interface ContactProps {
  data: IContact;
}
function SingleContact({ data }: ContactProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-5  max-w-fit mx-auto md:rounded-2xl p-4 font-bold  py-3 shadow-input bg-sky-400 border border-[#121212]  dark:bg-cyan-950">
      <div className="flex items-center justify-between  gap-4 mt-2 ">
        <h3 className="text-white text-[1.4rem] hover:text-white leading-6   ">
         <span>de: </span> {data.postername}
        </h3>

        {/*      <Button
          onClick={() => router.push(`/admin/contacts/${data.id}`)}
          className=" cursor-pointer text-[1.2rem] text-zinc-900 hover:text-white bg-blue-500"
        >
          {loading ? <Spinner /> : <Pen size={16} />}
        </Button> */}
      </div>

      <p className="m-1 truncate text-sm leading-7 text-zinc-100 ">
       <span>Email:</span>  {data.email}
      </p>
      <p className="m-1 truncate text-sm leading-7 text-zinc-100 ">
       <span>Teléfono: {"  "}</span> 
        {data.phone}
      </p>
      <p className="m-1 truncate text-sm leading-7 text-zinc-100 ">
        {data.message}
      </p>

      <div className="flex items-center gap-2   ">
        <h2 className="text-zinc-100">
         {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm")}
        </h2>

        <Button
          size={"icon"}
          variant={"destructive"}
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await deleteContact({ id: data.id });
              // Optionally, trigger a parent refresh or notification here
            } catch (error) {
              // Optionally, handle error (e.g., show a toast)
              console.error(error);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? <Spinner /> : <Trash size={16} />}
        </Button>
      </div>
    </div>
  );
}

export default SingleContact;
