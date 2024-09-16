"use client";
import { actionFunction } from "@/utils/types";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import SubmitButton from "./Buttons";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

function ImageInputContainer(props: ImageInputContainerProps) {
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  return (
    <div className="mb-8">
      <Suspense>
        <Image
          src={props.image}
          alt={props.name}
          width={200}
          height={200}
          className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
        />
      </Suspense>
      <Button
        variant="outline"
        size="sm"
        className="capitalize"
        onClick={() => setUpdateFormVisible((prev) => !prev)}
      >
        {props.text}
      </Button>
      {isUpdateFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={props.action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}

export default ImageInputContainer;
