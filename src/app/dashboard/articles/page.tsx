// file: src/app/dashboard/articles/page.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { prisma } from "@/src/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import DeleteButton from "@/src/components/dashboard/delete-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const Page = async () => {
  // 1️⃣ Get current signed-in Clerk user
  const user = await currentUser();

  if (!user) {
    return (
      <Card className="mb-8 py-4">
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>You must be signed in to view your articles.</CardContent>
      </Card>
    );
  }

  // 2️⃣ Find the corresponding Prisma User by clerkUserId
  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) {
    return (
      <Card className="mb-8 py-4">
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>User not found in database.</CardContent>
      </Card>
    );
  }

  // 3️⃣ Fetch all articles created by this Prisma user
  const articles = await prisma.articles.findMany({
    where: { authorId: dbUser.id },
    include: {
      comments: true,
      author: {
        select: { name: true, email: true, imageUrl: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4">
      <Card className="mb-8 py-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Articles</CardTitle>
            <Link href="/dashboard/articles/create">
              <Button size="sm">New Article</Button>
            </Link>
          </div>
        </CardHeader>

        {!articles.length ? (
          <CardContent>No articles found.</CardContent>
        ) : (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      {article.title}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Published
                      </span>
                    </TableCell>
                    <TableCell>{article.comments.length}</TableCell>
                    <TableCell>
                      {new Date(article.createdAt).toDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/articles/${article.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-green-100 text-green-800 hover:bg-green-300 rounded-full p-4"
                          >
                            Edit
                          </Button>
                        </Link>
                        <DeleteButton articleId={article.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default Page;
