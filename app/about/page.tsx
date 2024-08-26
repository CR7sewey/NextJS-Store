import prisma from "@/utils/db";
import React from "react";

async function Page() {
  const new_user = await prisma.testProfile.create({
    data: {
      name: "random",
    },
  });
  console.log(new_user);
  const users = await prisma.testProfile.findMany();
  return (
    <div>
      {users.map((v) => {
        return <h1 key={v.id}>{v.name}</h1>;
      })}
    </div>
  );
}

export default Page;
