"use server";
import { Product } from "@prisma/client";
import prisma from "./db";
import { redirect } from "next/navigation";
import { actionFunction } from "./types";
import { auth, currentUser } from "@clerk/nextjs/server";

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

export const createProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  console.log(Object.fromEntries(formData), (await getAuthUser()).username);
  return { message: "product created" };
  /*
  await new Promise((resolve, reject) => {
    // just a delay to see the effect
    setTimeout(resolve, 3000); // needs to be in a Promeise to affect (time) the follwoing Promises (await)
  });
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  //const rawData = Object.fromEntries(formData); // hte usual aproach
  const newUser: User = {
    id: Date.now().toString(),
    firstName,
    lastName,
  };
  console.log("aqui!!", firstName, lastName);

  try {
    await saveUsers(newUser);
    revalidatePath("/actions");
    //throw Error("erro");
    // redirect('/') trigger an error
    return "user created successfully...";
  } catch (e) {
    console.log(e);
    return "failed to create user...";
  }
  //revalidatePath("/actions");
  //redirect("/"); // navigate back to the home page, dont place it in try and catch*/
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
