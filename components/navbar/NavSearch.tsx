import React from "react";
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted "
      placeholder="search product ..."
    />
  );
}

export default NavSearch;
