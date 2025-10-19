import React, { Suspense } from "react";
import Navbar from "@/src/components/home/header/navbar";
import { getCategoryBySlug } from "@/src/config/categories";
import CategoryArticles from "@/src/components/categories/category-articles";
import { CategoryArticlesSkeleton } from "@/src/components/categories/category-articles-skeleton";

type CategoryPageProps = {
  params: { slug: string };
};

// ✅ Main category page
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const resolvedParams = await params; // ✅ Await params (Next.js 15 requirement)
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Category not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl ">
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              {category.name}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* ✅ Suspense Boundary for Loading State */}
        <Suspense fallback={<CategoryArticlesSkeleton />}>
          <CategoryArticles slug={resolvedParams.slug} />
        </Suspense>
      </main>
    </div>
  );
};

export default CategoryPage;
