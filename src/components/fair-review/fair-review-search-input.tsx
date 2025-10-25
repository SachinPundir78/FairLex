"use client";

import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function FairReviewSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchValue(value);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
        params.set("page", "1"); // Reset to page 1 on new search
      } else {
        params.delete("search");
        params.set("page", "1");
      }
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
      <Input
        type="text"
        placeholder="Search reviews by title..."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-12 h-12 text-base bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-yellow-500 dark:focus:border-yellow-500 relative z-0"
        disabled={isPending}
      />
      {isPending && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
