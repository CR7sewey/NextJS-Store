"use client";
import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { toast, useToast } from "../ui/use-toast";

function SignOutLink() {
  const { toast } = useToast();
  const handleSignOut = () => {
    toast({ title: "Sign Out", description: " You Are signing out... :(" });
  };

  return (
    <SignOutButton>
      <Link href="/" onClick={handleSignOut} className="w-full text-left">
        Sign Out
      </Link>
    </SignOutButton>
  );
}

export default SignOutLink;
