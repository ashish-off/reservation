import { useRef } from "react";
import type { DishType } from "../types";
import Category from "./customUI/Category";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Button from "./customUI/Button";
import {MdArrowForwardIos, MdChevronRight, MdKeyboardArrowRight} from "react-icons/md"

const PopularDishes = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const dishes: DishType[] = [
    {
      id: 1,
      image: "./dinner1.jpeg",
      title: "ROASTED LAMB RUMP",
      category: "Dinner",
    },
    {
      id: 2,
      image: "./dinner2.png",
      title: "CITRUS CURED SALMON",
      category: "Dinner",
    },
    {
      id: 3,
      image: "./breakfast1.png",
      title: "PAN SEARED SEA BASS",
      category: "Breakfast",
    },
    {
      id: 4,
      image: "./dinner3.png",
      title: "STUFFED STRAWBERRY",
      category: "Dinner",
    },
    {
      id: 5,
      image: "./lunch1.png",
      title: "BEEF BURGER MEAL",
      category: "Lunch",
    },
    {
      id: 6,
      image: "./dinner4.png",
      title: "MUSSELS SOUP",
      category: "Dinner",
    },
    {
      id: 7,
      image: "./dinner5.png",
      title: "ITALIAN SPAGHETTI",
      category: "Dinner",
    },
    {
      id: 8,
      image: "./dinner6.png",
      title: "GRILLED FISH",
      category: "Dinner",
    },
  ];

  return (
    <section className="w-full max-w-6xl md:mx-auto px-4 py-8 flex flex-col gap-4 md:gap-8 ">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Popular Dishes
        </h1>
        <Button className="flex shadow-none hover:text-gray-700">Show More<MdKeyboardArrowRight className="relative bottom-px" size={30}/></Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        className="w-full "
      >
        <CarouselContent>
          {dishes.map((element) => (
            <CarouselItem
              key={element.id}
              className="basis-1/1 sm:basis-1/2  lg:basis-1/3 pl-17 sm:pl-12"
            >
              <div
                className="w-2xs flex flex-col items-center justify-center gap-1"
                key={element.id}
              >
                <div className="w-58 sm:w-3xs  box-border overflow-hidden">
                  <img src={element.image} alt={element.title} />
                </div>

                <h3 className="text-sm font-semibold">{element.title}</h3>
                <div className="flex flex-row gap-2">
                  <Category>{element.category}</Category>
                  <Category>{element.category}</Category>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default PopularDishes;
