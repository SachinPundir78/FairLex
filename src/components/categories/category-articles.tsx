import { prisma } from "@/src/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Search } from "lucide-react";

type CategoryArticlesProps = {
  slug: string;
};

// ✅ Category Articles Component
export default async function CategoryArticles({
  slug,
}: CategoryArticlesProps) {
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  const articles = await prisma.articles.findMany({
    where: { category: categoryName },
    orderBy: { createdAt: "desc" },
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

  if (articles.length === 0) return <NoCategoryResults />;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.id}`}
          className="group"
        >
          <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6">
              {/* Image */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Article Title */}
              <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                {article.title}
              </h3>

              {/* Category */}
              <p className="mt-2 text-sm text-muted-foreground">
                {article.category}
              </p>

              {/* Author & Date */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl ?? ""} />
                    <AvatarFallback>
                      {article.author.name?.[0] ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {article.author.name}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toDateString()}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// ✅ Empty state if no category articles
function NoCategoryResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        No Articles Found
      </h3>
      <p className="mt-2 text-muted-foreground">
        There are no articles in this category yet. Check back later!
      </p>
    </div>
  );
}
