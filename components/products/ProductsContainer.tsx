import React from "react";
import SectionTitle from "../global/SectionTitle";
import { Product } from "@prisma/client";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { fetchAllProducts } from "@/utils/actions";
import { Separator } from "@/components/ui/separator";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "../ui/button";
import Link from "next/link";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts(search);
  const searchProduct = search === "" ? search : `&search=${search}`;
  return (
    <section>
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-lg">
          {products.length} product{products.length > 1 && "s"}
        </h4>
        <div className="flex gap-x-4">
          <Button
            variant={layout === "grid" ? "default" : "ghost"}
            size="icon"
            asChild
          >
            <Link href={`/products?layout=grid${searchProduct}`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button
            variant={layout === "list" ? "default" : "ghost"}
            size="icon"
            asChild
          >
            <Link href={`/products?layout=list${searchProduct}`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="mt-4" />
      {products.length === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : layout === "grid" ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products} />
      )}
    </section>
  );
}

export default ProductsContainer;
