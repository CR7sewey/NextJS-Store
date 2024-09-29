import React from "react";
import Rating from "./Rating";
import Comment from "./Comment";

export default function ProductReviews({ productId }: { productId: string }) {
  return (
    <div>
      <Comment comment={"aaaaaa aaaaaaaaaaaaaaaaaaa aaaaaattt"} />
      <Rating rating={3} />
    </div>
  );
}
