"use server";
import { Cart, Product } from "@prisma/client";
import prisma from "./db";
import { redirect } from "next/navigation";
import { actionFunction } from "./types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { error } from "console";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

export const fetchAllProducts = async (searchParam: string = "") => {
  console.log(searchParam);
  if (searchParam) {
    const products = prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [
          { name: { contains: searchParam, mode: "insensitive" } },
          { company: { contains: searchParam, mode: "insensitive" } },
        ],
      },
    });
    return products;
  }

  const products = prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchProduct = async ({ id }: { id: string }) => {
  const product: Product | null = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
};

// first approach
export const createProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAdminUser();
  const rawData = Object.fromEntries(formData);

  try {
    /*const result = productSchema.safeParse(rawData); ///productSchema.array().safeParse(rawData);
    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);
      throw new Error(errors.join(", "));
    }*/
    const img = rawData.image as File;
    const result = validateWithZodSchema(productSchema, rawData);
    const image = validateWithZodSchema(imageSchema, { image: img });

    const imageSupabase = await uploadImage(img);
    console.log(imageSupabase, "supa");

    /*
    const name = rawData.name as string;
    const company = rawData.company as string;
    const image = rawData.image as File;
    const description = rawData.description as string;
    const featured = Boolean(rawData.featured as string);
    const price = parseInt(rawData.price as string);
    console.log(price);*/
    await prisma.product.create({
      data: {
        ...result,
        image: imageSupabase,
        clerkId: user.id,
      },
    });
    return { message: "product created" };
  } catch (e) {
    return renderError(e);
  }
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProduct = async (prevState: { id: string }) => {
  const productId = prevState.id;
  console.log("AQUI", productId);
  await getAdminUser();
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    console.log("OOOOOOO");
    revalidatePath("/admin/products");
    await deleteImage({ url: product.image });
    return { message: "product removed" };
  } catch (e) {
    return renderError(e);
  }
};

// TODO
export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

// TODO
export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAdminUser();
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  try {
    const result = validateWithZodSchema(productSchema, rawData);

    const product = await fetchProduct({ id: rawData.id as string });
    const product_intersection = { ...product, ...result };

    await prisma.product.update({
      where: {
        id: rawData.id as string,
      },
      data: {
        ...product_intersection,
      },
    });
    revalidatePath(`/admin/products/${rawData.id as string}/edit`);
    return { message: "Product updated successfully" };
  } catch (e) {
    return renderError(e);
  }
};

// TODO
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAdminUser();
  const rawData = Object.fromEntries(formData);
  console.log(rawData);
  try {
    const img = rawData.image as File;
    const image = validateWithZodSchema(imageSchema, { image: img });
    const imageSupabase = await uploadImage(img);
    const oldImage = rawData.url as string;
    await deleteImage({ url: oldImage });
    await prisma.product.update({
      where: {
        id: rawData.id as string,
      },
      data: {
        image: imageSupabase,
      },
    });

    revalidatePath(`/admin/products/${rawData.id as string}/edit`);
    return { message: "Product Image updated successfully" };
  } catch (e) {
    return renderError(e);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  try {
    const favorites = await prisma.favorites.findFirst({
      where: {
        clerkId: user.id,
        productId,
      },
      select: {
        id: true,
      },
    });
    return favorites?.id || null;
  } catch (e) {
    renderError(e);
  }
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  isFavorite: string | null | undefined;
  pathname: string;
}) => {
  const user = await getAuthUser();
  // const rawData = Object.fromEntries(formData);
  try {
    const { productId, isFavorite, pathname } = prevState;
    /*const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });*/
    if (!productId) {
      throw new Error("Not a valid product...");
    }

    /*const favorite = await prisma.favorites.findFirst({
      where: {
        productId: productId,
      },
    });*/

    if (!isFavorite) {
      await prisma.favorites.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    } else {
      await prisma.favorites.delete({
        where: {
          id: isFavorite,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: isFavorite ? "removed from favorites" : "added to favorites",
    };
  } catch (e) {
    return renderError(e);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await prisma.favorites.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

export const fetchProductReviews = async ({ id }: { id: string }) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  const rawData = Object.fromEntries(formData);
  try {
    const result = validateWithZodSchema(reviewSchema, rawData);
    await prisma.review.create({ data: { ...result, clerkId: user.id } });
    revalidatePath(`/products/${result.productId}`);
    return { message: `"Review submited for product~: ${result.productId}` };
  } catch (e) {
    return renderError(e);
  }
};

export const deleteReviewAction = async (prevState: { id: string }) => {
  const reviewId = prevState.id;
  const user = await getAuthUser();
  try {
    const product = await prisma.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "review removed" };
  } catch (e) {
    return renderError(e);
  }
};

export const findExistingReview = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchProductRating = async ({
  productId,
}: {
  productId: string;
}) => {
  const result = await prisma.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    numberOf: result[0]?._count.rating ?? 0,
  };
};
export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchCartItems = async () => {
  const { userId } = auth();
  const cartItems = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cartItems?.numItemsInCart || 0;
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  console.log(formData, "como é que é");
  const rawData = Object.fromEntries(formData);

  try {
    let cart = await fetchOrCreateCart({ userId: user.id });
    const { productId, amount } = rawData;
    let product = await fetchProduct2(productId as string);

    await updateOrCreateCartItem({
      cartId: cart.id,
      productId: productId as string,
      amount: Number(amount),
    });
    await updateCart(cart);

    //return { message: `${amount} Product ${productId} added to the cart...` };
  } catch (e) {
    return renderError(e);
  }
  redirect(`/cart`);
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();

  const rawData = Object.fromEntries(formData);

  try {
    let cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    const { id } = rawData;

    await prisma.cartItem.delete({
      where: {
        id: id as string,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from cart" };

    //return { message: `${amount} Product ${productId} added to the cart...` };
  } catch (e) {
    return renderError(e);
  }
  redirect(`/cart`);
};

export const updateCartItemAction = async ({
  amount,
  cartId,
}: {
  amount: number;
  cartId: string;
}) => {
  const user = await getAuthUser();
  try {
    let cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await prisma.cartItem.update({
      where: {
        id: cartId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart updated" };
  } catch (e) {
    return renderError(e);
  }
};

// Helper functions for cart
const updateOrCreateCartItem = async ({
  cartId,
  amount,
  productId,
}: {
  cartId: string;
  amount: number;
  productId: string;
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
    return cartItem;
  }

  cartItem = await prisma.cartItem.create({
    data: {
      amount,
      productId,
      cartId,
    },
  });
  return cartItem;
};

const fetchProduct2 = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  return cart;
};

export const updateCart = async (cart: Cart) => {
  const user = await getAuthUser();
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true, // Include the related product
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const numItemsInCart = cartItems.reduce((acc, val) => {
    return acc + val.amount;
  }, 0);
  const cartTotal = cartItems.reduce((acc, val) => {
    return acc + val.product.price * val.amount;
  }, 0);
  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      shipping,
      orderTotal,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return { currentCart, cartItems };
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  let orderId: null | string = null;
  let cartId: null | string = null;
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    cartId = cart.id;

    await prisma.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    orderId = order.id;
  } catch (e) {
    return renderError(e);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await prisma.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const user = await getAdminUser();
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

// HELPER FUNCTIONS

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error ocurred...",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route...!");
  }
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) {
    throw new Error(
      "You must be logged in as an admin to access this route...!"
    );
  }
  return user;
};
