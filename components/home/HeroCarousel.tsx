import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";

const images = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {images.map((vals, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="p-2">
                  <Image
                    src={vals}
                    alt="hero"
                    className="w-full h-[24rem] rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}

export default HeroCarousel;

/**
 * {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
 */
