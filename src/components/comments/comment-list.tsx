import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Prisma } from "@/generated/prisma";

type CommentListProps = {
  comments: Prisma.CommentGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          image: true;
        };
      };
    };
  }>[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-8 ">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 ">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="mb-2">
              <span>{comment.author.name}</span>
              <span className="text-sm ml-2">
                {comment.createdAt.toDateString()}
              </span>
            </div>

            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
