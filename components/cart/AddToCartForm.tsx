"use client";
import React, { useState } from "react";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";

import { addToCartAction } from "@/utils/actions";
import SelectProductAmount, { Mode } from "./SelectProductAmount";

export default function AddToCartForm({ productId }: { productId: string }) {
  //const addToCartAct = addToCartAction.bind(null, { id: productId });

  const [amount, setAmount] = useState(1);

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      <FormContainer action={addToCartAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="amount" value={amount} />

        <Button className="capitalize mt-8" size="lg">
          add to cart
        </Button>
      </FormContainer>
    </div>
  );
}
