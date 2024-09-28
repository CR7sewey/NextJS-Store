import React from "react";
import FormContainer from "../form/FormContainer";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RatingInputType = {
  name: string;
  label?: string;
};

export default function RatingInput({
  name,
  label = "Rating",
}: RatingInputType) {
  const numbersRating = Array.from({ length: 5 }, (_, element) => {
    return (
      <SelectItem value={String(element + 1)} key={element + 1}>
        {element + 1}
      </SelectItem>
    );
  }).reverse();

  console.log(numbersRating[0], "isto");

  return (
    <div className="mb-2 max-w-xs">
      <Label className="capitalize">{label ? label : name}</Label>
      <Select defaultValue={numbersRating[0].props.value} name={name} required>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ratings</SelectLabel>
            {numbersRating.map((elements) => {
              return elements;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
