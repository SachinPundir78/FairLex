"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { getCategoryByName } from "@/src/config/categories";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  slug: string;
}

interface LatestStoriesSectionProps {
  posts: BlogPost[];
  initialLoadCount?: number;
  loadMoreCount?: number;
}

const StoryCard = ({ post }: { post: BlogPost }) => {
  const category = getCategoryByName(post.category);
  const IconComponent = category?.icon;

  // Strip HTML tags and limit excerpt
  const plainExcerpt = post.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const descriptionWords = plainExcerpt.split(/\s+/);
  const truncatedExcerpt =
    descriptionWords.length > 30
      ? descriptionWords.slice(0, 30).join(" ") + "..."
      : plainExcerpt;

  return (
    <Link href={`/articles/${post.id}`} className="group block">
      <div className="rounded-xl overflow-hidden transition-all duration-300 bg-card hover:shadow-xl hover:shadow-amber-500/5 border border-border hover:border-amber-500/30 h-full">
        <div className="flex gap-4 p-5">
          {/* Image */}
          {post.image && (
            <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Category Badge */}
            {category && IconComponent && (
              <Badge
                variant="outline"
                className={`${category.color} border-current/20 bg-background/50 backdrop-blur-sm px-2.5 py-0.5 text-xs w-fit mb-2`}
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>
            )}

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
              {truncatedExcerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto flex-wrap">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </div>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const LatestStoriesSection = ({
  posts,
  initialLoadCount = 7,
  loadMoreCount = 7,
}: LatestStoriesSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  const loadMoreStories = () => {
    setVisibleCount((prev) => Math.min(prev + loadMoreCount, posts.length));
  };

  return (
    <section className="w-full  relative overflow-hidden">
      {/* Light Mode Glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle 100px at 0% 200px, #fef3c7, transparent),
              radial-gradient(circle 100px at 100% 200px, #fef3c7, transparent)
            `,
          }}
        />
      </div>

      {/* Dark Mode Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 dark:block hidden" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl -z-10 dark:block hidden" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Latest Updates
            </h2>
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
            Latest{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h3>
        </div>

        {/* Desktop Grid Layout (2 columns) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-10">
          {visiblePosts.map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>

        {/* Mobile List Layout (1 column) */}
        <div className="md:hidden space-y-4 mb-10">
          {visiblePosts.map((post) => (
            <StoryCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMorePosts && (
          <div className="flex justify-center">
            <button
              onClick={loadMoreStories}
              className="px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30"
            >
              Load More Stories
            </button>
          </div>
        )}

        {/* End Message */}
        {!hasMorePosts && posts.length > initialLoadCount && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            You&apos;ve reached the end of the stories
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestStoriesSection;
