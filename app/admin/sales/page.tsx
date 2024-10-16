import SectionTitle from "@/components/global/SectionTitle";
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
import { fetchAdminOrders } from "@/utils/actions";
import format, { formatDate } from "@/utils/format";
import React from "react";

async function Page() {
  const userOrders = await fetchAdminOrders();
  console.log(userOrders);
  return (
    <section>
      {userOrders.length === 0 ? (
        <h5 className="text-2xl mt-16">No orders yet...</h5>
      ) : (
        <Table>
          <TableCaption>Total orders : {userOrders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((orders) => (
              <TableRow key={orders.id}>
                <TableCell>{orders.email}</TableCell>
                <TableCell>{orders.products}</TableCell>
                <TableCell>{format(orders.orderTotal)}</TableCell>
                <TableCell>{format(orders.tax)}</TableCell>
                <TableCell>{format(orders.shipping)}</TableCell>
                <TableCell>{formatDate(orders.updatedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}

export default Page;
