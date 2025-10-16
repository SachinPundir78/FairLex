import { Card } from "@/src/components/ui/card";
import { Prisma } from "@prisma/client";
import { prisma } from "@/src/lib/prisma";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import LikeButton from "./actions/like-button";
import { auth } from "@clerk/nextjs/server";
import { MessageCircle } from "lucide-react";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import Navbar from "./header/navbar";

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
  return (
    <div className="min-h-screen bg-background">
      {/* Reuse your existing Navbar */}
      <Navbar />

      <main className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Article Header */}
          <header className="mb-10">
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
                  {article.createdAt.toDateString()} · {12} min read
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
