"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCallback } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function Page({
  searchParams,
}: {
  searchParams: { orderId: string; cartId: string };
}) {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const response = await axios("/api/payment", {
      method: "POST",
      data: {
        orderId: searchParams.orderId,
        cartId: searchParams.cartId,
      },
    });
    const clientSecret = response.data.clientSecret;
    return clientSecret;
  }, []);
  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default Page;
