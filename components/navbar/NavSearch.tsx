"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function NavSearch() {
  const [inputValue, setInputValue] = useState("");
  const { replace } = useRouter();
  const searchProduct = (value: string) => {
    console.log("aqui a");
    setInputValue(value);
    if (value === "") {
      replace(`/products`);
      return;
    }
    replace(`/products?search=${inputValue}`);
  };
  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted "
      placeholder="search product ..."
      value={inputValue}
      onChange={(e) => searchProduct(e.target.value)}
    />
  );
}

export default NavSearch;
