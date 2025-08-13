"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UpdateUserFormProps {
  name: string;
  image: string; // URL inicial de la imagen (puede estar vacío)
}

export const UpdateUserForm = ({ name: initialName, image: initialImage }: UpdateUserFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [image, setimage] = useState<string>(initialImage || "");
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const nameValue = String(formData.get("name") || "").trim();

    // 1) Si hay un archivo nuevo, súbelo primero a /api/upload
    let finalimage = image; // por defecto, la URL existente
    if (file) {
      try {
        const uploadData = new FormData();
        uploadData.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!res.ok) {
          const errJson = await res.json();
          throw new Error(errJson.error || "Error subiendo la imagen");
        }

        const data = await res.json();
        finalimage = data.url; // esta es la secure_url de Cloudinary
        setimage(finalimage);
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
        return toast.error("Falló la subida de la imagen: " + error);
      }
    }

    // 2) Validación: al menos nombre o imagen debe existir
    if (!nameValue && !finalimage) {
      return toast.error("Por favor introduce un nombre o sube una imagen");
    }

    // 3) Llama a updateUser con el nombre e imagen definitiva
    await updateUser({
      ...(nameValue && { name: nameValue }),
      ...(finalimage && { image: finalimage }),
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Usuario actualizado correctamente");
          router.refresh();
        },
      },
    });
  }

  return (
    <form className="max-w-sm w-full space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" defaultValue={initialName} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="file">Imagen</Label>
        <input
          type="file"
          id="file"
          accept="image/*"
          className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
          onChange={(evt) => {
            setFile(evt.target.files?.[0] || null);
          }}
        />
        {image && (
          <div>
            <p className="mb-1 text-sm font-medium">Imagen actual / preview:</p>
            <Image
              src={image || process.env.NEXT_PUBLIC_DEFAULT_IMAGE || "/default-image.jpg"}
              width={150}
              height={150}
              alt="Uploaded"
              className="rounded-lg border"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Actualizando…" : "Actualizar usuario"}
      </Button>
    </form>
  );
};
