import SectionTitle from "@/components/global/SectionTitle";
import DeleteReview from "@/components/reviews/DeleteReview";
import ReviewCard from "@/components/reviews/ReviewCard";
import { fetchProductReviewsByUser } from "@/utils/actions";
import React from "react";

async function Page() {
  const reviewsUser = await fetchProductReviewsByUser();

  if (reviewsUser.length === 0)
    return <SectionTitle text="you have no reviews yet" />;

  return (
    <section>
      <SectionTitle text="Your Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviewsUser.map((ratings) => {
          const {
            id,
            rating,
            comment,
            product: { image, name },
          } = ratings;
          const obj = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard {...obj} key={id}>
              <DeleteReview reviewId={id} />
            </ReviewCard>
          );
        })}
      </div>
    </section>
  );
}

export default Page;
