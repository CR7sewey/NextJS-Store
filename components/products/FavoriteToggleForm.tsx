"use client";
import React from "react";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";
import { toggleFavoriteAction } from "@/utils/actions";
import { usePathname } from "next/navigation";

type FavoriteToggleFormProps = {
  isFavorite: string | null | undefined;
  productId: string;
};

export default function FavoriteToggleForm({
  isFavorite,
  productId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    isFavorite,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={isFavorite ? true : false} />
    </FormContainer>
  );
}

/*
   <FormContainer action={toggleAction}>
      <input type="hidden" value={productId} name="productId" />
      <input type="hidden" value={isFavorite ?? ""} name="isFavorite" />
      <CardSubmitButton isFavorite={isFavorite ? true : false} />
    </FormContainer>
*/
