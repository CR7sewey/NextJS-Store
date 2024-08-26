"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Containers from "@/components/global/Containers";
import { task, tasks } from "@/utils/actions";
import { useEffect, useState } from "react";

export default function Home() {
  const [inc, setInc] = useState(0);
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

  /*useEffect(() => {
    const u = async () => {
      const newU = await tasks();
      setUsers([...newU]);
    };
    u();
  }, [inc]);*/

  return (
    <div>
      <h1 className="text-3xl">HomePage</h1>
      <Button
        variant="outline"
        size="lg"
        className="capitalize m-8"
        onClick={createUser}
      >
        click me
      </Button>
      {users.map((v) => {
        return <h1 key={v.id}>{v.name}</h1>;
      })}
    </div>
  );
}
