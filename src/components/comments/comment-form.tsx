"use client";
import React, { useActionState, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComments } from "@/src/actions/create-comments";
import { SignInButton } from "@clerk/nextjs";

type CommentFormProps = {
  articleId: string;
  isLoggedIn: boolean;
};

const CommentForm: React.FC<CommentFormProps> = ({ articleId, isLoggedIn }) => {
  const [formState, action, isPending] = useActionState(
    createComments.bind(null, articleId),
    {
      errors: {},
    }
  );
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent form submission
      setShowSignInPrompt(true);
      return;
    }
    // If logged in, let the form submit normally
  };

  if (showSignInPrompt && !isLoggedIn) {
    return (
      <div className="mb-8 p-6 border rounded-lg bg-muted/50">
        <p className="text-center text-muted-foreground mb-4">
          Sign in to post your comment
        </p>
        <div className="flex justify-center gap-4">
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
          <Button variant="outline" onClick={() => setShowSignInPrompt(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/current-user-avatar.jpg" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input
            placeholder="Add a comment..."
            name="body"
            className="py-6 text-base"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          {formState.errors.body && (
            <p className="text-red-600 text-sm font-medium mt-2">
              {formState.errors.body}
            </p>
          )}
          <div className="mt-4 flex justify-end">
            <Button disabled={isPending} type="submit">
              {isPending ? "Loading..." : "Post Comment"}
            </Button>
          </div>
          {formState.errors.formErrors && (
            <div className="p-2 border border-red-600 bg-red-100 mt-2 rounded">
              {formState.errors.formErrors[0]}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
