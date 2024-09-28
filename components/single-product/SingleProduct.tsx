import { fetchProduct } from "@/utils/actions";
import Image from "next/image";
import React, { Suspense } from "react";
import FavoriteToggleButton from "../products/FavoriteToggleButton";
import format from "@/utils/format";
import BreadCrumbs from "./BreadCrumbs";
import RatingsReviews from "./RatingsReviews";
import AddToCart from "./AddToCart";
import ShareButton from "../products/ShareButton";

export default async function SingleProduct({ id }: { id: string }) {
  return <>Not being used (same as products/[id])</>;
}
