"use server";
import { Product } from "@prisma/client";
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

export const addToCartAction = async () => {};

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};

const updateOrCreateCartItem = async () => {};

export const fetchOrCreateCart = async () => {};

export const updateCart = async () => {};

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
