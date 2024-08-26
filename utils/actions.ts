"use server";

import prisma from "./db";

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
