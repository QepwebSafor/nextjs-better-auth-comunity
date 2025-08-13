import type { Prisma } from "@/generated/prisma";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import LikeButton from "./like-button";
import CommentList from "../comments/comment-list";
import CommentInput from "../comments/comment-input";
import { prisma } from "@/lib/prisma";
 import { auth } from "@/lib/auth";
  import { headers } from "next/headers";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          image: true;
        };
      };
    };
  }>;
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({
  article,
}) => {
  const comments = await prisma.comment.findMany({
    where: { articleId: article.id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });


   
     const session = await auth.api.getSession({
    headers:await headers(),
  });
   
  
 
   const userId = session?.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId as string },
  });

  const isLiked: boolean = likes.some((like) => like.userId === user?.id);

  return (
    <div className="min-h-screen bg-backgorund">
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-12 ">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-sm">web-developmnet</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">
              How to learn web developement in 2025
            </h1>

            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article?.author?.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <p className="text-xs">{article?.author?.name || null}</p>
                <p className="text-sm">
                   {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>

          <section
            className="mb-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Action url */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

          <CommentInput articleId={article.id} />

          {/* Comment Section */}
          <CommentList comments={comments} />
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
