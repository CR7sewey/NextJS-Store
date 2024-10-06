"use client";
import React from "react";
import ProductsList from "../products/ProductsList";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import format from "@/utils/format";
import AddToCartForm from "../single-product/AddToCartForm";
import { Mode } from "../single-product/SelectProductAmount";
import { CartItem, Product } from "@prisma/client";
import { CartItemWithProduct } from "@/utils/types";
import { FirstColumn, FourthColumn, SecondColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";

export const CartItemsList = async ({
  cartItems,
}: {
  cartItems: CartItemWithProduct[];
}) => {
  /*
  const products = cartItems.map((vals) => {
    return vals.product;
  });
  const amounts = cartItems.map((vals) => {
    return vals.amount;
  });
  const ids = cartItems.map((vals) => {
    return vals.id;
  });*/

  return (
    <div className="mt-12 grid gap-y-8">
      {cartItems.map((cartItem, index) => {
        const { id, amount } = cartItem;
        const { id: productId, image, name, company, price } = cartItem.product;
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn amount={amount} id={id} />
            <FourthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
};
