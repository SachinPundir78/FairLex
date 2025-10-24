// src/components/dashboard/DeleteButton.tsx
"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { deleteArticle } from "@/src/actions/delete-article";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <form
      action={() =>
        startTransition(async () => {
          await deleteArticle(articleId);
          router.refresh(); // Refresh page after deletion
        })
      }
    >
      <Button
        disabled={isPending}
        variant="ghost"
        size="sm"
        type="submit"
        className="bg-red-100 text-red-600 hover:bg-red-400 rounded-full"
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
};

export default DeleteButton;
