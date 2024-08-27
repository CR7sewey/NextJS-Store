import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import format from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((prods) => {
        return (
          <article key={prods.id} className="group relative">
            <Link href={`products/${prods.id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden ">
                    <Image
                      src={prods.image}
                      alt={prods.name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg  capitalize">{prods.name}</h2>
                    <p className="text-muted-foreground  mt-2">
                      {format(prods.price)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton productId={prods.id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
