import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { Label } from "../ui/label";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;

  const cartItem = mode === Mode.CartItem;

  const amounts = Array.from(
    { length: cartItem ? amount + 10 : 10 },
    (_, element) => {
      return (
        <SelectItem value={(element + 1).toString()} key={element + 1}>
          {element + 1}
        </SelectItem>
      );
    }
  );

  return (
    <>
      <Label className="capitalize mb-2 mt-2">Amount</Label>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
        required
      >
        <SelectTrigger className={cartItem ? "w-[100px]" : "w-[150px]"}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Amount</SelectLabel>
            {amounts.map((elements) => {
              return elements;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
