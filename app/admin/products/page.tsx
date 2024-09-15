import { fetchAdminProducts, fetchAllProducts } from "@/utils/actions";
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
import EmptyList from "@/components/global/EmptyList";
import { IconButton } from "@/components/products/IconButton";
import DeleteProduct from "@/components/products/DeleteProduct";

async function page() {
  const products = await fetchAdminProducts();

  if (products.length === 0) {
    return <EmptyList />;
  }
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          Total Products: {products.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((prods) => (
            <TableRow key={prods.id}>
              <TableCell>
                <Link
                  href={`/products/${prods.id}`}
                  className="font-medium tracking-wide capitalize hover:text-blue-700"
                >
                  {prods.name}
                </Link>
              </TableCell>
              <TableCell className="capitalize">{prods.company}</TableCell>
              <TableCell>{format(prods.price)}</TableCell>
              <TableCell className="flex items-center gap-x-2">
                <Link href={`/admin/products/${prods.id}/edit`}>
                  <IconButton type="edit" />
                </Link>
                <DeleteProduct productId={prods.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default page;
