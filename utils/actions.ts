"use server";

import prisma from "./db";

export const fetchAllProducts = async (searchParam: string) => {
  console.log(searchParam);
  if (searchParam) {
    const products = prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: {
          contains: searchParam,
        },
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

/*
export const task = async () => {
  await prisma.testProfile.create({
    data: {
      name: "Miguel",
    },
  });
};

export const tasks = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  return await prisma.testProfile.findMany();
};
*/
