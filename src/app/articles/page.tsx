import AllArticlePage from "@/components/articles/all-article-page";
import ArticleSearchInput from "@/components/articles/article-search-input";
import { Button } from "@/components/ui/button";
//import { Card } from "@/components/ui/card";
import { IArticle } from "@/interfaces";
//import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-article-by-query";
import Link from "next/link";
import React, { Suspense } from "react";

type SearchPageProps = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const ITEMS_PER_PAGE = 3;

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams).search || "";
  const currentPage = Number((await searchParams).page) || 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-4 sm:px-6 lg:text-5xl">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h3 className="text-4xl font-bold sm:text-5xl">All Articles</h3>

          {/* Search Bar */}
          <ArticleSearchInput />
        </div>

        {/* All Article card */}
        <Suspense >
          <AllArticlePage articles={articles as IArticle[]} />
        </Suspense>

        {/* pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button disabled={currentPage === 1} variant={"ghost"} size={"sm"}>
              {" "}
              ← Prev
          </Button>
          </Link>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`?search=${searchText}&page=${index + 1}`}
              passHref
            >
              <Button
                variant={`${
                  currentPage === index + 1 ? "destructive" : "ghost"
                }`}
                size={"sm"}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button
              disabled={currentPage === totalPages || totalPages === 0}
              variant={"ghost"}
              size={"sm"}
            >
              {" "}
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default page;


