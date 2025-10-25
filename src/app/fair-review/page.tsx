import React, { Suspense } from "react";
import FairReviewSearchInput from "@/src/components/fair-review/fair-review-search-input";
import { FairReviewSkeleton } from "@/src/components/fair-review/fair-review-skeleton";
import { FairReviewContent } from "@/src/components/fair-review/fair-review-content";
import Navbar from "@/src/components/home/header/navbar";


type SearchPageProps = {
  searchParams: { search?: string; page?: string };
};

const FairReviewPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;

  const searchText = params.search || "";
  const currentPage = Number(params.page) || 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow for Light Mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
           radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
           radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
         `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <Navbar />

      <main className="relative mx-auto px-8 sm:px-6 lg:px-20 py-20 z-10">
        {/* Header */}
        <div className="mb-8 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-serif mb-3">
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Fair
            </span>
            <span className="text-foreground">Review</span>
          </h1>
          <p className="text-muted-foreground text-lg font-sans max-w-2xl mx-auto">
            Expert reviews and critical analysis of legal developments, landmark
            cases, and policy decisions
          </p>

          {/* Search Input */}
          <FairReviewSearchInput />
        </div>

        {/* Suspense boundary for loading skeleton */}
        <Suspense fallback={<FairReviewSkeleton />}>
          <FairReviewContent
            searchText={searchText}
            currentPage={currentPage}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default FairReviewPage;
