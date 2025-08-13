"use server";
import { prisma } from "@/lib/prisma";
  import { auth } from "@/lib/auth";
  import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(1),
});

type CreateCommentFormState = {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
};

export const createComment = async (
  articleId: string,
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({
    body: formData.get("body") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

     const headersList = await headers();
    
      const session = await auth.api.getSession({
        headers: headersList,
      });
  const userId = session?.user.id

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before adding comment"],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        body: result.data.body,
        authorId: existingUser.id,
        articleId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Error occured while adding comment"],
        },
      };
    }
  }

  revalidatePath(`/articles/${articleId}`);
  revalidatePath(`/dashboard`);
  return { errors: {} };
};
