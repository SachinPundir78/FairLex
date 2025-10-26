import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";
import LikeButton from "./actions/like-button";
import { auth } from "@clerk/nextjs/server";
import { MessageCircle, ArrowLeft } from "lucide-react";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import Navbar from "./header/navbar";
import Link from "next/link";
import Image from "next/image";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

// Calculate reading time based on word count
function calculateReadingTime(content: string): number {
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
  const wordCount = plainText.trim().split(/\s+/).length;
  const wordsPerMinute = 225;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime < 1 ? 1 : readingTime;
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({
  article,
}) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
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

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });

  // Get auth info but don't require it
  const { userId } = await auth();

  // Only fetch user if logged in - with proper typing
  let user: Prisma.UserGetPayload<object> | null = null;
  let isLiked = false;

  if (userId) {
    user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });
    isLiked = likes.some((like) => like.userId === user?.id);
  }

  const readingTime = calculateReadingTime(article.content);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Glow for Light Mode */}
      <div className="absolute inset-0 -z-10">
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

      {/* Navbar */}
      <Navbar />

      <main className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-5xl">
          {/* Back to Blogs Button */}
          <div className="mb-6 mt-6">
            <Link href="/articles">
              <Button
                variant="default"
                className="group hover:bg-gray-500 transition-all rounded-md"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                {article.category}
              </span>
            </div>

            <h2 className="text-4xl md:text-4xl font-bold font-serif tracking-tight text-foreground mb-6">
              {article.title}
            </h2>

            <div className="flex items-center gap-3 text-muted-foreground mb-6">
              <p className="text-base">
                By{" "}
                <span className="font-semibold text-foreground">
                  {article.author.name}
                </span>{" "}
                |{" "}
                {article.createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {readingTime} min read
              </p>
            </div>
          </header>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-xl overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-5 
            [&_a]:text-blue-600 [&_a]:italic [&_a]:underline 
            dark:[&_a]:text-blue-400 [&_a]:hover:text-blue-800 
            dark:[&_a]:hover:text-blue-300 [&_a]:transition-colors
            [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-4 [&_h1]:text-foreground [&_h1]:tracking-tight [&_h1]:font-serif
            [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-4 [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:font-serif
            [&_h3]:text-3xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-4 [&_h3]:text-foreground [&_h3]:tracking-tight [&_h3]:font-serif"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <div className="mb-12">
            <LikeButton
              articleId={article.id}
              likes={likes}
              isLiked={isLiked}
              isLoggedIn={!!userId}
            />
          </div>

          {/* Comments Section */}
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </h2>
            </div>

            {/* Comment Form */}
            <CommentForm articleId={article.id} isLoggedIn={!!userId} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
