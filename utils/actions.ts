"use server";
import { Product } from "@prisma/client";
import prisma from "./db";
import { redirect } from "next/navigation";
import { actionFunction } from "./types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { error } from "console";

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
  const user = await getAuthUser();
  const rawData = Object.fromEntries(formData);

  try {
    /*const result = productSchema.safeParse(rawData); ///productSchema.array().safeParse(rawData);
    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);
      throw new Error(errors.join(", "));
    }*/
    const result = validateWithZodSchema(productSchema, rawData);
    const image = validateWithZodSchema(imageSchema, { image: rawData?.image });

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
        image: `/images/${(image.image as File).name}`,
        clerkId: user.id,
      },
    });
    return { message: "product created" };
  } catch (e) {
    return renderError(e);
  }
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
