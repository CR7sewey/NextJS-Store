import { FaStar } from "react-icons/fa";

async function RatingsReviews({ id }: { id: string }) {
  return (
    <span className="flex gap-1 items-center text-md mt-1 mb-4">
      <FaStar className="w-3 h-3" />
      4.2 (25) reviews
    </span>
  );
}

export default RatingsReviews;
