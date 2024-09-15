import React from "react";
import FormContainer from "../form/FormContainer";
import { deleteProduct } from "@/utils/actions";
import { IconButton } from "./IconButton";

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProd = deleteProduct.bind(null, { id: productId });
  console.log("oi--------------");
  return (
    <FormContainer action={deleteProd}>
      <IconButton type="delete" />
    </FormContainer>
  );
}

export default DeleteProduct;
