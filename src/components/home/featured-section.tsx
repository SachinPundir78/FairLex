"use client";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
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

interface FeaturedSectionProps {
  latestPost: BlogPost;
}

const FeaturedSection = ({ latestPost }: FeaturedSectionProps) => {
  const category = getCategoryByName(latestPost.category);
  const IconComponent = category?.icon;

  // Strip HTML tags and limit to ~100 words
  const plainExcerpt = latestPost.excerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const descriptionWords = plainExcerpt.split(/\s+/);
  const truncatedExcerpt =
    descriptionWords.length > 100
      ? descriptionWords.slice(0, 50).join(" ") + "..."
      : plainExcerpt;


  return (
    <section className="w-full py-12 lg:py-14 relative overflow-hidden mt-10">
      {/* Light Mode Glow */}
      {/* <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
              radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
            `,
          }}
        />
      </div> */}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-4 lg:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Featured Article
            </h2>
          </div>
          <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
            Latest Insights from{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              FairLex
            </span>
          </h3>
        </div>

        {/* Featured Post Card */}
        <Link href={`/articles/${latestPost.id}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-amber-400/10 border border-border hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

            {/* Content Grid 1/3 - 2/3 */}
            <div className="relative grid lg:grid-cols-[1fr_2fr] gap-4">
              {/* Image Section */}
              {latestPost.image && (
                <div className="relative h-56 lg:h-full min-h-[350px] overflow-hidden">
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 " />
                </div>
              )}

              {/* Content Section */}
              <div
                className={`p-6 lg:px-4 lg:py-0 flex flex-col justify-center ${
                  !latestPost.image ? "lg:col-span-2" : ""
                }`}
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2 mt-2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-400 text-white border-0 px-4 py-1.5 text-sm font-semibold">
                    ✨ Featured
                  </Badge>

                  {category && IconComponent && (
                    <Badge
                      variant="outline"
                      className={`${category.color} border-current/20 bg-background/50 backdrop-blur-sm px-3 py-1.5`}
                    >
                      <IconComponent className="w-3.5 h-3.5 mr-1.5" />
                      {latestPost.category}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                  {latestPost.title}
                </h2>

                {/* 100-word Excerpt */}
                <p className="text-md text-muted-foreground mb-4 max-w-5xl leading-relaxed">
                  {truncatedExcerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4 pb-4 border-b border-border/50">
                  <div>
                    <span className="font-semibold text-foreground">
                      {latestPost.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>{latestPost.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{latestPost.readTime}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-amber-500 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span className="text-base">Read Full Article</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl -z-10" />
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              currentColor 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default FeaturedSection;
