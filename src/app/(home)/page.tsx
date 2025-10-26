import Navbar from "@/src/components/home/header/navbar";
import TopArticles from "@/src/components/home/top-articles";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import BlogFooter from "@/src/components/home/blog-footer";
import React, { Suspense } from "react";
import { AllArticlesPageSkeleton } from "@/src/components/articles/all-articles-skeleton";
import FeaturedSection from "@/src/components/home/featured-section";
import LatestStoriesSection from "@/src/components/home/latest-blog";
import { prisma } from "@/src/lib/prisma";


// ✨ Enable ISR - Revalidate every 60 seconds
export const revalidate = 60;

// Fetch the latest article from database
async function getLatestArticle() {
  try {
    const latestArticle = await prisma.articles.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!latestArticle) return null;

    return {
      id: latestArticle.id,
      title: latestArticle.title,
      excerpt: latestArticle.content,
      content: latestArticle.content,
      author: latestArticle.author.name || "Anonymous",
      date: latestArticle.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: `${Math.ceil(latestArticle.content.length / 1000)} min read`,
      category: latestArticle.category,
      image: latestArticle.featuredImage || undefined,
      slug: latestArticle.id,
    };
  } catch (error) {
    console.error("Error fetching latest article:", error);
    return null;
  }
}

// Fetch all articles for Latest Stories Section
async function getAllArticles() {
  try {
    const articles = await prisma.articles.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.content,
      content: article.content,
      author: article.author.name || "Anonymous",
      date: article.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: `${Math.ceil(article.content.length / 1000)} min read`,
      category: article.category,
      image: article.featuredImage || undefined,
      slug: article.id,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function Home() {
  const latestPost = await getLatestArticle();
  const allPosts = await getAllArticles();

  return (
    <div className="relative overflow-hidden">
      {/* 🌟 Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode Glow */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
              radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
            `,
          }}
        />
      </div>

      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🌠 Featured Section */}
      {latestPost && (
        <Suspense fallback={<FeaturedSectionSkeleton />}>
          <FeaturedSection latestPost={latestPost} />
        </Suspense>
      )}

      {/* 📰 Latest Stories Section */}
      {allPosts.length > 0 && (
        <Suspense fallback={<LatestStoriesSkeleton />}>
          <LatestStoriesSection
            posts={allPosts}
            initialLoadCount={7}
            loadMoreCount={7}
          />
        </Suspense>
      )}

      {/* 🌟 Featured Articles Section */}
      <section className="relative py-10 md:py-16 mb-1 z-10">
        <div className="container mx-auto md:px-8 px-2">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most popular and trending content
            </p>
          </div>

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

      {/* 🦶 Footer */}
      <BlogFooter />
    </div>
  );
}

// 🧱 Loading Skeleton for Featured Section
function FeaturedSectionSkeleton() {
  return (
    <section className="w-full py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-muted rounded-full animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 w-96 bg-muted rounded animate-pulse" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative h-64 lg:h-full min-h-[400px] bg-muted animate-pulse" />
            <div className="p-8 lg:p-12 space-y-6">
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-muted rounded-full animate-pulse" />
                <div className="h-8 w-32 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="h-12 w-full bg-muted rounded animate-pulse" />
                <div className="h-12 w-3/4 bg-muted rounded animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-full bg-muted rounded animate-pulse" />
                <div className="h-6 w-5/6 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex gap-6 pt-6 border-t">
                <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-40 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🧱 Loading Skeleton for Latest Stories Section
function LatestStoriesSkeleton() {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-muted rounded-full animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 w-64 bg-muted rounded animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-28 h-28 bg-muted rounded-lg animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-full bg-muted rounded animate-pulse" />
                    <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
