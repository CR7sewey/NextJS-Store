"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

export default function Comment({ comment }: { comment: string }) {
  const [showMore, setShowMore] = useState(false);
  const shortShowMore = comment.slice(
    0,
    comment.length / 2 >= 100 ? 100 : comment.length
  );
  if (comment.length <= 100) {
    return <p className="text-sm">{shortShowMore}</p>;
  }
  return (
    <>
      {!showMore ? (
        <div>
          <p className="text-sm">{shortShowMore}...</p>
          <Button
            variant="link"
            className="pl-0 text-muted-foreground"
            onClick={() => setShowMore(true)}
          >
            Show More
          </Button>
        </div>
      ) : (
        <div>
          <p className="text-sm">{comment}</p>
          <Button
            variant="link"
            className="pl-0 text-muted-foreground"
            onClick={() => setShowMore(false)}
          >
            Show Less
          </Button>
        </div>
      )}
    </>
  );
}
