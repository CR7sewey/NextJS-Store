import React from "react";
import { LuUser2 } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function UserIcon() {
  const user = await currentUser();
  if (!user?.imageUrl) {
    return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
  }

  return (
    <Image
      src={user?.imageUrl}
      alt={user?.id}
      width={20}
      height={20}
      className="rounded-full object-cover"
    />
  );
}

export default UserIcon;
