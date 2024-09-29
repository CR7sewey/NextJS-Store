import React from "react";
import Rating from "./Rating";
import Comment from "./Comment";
import SectionTitle from "../global/SectionTitle";
import { fetchProductReviews } from "@/utils/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews({ id: productId });
  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((values) => {
          const { comment, rating, authorImageUrl, authorName } = values;
          const obj = {
            comment,
            rating,
            authorName,
            authorImageUrl,
          };
          return <ReviewCard key={values.id} {...obj} />;
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
