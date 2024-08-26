"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Containers from "@/components/global/Containers";
import { task, tasks } from "@/utils/actions";
import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  /*const [inc, setInc] = useState(0);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const userss = async () => {
    return await tasks();
  };
  const createUser = async () => {
    console.log("here");
    await task();
    //setInc(inc + 1);
    setUsers(await userss());
    console.log("here 2");
  };
*/
  /*useEffect(() => {
    const u = async () => {
      const newU = await tasks();
      setUsers([...newU]);
    };
    u();
  }, [inc]);*/

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
