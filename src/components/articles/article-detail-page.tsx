import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import LikeButton from "./actions/like-button";
import { auth } from "@clerk/nextjs/server";
import { MessageCircle, ArrowLeft } from "lucide-react";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import Navbar from "./header/navbar";
import Link from "next/link";

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
  // Strip HTML tags
  const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");

  // Count words (split by whitespace)
  const wordCount = plainText.trim().split(/\s+/).length;

  // Average reading speed: 200-250 words per minute
  // Using 225 as middle ground
  const wordsPerMinute = 225;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 minute
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
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId as string },
  });

  const isLiked = likes.some((like) => like.userId === user?.id);

  // Calculate reading time
  const readingTime = calculateReadingTime(article.content);

  return (
    <div className="min-h-screen bg-background">
      {/* Reuse your existing Navbar */}
      <Navbar />

      <main className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-5xl">
          {/* Back to Blogs Button */}
          <div className="mb-4 mt-6">
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
          <header className="mb-8 mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {readingTime} min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

          {/* Comments Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>

            {/* Comment Form */}
            <CommentForm articleId={article.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
