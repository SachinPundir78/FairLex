import { FairReviewArticles } from "./fair-review-articles";
import { prisma } from "@/src/lib/prisma";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const ITEMS_PER_PAGE = 8;

type FairReviewContentProps = {
  searchText: string;
  currentPage: number;
};

export async function FairReviewContent({
  searchText,
  currentPage,
}: FairReviewContentProps) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  // Fetch FairReview articles
  const reviews = await prisma.articles.findMany({
    where: {
      category: "FairReview",
      title: { contains: searchText, mode: "insensitive" },
    },
    include: {
      author: { select: { name: true, imageUrl: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  // Total number of FairReview articles
  const total = await prisma.articles.count({
    where: {
      category: "FairReview",
      title: { contains: searchText, mode: "insensitive" },
    },
  });

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <>
      {/* Reviews Grid */}
      <FairReviewArticles reviews={reviews} />

      {/* Pagination - ALWAYS show if there are reviews */}
      {reviews.length > 0 && (
        <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
          {/* Prev button */}
          <Link
            href={`?search=${encodeURIComponent(searchText)}&page=${
              currentPage - 1
            }`}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          >
            <Button
              variant="default"
              size="sm"
              disabled={currentPage === 1}
              className="min-w-[80px]"
            >
              ← Prev
            </Button>
          </Link>

          {/* Page numbers with ellipsis for large page counts */}
          {totalPages <= 7 ? (
            // Show all pages if 7 or fewer
            Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <Link
                  key={pageNum}
                  href={`?search=${encodeURIComponent(
                    searchText
                  )}&page=${pageNum}`}
                  className={
                    currentPage === pageNum ? "pointer-events-none" : ""
                  }
                >
                  <Button
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    disabled={currentPage === pageNum}
                    className="min-w-[40px] bg-red-500 hover:bg-red-600"
                  >
                    {pageNum}
                  </Button>
                </Link>
              );
            })
          ) : (
            // Show smart pagination with ellipsis
            <>
              {/* First page */}
              <Link
                href={`?search=${encodeURIComponent(searchText)}&page=1`}
                className={currentPage === 1 ? "pointer-events-none" : ""}
              >
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  disabled={currentPage === 1}
                  className="min-w-[40px]"
                >
                  1
                </Button>
              </Link>

              {/* Left ellipsis */}
              {currentPage > 3 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}

              {/* Middle pages */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                if (
                  pageNum === currentPage ||
                  pageNum === currentPage - 1 ||
                  pageNum === currentPage + 1
                ) {
                  if (pageNum !== 1 && pageNum !== totalPages) {
                    return (
                      <Link
                        key={pageNum}
                        href={`?search=${encodeURIComponent(
                          searchText
                        )}&page=${pageNum}`}
                        className={
                          currentPage === pageNum ? "pointer-events-none" : ""
                        }
                      >
                        <Button
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          disabled={currentPage === pageNum}
                          className="min-w-[40px]"
                        >
                          {pageNum}
                        </Button>
                      </Link>
                    );
                  }
                }
                return null;
              })}

              {/* Right ellipsis */}
              {currentPage < totalPages - 2 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}

              {/* Last page */}
              {totalPages > 1 && (
                <Link
                  href={`?search=${encodeURIComponent(
                    searchText
                  )}&page=${totalPages}`}
                  className={
                    currentPage === totalPages ? "pointer-events-none" : ""
                  }
                >
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    disabled={currentPage === totalPages}
                    className="min-w-[40px]"
                  >
                    {totalPages}
                  </Button>
                </Link>
              )}
            </>
          )}

          {/* Next button */}
          <Link
            href={`?search=${encodeURIComponent(searchText)}&page=${
              currentPage + 1
            }`}
            className={currentPage === totalPages ? "pointer-events-none" : ""}
          >
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              className="min-w-[80px]"
            >
              Next →
            </Button>
          </Link>
        </div>
      )}

      {/* Show total count */}
      {reviews.length > 0 && (
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing {skip + 1}-{Math.min(skip + ITEMS_PER_PAGE, total)} of {total}{" "}
          reviews
        </div>
      )}
    </>
  );
}
