import { Cart } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import format from "@/utils/format";
import FormContainer from "../form/FormContainer";
import SubmitButton from "../form/Buttons";
import { createOrderAction } from "@/utils/actions";

export const CartTotals = ({ cart }: { cart: Cart }) => {
  return (
    <>
      <Card className="p-8 ">
        <CartTotalRow label="Subtotal" amount={cart.cartTotal} />
        <CartTotalRow label="Shipping" amount={cart.shipping} />
        <CartTotalRow label="Tax" amount={cart.tax} />
        <CardTitle className="mt-8">
          <CartTotalRow label="Order Total" amount={cart.orderTotal} lastRow />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place Order" className="w-full mt-8" />
      </FormContainer>
    </>
  );
};

const CartTotalRow = ({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) => {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{format(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
};

export default CartTotals;
