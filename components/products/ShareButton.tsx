"use client";
import React from "react";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  console.log("ESTOU AQUI");
  const shareLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/products/${productId}`;
  return (
    <Popover
      placement="top-start"
      offset={10}
      showArrow
      key="blur"
      backdrop="blur"
    >
      <PopoverTrigger>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-x-2 justify-center w-full">
          <TwitterShareButton url={shareLink} title={name}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareLink} title={name}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={shareLink} subject={name}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
