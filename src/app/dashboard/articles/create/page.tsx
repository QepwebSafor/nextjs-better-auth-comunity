import CreateArticlesPage from "@/components/articles/create-articles-page";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <CreateArticlesPage />
    </div>
  );
};

export default page;
