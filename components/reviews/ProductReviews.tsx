import React from "react";
import Rating from "./Rating";
import Comment from "./Comment";
import SectionTitle from "../global/SectionTitle";
import { fetchProductReviews } from "@/utils/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews({ id: productId });
  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((values) => {
          return (
            <Card className="relative" key={values.id}>
              <CardHeader>
                <div className="flex items-center">
                  <Image
                    src={values.authorImageUrl}
                    width={48}
                    height={48}
                    alt={values.authorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-bold capitalize mb-1">
                      {values.authorName}
                    </h3>
                    <Rating rating={values.rating} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Comment comment={values.comment} />
              </CardContent>
              <div className="absolute top-3 right-3"></div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
