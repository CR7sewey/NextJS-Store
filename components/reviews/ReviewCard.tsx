import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Image from "next/image";
import Comment from "./Comment";

type ReviewCardProps = {
  authorImageUrl: string;
  authorName: string;
  rating: number;
  comment: string;
  children?: React.ReactNode;
};

function ReviewCard({
  authorImageUrl,
  authorName,
  rating,
  comment,
  children,
}: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={authorImageUrl}
            width={48}
            height={48}
            alt={authorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">{authorName}</h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}

export default ReviewCard;
