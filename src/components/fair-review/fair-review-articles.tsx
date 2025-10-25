"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import { Star, Search, User, Calendar } from "lucide-react";
import Link from "next/link";
import DownloadPDF from "./download-pdf";

type Review = {
  id: string;
  title: string;
  content: string;
  featuredImage?: string;
  rating?: number;
  author: { name: string; imageUrl: string | null };
  createdAt: Date;
  _count?: { likes: number; comments: number };
};

type Props = {
  reviews?: Review[];
};

export function FairReviewArticles({ reviews }: Props) {
  if (!reviews || reviews.length === 0) {
    return <NoFairReviewResults />;
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="relative">
            <Link href={`/fair-review/${review.id}`}>
              <Card className="h-full gap-0 group relative overflow-hidden transition-all hover:scale-[1.02] border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg hover:shadow-xl">
                {/* Featured Image */}
                {review.featuredImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={review.featuredImage}
                      alt={review.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Review Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-lg">
                      <Star className="h-3 w-3" fill="currentColor" />
                      REVIEW
                    </div>
                  </div>
                )}

                <CardContent className="p-4 space-y-3">
                  {/* Title */}
                  <h3 className="text-lg font-bold line-clamp-2 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                    {review.title}
                  </h3>

                  {/* Meta Information */}
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span className="font-medium">{review.author.name}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {review.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </p>

                  {/* Rating */}
                  {review.rating && (
                    <div className="flex items-center gap-1 pt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating!
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  {review._count && (
                    <div className="pt-3 border-t flex justify-between items-center text-xs text-muted-foreground">
                      <span>{review._count.likes} Likes</span>
                      <span>{review._count.comments} Comments</span>
                    </div>
                  )}

                  {/* Download Button */}
                  <div className="pt-3">
                    <DownloadPDF review={review} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoFairReviewResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        No Reviews Found
      </h3>
      <p className="mt-2 text-muted-foreground">
        There are no Fair Reviews available yet. Check back later!
      </p>
    </div>
  );
}
