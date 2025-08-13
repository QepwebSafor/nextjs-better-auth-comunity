"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getContacts = async () => {
  try {
    return await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
export const createContactAction = async ({
  postername,
  email,
  phone,
  message,
}: {
  postername: string;

  email: string;
  phone: string;
  message: string;
}): Promise<void> => {
  try {
    await prisma.contact.create({
      data: {
        postername,
        email,
        phone,
        message,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteContact = async ({ id }: { id: string }): Promise<void> => {
  await prisma.contact.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
