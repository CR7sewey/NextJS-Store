"use client";

import { useState } from "react";
import FormContainer from "../form/FormContainer";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import { Button } from "../ui/button";
import { addToCartAction, removeCartItemAction } from "@/utils/actions";
import { useFormStatus } from "react-dom";
import SubmitButton from "../form/Buttons";

export default function ThirdColumn({
  amount,
  id,
}: {
  amount: number;
  id: string;
}) {
  const [amt, setAmt] = useState(amount);
  const { pending } = useFormStatus();

  const handleAmountChange = async (value: number) => {
    setAmt(value);
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={amt}
        setAmount={handleAmountChange}
        isLoading={pending}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}
