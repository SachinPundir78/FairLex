"use server";
import { prisma } from "@/src/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(1, "Comment cannot be empty"),
});

type CreateCommentFormState = {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
};

export const createComments = async (
  articleId: string,
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> => {
  const result = createCommentSchema.safeParse({
    body: formData.get("body") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  try {
    // Check if user exists in database
    let existingUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    // If user doesn't exist, create them
    if (!existingUser) {
      const clerkUser = await currentUser();

      if (!clerkUser) {
        return {
          errors: {
            formErrors: [
              "Failed to fetch user information. Please try signing in again.",
            ],
          },
        };
      }

      // Create user in database
      existingUser = await prisma.user.create({
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

    // Create the comment
    await prisma.comment.create({
      data: {
        body: result.data.body,
        authorId: existingUser.id,
        articleId: articleId,
      },
    });

    revalidatePath(`/articles/${articleId}`);
    return { errors: {} };
  } catch (error: unknown) {
    console.error("Error creating comment:", error);
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Failed to post comment. Please try again."],
        },
      };
    }
  }
};
