import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        defaultValue={defaultValue}
        rows={5}
        name={name}
        required
        className="leading-loose"
      />
    </div>
  );
}

export default TextAreaInput;
