"use client";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideLateral() {
  const linksAdmin = adminLinks;
  const pathname = usePathname();
  return (
    <aside>
      {linksAdmin.map((links) => {
        const isActivePage = pathname === links.href;
        const variant = isActivePage ? "default" : "ghost";
        return (
          <Button
            key={links.label}
            variant={variant}
            className="w-full mb-2 capitalize font-normal justify-start"
            asChild
          >
            <Link href={links.href}>{links.label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}

export default SideLateral;
