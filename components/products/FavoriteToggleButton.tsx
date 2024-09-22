import React from "react";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton, CardSubmitButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  const user = auth();
  const isFavorite = await fetchFavoriteId({ productId });

  if (!user.userId) {
    return <CardSignInButton />;
  }

  return <FavoriteToggleForm isFavorite={isFavorite} productId={productId} />;
}

export default FavoriteToggleButton;
