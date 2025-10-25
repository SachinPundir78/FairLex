import { AllArticlesPage } from "@/src/components/articles/all-articles-page";
import { fetchArticleByQuery } from "@/src/lib/query/fetch-article";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const ITEMS_PER_PAGE = 7;

export async function ArticlesContent({
  searchText,
  currentPage,
}: {
  searchText: string;
  currentPage: number;
}) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  // 🧠 Fetch articles here — this is async
  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      {/* ✅ Render articles */}
      <AllArticlesPage articles={articles} />

      {/* ✅ Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        {/* Prev */}
        <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
          <Button variant="ghost" size="sm" disabled={currentPage === 1}>
            ← Prev
          </Button>
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <Link
            key={index}
            href={`?search=${searchText}&page=${index + 1}`}
            passHref
          >
            <Button
              variant={`${currentPage === index + 1 ? "destructive" : "ghost"}`}
              size="sm"
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          </Link>
        ))}

        {/* Next */}
        <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
          >
            Next →
          </Button>
        </Link>
      </div>
    </>
  );
}
