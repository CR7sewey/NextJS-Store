import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import format from "@/utils/format";

type FormInputNumberProps = {
  name?: string;
  label?: string;
  defaultValue?: string;
};

function PriceInput({
  label,
  defaultValue,
  name = "price",
}: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label ? label : name} ($)
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue ? defaultValue : "100"}
        required
      />
    </div>
  );
}

export default PriceInput;
