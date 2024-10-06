import { ProductSignInButton } from "../form/Buttons";
import { auth } from "@clerk/nextjs/server";
import AddToCartForm from "./AddToCartForm";

function AddToCart({ productId }: { productId: string }) {
  const user = auth();
  if (!user.userId) {
    return <ProductSignInButton />;
  }
  return <AddToCartForm productId={productId} />;
}

export default AddToCart;
