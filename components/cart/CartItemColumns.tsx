import format from "@/utils/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CartItemColumns = () => {
  return <div>CartItemColumns</div>;
};

export const FirstColumn = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
        priority
        className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
  );
};

export const SecondColumn = ({
  name,
  productId,
  company = "",
}: {
  name: string;
  productId: string;
  company?: string;
}) => {
  return (
    <div className=" sm:w-48">
      <Link href={`/products/${productId}`}>
        <h3 className="capitalize font-medium hover:underline">{name}</h3>
      </Link>
      <h4 className="mt-2 capitalize text-xs">{company}</h4>
    </div>
  );
};

export const FourthColumn = ({ price }: { price: number }) => {
  return <p className="font-medium md:ml-auto">{format(price)}</p>;
};
