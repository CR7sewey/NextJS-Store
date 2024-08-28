import { Product } from "@prisma/client";
import React from "react";
import FavoriteToggleButton from "./FavoriteToggleButton";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import format from "@/utils/format";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((prods) => {
        return (
          <article key={prods.id} className="group relative">
            <Link href={`products/${prods.id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64  md:h-48 md:w-48">
                    <Image
                      src={prods.image}
                      alt={prods.name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold   capitalize">
                      {prods.name}
                    </h2>
                    <h4 className="text-muted-foreground">{prods.company}</h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {format(prods.price)}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-7 right-7 z-5">
              <FavoriteToggleButton productId={prods.id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
