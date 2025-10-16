
import React, { Suspense } from "react";
import ArticleSearchInput from "@/src/components/articles/article-search-input";
import { AllArticlesPageSkeleton } from "@/src/components/articles/all-articles-skeleton";
import { ArticlesContent } from "@/src/components/articles/articles-content";
import Navbar from "@/src/components/home/header/navbar";

type SearchPageProps = {
  searchParams: { search?: string; page?: string };
};

const page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams; // ✅ Await searchParams

  const searchText = params.search || "";
  const currentPage = Number(params.page) || 1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container lg:fixed mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          <ArticleSearchInput />
        </div>

        {/* ✅ Suspense boundary for loading skeleton */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <ArticlesContent searchText={searchText} currentPage={currentPage} />
        </Suspense>
      </main>
    </div>
  );
};

export default page;
