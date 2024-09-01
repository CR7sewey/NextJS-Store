import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label ? label : name}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        placeholder={placeholder ? placeholder : ""}
        required
      />
    </div>
  );
}

export default FormInput;
