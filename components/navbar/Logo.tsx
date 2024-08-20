import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
const image =
  "https://ih1.redbubble.net/image.4664960894.7913/raf,360x360,075,t,fafafa:ca443f4786.jpg";
function Logo() {
  return (
    <Button size="icon" variant="ghost" asChild>
      <Link href="/">
        <Image src={image} alt="my-logo" width={500} height={500} />
      </Link>
    </Button>
  );
}

/**
 * <Button size='icon' asChild>
      <Link href='/'>
        <VscCode className='w-6 h-6' />
      </Link>
    </Button>
 */

export default Logo;
