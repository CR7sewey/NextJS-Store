"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddToCart from "../single-product/AddToCart";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: "default" | "lg" | "sm";
};

function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const formState = useFormStatus();

  const pending = formState.pending === true;
  console.log(formState, "fs");
  return (
    <Button
      type="submit"
      size={size}
      className={cn("capitalize", className)}
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export default SubmitButton;

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: Boolean }) => {
  const formState = useFormStatus();
  const pending = formState.pending === true;
  return (
    <Button
      type="submit"
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className=" animate-spin" />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};

export const ProductSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        className="capitalize mt-8 cursor-pointer"
        size="default"
      >
        Please Sign In
      </Button>
    </SignInButton>
  );
};
