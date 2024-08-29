"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect } from "react";

function NavSearch() {
  const searchParameters = useSearchParams();
  console.log(searchParameters.get("search"));
  const [search, setSearch] = useState(
    searchParameters.get("search")?.toString() || ""
  );
  const { replace } = useRouter();
  const searchProduct = useDebouncedCallback((value: string) => {
    const urlParams = new URLSearchParams(searchParameters);
    console.log("aqui a", urlParams.toString());
    console.log(searchParameters);
    setSearch(value);
    //setInputValue(value);
    if (value === null) {
      urlParams.delete("search");
      replace(`/products?${urlParams.toString()}`);
      return;
    }
    urlParams.set("search", value);
    replace(`/products?${urlParams.toString()}`); // toString turns the objet into layout=list&search=ava f.e.
  }, 300);

  useEffect(() => {
    if (!searchParameters.get("search")) {
      setSearch("");
    }
  }, [searchParameters.get("search")]);
  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted "
      placeholder="search product ..."
      value={search}
      onChange={(e) => searchProduct(e.target.value)}
    />
  );
}

export default NavSearch;
