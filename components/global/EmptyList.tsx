import { cn } from "@/lib/utils";
import React from "react";

function EmptyList({
  heading = "No Items Found.",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <div>
      <h2 className={cn("text-xl ", className)}>{heading}</h2>
    </div>
  );
}

export default EmptyList;
