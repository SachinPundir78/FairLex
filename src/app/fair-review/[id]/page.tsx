import { prisma } from "@/src/lib/prisma";
import ArticleDetailPage from "@/src/components/articles/article-detail-page";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

const FairReviewDetail = async ({ params }: Props) => {
  const { id } = await params;

  const review = await prisma.articles.findUnique({
    where: { id, category: "FairReview" },
    include: {
      author: { select: { name: true, email: true, imageUrl: true } },
    },
  });

  if (!review) notFound();

  return <ArticleDetailPage article={review} />;
};

export default FairReviewDetail;
