import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";

type CheckBoxInputProps = {
  name: string;
  label?: string;
  defaultChecked?: boolean;
};

function CheckBoxInput({
  name,
  label,
  defaultChecked = false,
}: CheckBoxInputProps) {
  return (
    <div className="flex items-center space-x-2'">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <Label
        htmlFor={name}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
      >
        {label ? label : name}
      </Label>
    </div>
  );
}

export default CheckBoxInput;
