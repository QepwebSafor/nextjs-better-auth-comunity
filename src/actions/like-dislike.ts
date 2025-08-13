"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const likeDislikeToggle = async (articleId: string) => {

    
     const session = await auth.api.getSession({
    headers:await headers(),
  });
  const userId = session?.user.id

  if (!userId) {
    throw new Error("You must logged in to like an article");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User does not exist in the database");
  }

  const exisitingLike = await prisma.like.findFirst({
    where: {
      articleId,
      userId: user.id,
    },
  });

  if (exisitingLike) {
    //dislike
    await prisma.like.delete({
      where: {
        id: exisitingLike.id,
      },
    });
  } else {
    //like
    await prisma.like.create({
      data: {
        articleId,
        userId: user.id,
      },
    });
  }

  revalidatePath(`/articles/${articleId}`);
};
