import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { fetchCartItems } from "@/utils/actions";

async function CartButton() {
  const numItems = await fetchCartItems();

  return (
    <Button
      size="icon"
      variant="outline"
      className="flex justify-center items-center relative"
      asChild
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
          {numItems}
        </span>
      </Link>
    </Button>
  );
}

export default CartButton;
