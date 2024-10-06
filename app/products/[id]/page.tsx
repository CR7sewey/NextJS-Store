import { fetchProduct, findExistingReview } from "@/utils/actions";
import Image from "next/image";
import React, { Suspense } from "react";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import format from "@/utils/format";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import RatingsReviews from "@/components/single-product/RatingsReviews";
import AddToCart from "@/components/single-product/AddToCart";
import ShareButton from "@/components/products/ShareButton";
import SubmitReview from "@/components/reviews/SubmitReview";
import SectionTitle from "@/components/global/SectionTitle";
import ProductReviews from "@/components/reviews/ProductReviews";
import { auth } from "@clerk/nextjs/server";

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  const product = await fetchProduct({ id: params.id });
  const displayButtonReview =
    userId && !(await findExistingReview({ userId, productId: product.id }));

  console.log(product, "sou eu");
  return (
    <section>
      {/* Links */}
      <BreadCrumbs productName={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Suspense>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
              priority
              className="w-full rounded-md object-cover"
            />
          </Suspense>
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="text-3xl font-bold capitalize">{product.name}</h1>
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton productId={product.id} />
              <ShareButton productId={product.id} name={product.name} />
            </div>
          </div>
          {/* Product Rating */}
          <RatingsReviews id={product.id} />
          <h1 className="text-xl capitalize mt-2">{product.company}</h1>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {format(product.price)}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">
            {product.description}
          </p>
          {/* Add To Cart Button */}
          <AddToCart productId={product.id} />
        </div>
      </div>
      <div className="mt-5">
        <ProductReviews productId={params.id} />
        {displayButtonReview ? <SubmitReview productId={product.id} /> : <></>}
      </div>
    </section>
  );
}
