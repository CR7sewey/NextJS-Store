"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { ReloadIcon } from "@radix-ui/react-icons";
import { deleteProduct } from "@/utils/actions";

type actionType = "edit" | "delete";

export const IconButton = ({ type, id }: { type: actionType; id?: string }) => {
  const { pending } = useFormStatus();

  const correctIcon = () => {
    if (type === "edit") {
      return <LuPenSquare />;
    } else if (type === "delete") {
      return <LuTrash2 />;
    }
    throw new Error("Invalid action type", type);
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className=" animate-spin" /> : correctIcon()}
    </Button>
  );
};
