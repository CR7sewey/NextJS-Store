"use client";

import { useState } from "react";
import FormContainer from "../form/FormContainer";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import { Button } from "../ui/button";
import {
  addToCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from "@/utils/actions";
import { useFormStatus } from "react-dom";
import SubmitButton from "../form/Buttons";
import { useToast } from "../ui/use-toast";

export default function ThirdColumn({
  amount,
  id,
}: {
  amount: number;
  id: string;
}) {
  const [amt, setAmt] = useState(amount);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    setAmt(value);
    toast({ description: "Calculating..." });
    const result = await updateCartItemAction({ amount: value, cartId: id });
    setIsLoading(false);
    toast({ description: result.message });
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={amt}
        setAmount={handleAmountChange}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}
