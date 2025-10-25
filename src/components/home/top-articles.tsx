import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
import { Tag, Calendar } from "lucide-react";

const TopArticles = async () => {
  const articles = await prisma.articles.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="px-5 sm:px-0">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className={cn(
              "group relative overflow-hidden transition-all hover:scale-[1.02]",
              "border border-gray-200/50 dark:border-white/10",
              "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg",
            )}
          >
            <Link href={`/articles/${article.id}`}>
              {/* Featured Image */}
              <div className="relative h-58 w-full overflow-hidden">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content Section */}
              <div className="px-4 sm:px-6 py-6">
                {/* Category Badge and Date */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600">
                    <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Author Name - UPDATE: Position as needed */}
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {article.author.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-3">
                  {article.title}
                </h3>

                {/* Description/Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                  {(() => {
                    // Strip HTML tags and limit excerpt
                    const plainContent = article.content.replace(
                      /<\/?[^>]+(>|$)/g,
                      ""
                    );
                    const contentWords = plainContent.split(/\s+/);
                    return contentWords.length > 30
                      ? contentWords.slice(0, 30).join(" ") + "..."
                      : plainContent;
                  })()}
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopArticles;
