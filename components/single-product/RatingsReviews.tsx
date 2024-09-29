import { FaStar } from "react-icons/fa";
import { fetchProductRating } from "@/utils/actions";

async function RatingsReviews({ id }: { id: string }) {
  const { rating, numberOf } = await fetchProductRating({ productId: id });
  return (
    <span className="flex gap-1 items-center text-md mt-1 mb-4">
      <FaStar className="w-3 h-3" />
      {!Number.isNaN(rating) ? rating : 0} ({numberOf ?? 0}) reviews
    </span>
  );
}

export default RatingsReviews;
