import { fetchAllProducts } from "@/utils/actions";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import format from "@/utils/format";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function page() {
  const products = await fetchAllProducts();
  return (
    <Table>
      <TableCaption>Total Products: {products.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((prods) => (
          <TableRow key={prods.id}>
            <TableCell className="font-medium capitalize">
              {prods.name}
            </TableCell>
            <TableCell className="capitalize">{prods.company}</TableCell>
            <TableCell>{format(prods.price)}</TableCell>
            <TableCell className="flex items-center gap-x-2">
              <Link href={`/admin/products/${prods.id}/edit`}>
                <Button />
              </Link>
              <Link href={`/admin/products/${prods.id}/delete`}>
                <Button />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
