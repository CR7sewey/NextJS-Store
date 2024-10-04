import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Button } from "@/components/ui/button";
import { fetchCartItems } from "@/utils/actions";
import Link from "next/link";
import React from "react";

async function Page() {
  const cartItems = await fetchCartItems();
  console.log("Oi, estou aqui", cartItems);
  return (
    <section>
      <SectionTitle text="shopping cart" />
      {cartItems === 0 ? (
        <>
          <h5 className="text-2xl mt-16">
            Sorry, no products added to your cart...
          </h5>
          <Button
            size="lg"
            variant="outline"
            className="animate-bounce mt-5 bg-blue-200 hover:bg-blue-500"
            asChild
          >
            <Link href="/products">Products</Link>
          </Button>
        </>
      ) : (
        <h1>1</h1>
      )}
    </section>
  );
}

export default Page;
