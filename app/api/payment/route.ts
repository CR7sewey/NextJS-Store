import { NextRequest } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import prisma from "@/utils/db";
import { redirect } from "next/navigation";

export const POST = async (req: NextRequest) => {
  try {
    const requestHeaders = new Headers(req.headers);
    const origin = requestHeaders.get("origin");

    const { orderId, cartId } = await req.json();

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    const cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order || !cart) {
      return Response.json(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    const line_items = cart.cartItems.map((cartItem) => {
      return {
        quantity: cartItem.amount,
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.product.name,
            images: [cartItem.product.image],
          },
          unit_amount: cartItem.product.price * 100, // price in cents
        },
      };
    });

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.log(err);

    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};

/**
 *  default:
      res.setHeader("Allow", req.method);
      res.status(405).end("Method Not Allowed")
 */
