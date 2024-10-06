import { CartItemsList } from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { Button } from "@/components/ui/button";
import { fetchCartItems, fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const previousCart = await fetchOrCreateCart({ userId });
  const { currentCart, cartItems } = await updateCart(previousCart);
  return (
    <section>
      <SectionTitle text="shopping cart" />
      {cartItems.length === 0 ? (
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
        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CartItemsList cartItems={cartItems} />
          </div>
          <div className="lg:col-span-4 lg:pl-4">
            <CartTotals cart={currentCart} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Page;
