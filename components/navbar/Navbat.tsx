import React, { Suspense } from "react";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Containers from "../global/Containers";
import SignOutLink from "./SignOutLink";

function Navbat() {
  return (
    <nav className="border-b ">
      <Containers className="flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <Suspense fallback={<h1>Searching option incoming...</h1>}>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center ">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Containers>
    </nav>
  );
}

export default Navbat;
