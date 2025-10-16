
import Sidebar from "@/src/components/dashboard/sidebar";
import Navbar from "@/src/components/dashboard/header/navbar";
import React, { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";

const layout = async ({ children }: { children: ReactNode }) => {
  // 🔒 Protect dashboard - redirect to sign-in if not authenticated
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  // 💾 Sync user to database
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (!loggedInUser) {
      await prisma.user.create({
        data: {
          name: user.fullName || "User",
          clerkUserId: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
          imageUrl: user.imageUrl || "",
        },
      });
    }
  } catch (error) {
    console.error("Error syncing user to database:", error);
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* 🧭 Navbar always on top */}
      <Navbar />

      {/* 🧱 Two-column layout */}
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 bg-background overflow-y-auto pt-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
