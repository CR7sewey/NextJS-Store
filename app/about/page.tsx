import prisma from "@/utils/db";
import React from "react";

async function Page() {
  /*const new_user = await prisma.testProfile.create({
    data: {
      name: "random",
    },
  });
  console.log(new_user);
  const users = await prisma.testProfile.findMany();*/
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          {" "}
          store
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
        laudantium optio, molestias officiis saepe voluptate fuga quia voluptas
        ad voluptates eum placeat. Dolore sapiente commodi beatae placeat velit.
        Praesentium, eius?
      </p>
    </section>
  );
}

export default Page;
