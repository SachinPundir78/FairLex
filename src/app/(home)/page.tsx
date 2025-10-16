import Navbar from "@/src/components/home/header/navbar";
import HeroSection from "@/src/components/home/hero-section";
import TopArticles from "@/src/components/home/top-articles";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import BlogFooter from "@/src/components/home/blog-footer";
import React, { Suspense } from "react";
import { AllArticlesPageSkeleton } from "@/src/components/articles/all-articles-skeleton";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <section className="relative py-10 md:py:16 mb:10">
        <div className="container mx-auto md:px-8 px-2">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Articles
            </h2>
            <p className="text-lg">
              Discover our most popular and trending content
            </p>
          </div>

          {/* Top Articles */}
          <Suspense fallback={<AllArticlesPageSkeleton />}>
            <TopArticles />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link href={"/articles"}>
              <Button className="rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <BlogFooter />
    </div>
  );
}
