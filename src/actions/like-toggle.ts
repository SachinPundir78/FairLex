"use server";

import { prisma } from "@/src/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleLike(articleId: string) {
  const { userId } = await auth();

  // Return error instead of throwing
  if (!userId) {
    return { error: "Please sign in to like this article" };
  }

  try {
    // Ensure the user exists in the database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    // If user doesn't exist, create them
    if (!user) {
      const clerkUser = await currentUser();

      if (!clerkUser) {
        return { error: "Failed to fetch user information. Please try again." };
      }

      // Create user in database
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name:
            clerkUser.firstName && clerkUser.lastName
              ? `${clerkUser.firstName} ${clerkUser.lastName}`.trim()
              : clerkUser.username ||
                clerkUser.emailAddresses[0]?.emailAddress ||
                "User",
          imageUrl: clerkUser.imageUrl || null,
        },
      });
    }

    // Check if the user has already liked the article
    const existingLike = await prisma.like.findFirst({
      where: { articleId, userId: user.id },
    });

    if (existingLike) {
      // Unlike the article
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like the article
      await prisma.like.create({
        data: { articleId, userId: user.id },
      });
    }

    // Revalidate the path
    revalidatePath(`/articles/${articleId}`);

    return { success: true };
  } catch (error) {
    console.error("Error toggling like:", error);
    return { error: "Failed to update like. Please try again." };
  }
}
