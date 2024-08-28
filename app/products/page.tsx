import ProductsContainer from "@/components/products/ProductsContainer";
import React from "react";

async function Page({
  searchParams,
}: {
  searchParams?: { layout?: string; search?: string };
}) {
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";
  console.log(searchParams?.layout);
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}

export default Page;
