import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default async function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, ele) => {
    return ele + 1 <= rating;
  }); // ex: rating 4 => [true, true, true, false, false]

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((value, i) => {
        if (value) {
          return <FaStar className="w-3 h-3 text-primary" key={i} />;
        }
        return <FaRegStar className="w-3 h-3 text-gray-400" key={i} />;
      })}
    </div>
  );
}
