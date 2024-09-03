"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { actionFunction } from "@/utils/types";
import { useToast } from "../ui/use-toast";
import { redirect } from "next/navigation";

/*
const handleSubmitServerAction = async (formData: FormData) => {
  "use server";
  const name = formData.get("name") as string;
  console.log(name, "this");
};*/

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, createProduct] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={createProduct}>{children}</form>;
}

export default FormContainer;
