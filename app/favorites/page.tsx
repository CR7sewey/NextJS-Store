import SectionTitle from "@/components/global/SectionTitle";
import ProductsContainer from "@/components/products/ProductsContainer";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchUserFavorites } from "@/utils/actions";
import React from "react";

async function Page() {
  const favorites = await fetchUserFavorites();
  const products = favorites.map((favs) => favs.product);
  return (
    <section>
      <SectionTitle text="Favorites" />
      {favorites.length === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : (
        <ProductsGrid products={products} />
      )}
    </section>
  );
}

export default Page;
