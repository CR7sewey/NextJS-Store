import React from "react";
import { Skeleton } from "../ui/skeleton";

function LoadingTable({ rows = 5 }: { rows: number }) {
  const tableRows = Array.from({ length: rows }, (_, index) => {
    return (
      <div className="flex items-center space-x-4" key={index}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  });
  return <>{tableRows}</>;
}

export default LoadingTable;
