import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { categories } from "@/src/config/categories";
import { Card, CardContent } from "@/src/components/ui/card";
import Navbar from "@/src/components/home/header/navbar";

export default async function CategoriesPage() {
  // Fetch article counts per category
  const articles = await prisma.articles.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
  });

  const categoryCount = articles.reduce((acc, curr) => {
    acc[curr.category.toLowerCase()] = curr._count.id;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen pt-24 pb-12 ">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore by{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Category
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-sans font-medium">
            Discover articles organized by topics that matter to you
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = categoryCount[category.slug] || 0;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    {/* Icon with gradient background */}
                    <div
                      className={`relative p-4 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Category Name */}
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>

                    {/* Article Count */}
                    <div className="pt-2 border-t w-full">
                      <p className="text-sm font-medium text-muted-foreground">
                        {count} {count === 1 ? "article" : "articles"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
