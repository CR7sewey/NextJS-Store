import React from "react";
import { fetchFeaturedProducts } from "@/utils/actions";
import EmptyList from "../global/EmptyList";
import { Card } from "../ui/card";
import Image from "next/image";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  console.log(products);
  if (products.length === 0) {
    <EmptyList />;
  }
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeaturedProducts;
