import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IArticle } from "@/interfaces";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface AllArticlePageProps {
  articles?: IArticle[];
}

const AllArticlePage: React.FC<AllArticlePageProps> = async () => {
  const articles = await prisma.articles.findMany({
      include: {
        author: true,
      },
    });

  if (articles.length <= 0) {
    return <NoSearchResults />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article) => (
      <Link key={article.id} href={`/articles/${article.id}`}>
        <Card className="group relative overflow-hidden transition-all p-0 hover:shadow-lg">
        <div className="relative w-full aspect-[4/3]">
          <Image
          src={article.featuredImage}
          alt="blog-image"
          fill
          className="object-cover rounded-t-md transition-transform group-hover:scale-105"
          style={{ objectPosition: "center" }}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          />
        </div>
      
          <CardContent >
          <h5 className=" font-semibold ">{article.title}</h5>
          <p className="mt-2 text-sm">{article.category}</p>
          {/* <div className="mt-6 flex items-center justify-between"> */}
           </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
          
            <Avatar>
              <AvatarImage src={article?.author?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-sm">{article?.author?.name}</span>
          
            <div className="text-sm">
            {article?.createdAt?.toDateString()}
            </div>
         
         
        </CardFooter>
        </Card>
      </Link>
      ))}
    </div>
  );
};

export default AllArticlePage;

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8" />
      </div>

      <h1 className="font-bold text-xl ">No result found</h1>
      <p className="mt-2 text-sm">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
};
