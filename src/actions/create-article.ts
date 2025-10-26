"use server";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const createArticle = async (
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {
  // Parse inputs safely as strings
  const title = formData.get("title")?.toString() ?? "";
  const category = formData.get("category")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const featuredImage = formData.get("featuredImage")?.toString();

  const result = createArticleSchema.safeParse({
    title,
    category,
    content,
    featuredImage,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  // ✅ Fix: Get Clerk User ID and check authentication
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  // ✅ Fix: Find the actual user using `clerkUserId` and get their `id`
  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) {
    return {
      errors: {
        formErrors: [
          "User not found. Please register before creating an article.",
        ],
      },
    };
  }

  //Start Create Article Logic Here

  // ✅ Fix: Handle image upload properly
  const imageFile = formData.get("featuredImage") as File | null;

  if (!imageFile || imageFile?.name === "undefined") {
    return {
      errors: {
        featuredImage: ["Image file is required."],
      },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // ✅ Fix: Ensure correct file type handling
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    }
  );

  const imageUrl = uploadResult?.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again."],
      },
    };
  }
  try {
    // ✅ Fix: Use `existingUser.id` instead of `userId` (which is `clerkUserId`)
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id, // ✅ Correct Foreign Key Usage
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
        },
      };
    }
  }

  revalidatePath("/"); // Homepage
  revalidatePath("/articles"); // Articles page
  revalidatePath("/dashboard"); // Dashboard

  redirect("/dashboard");
};
