import { useRef } from "react";
import type { DishType } from "../types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Button from "./customUI/CustomButton";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DishItem from "./DishItem";

const PopularDishes = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const popularDishes: DishType[] = [
    {
      id: 1,
      image: "./hero1.png",
      title: "ROASTED LAMB RUMP",
      category: ["Main Course"],
    },
    {
      id: 2,
      image: "./dinner2.png",
      title: "CITRUS CURED SALMON",
      category: ["Main Course"],
    },
    {
      id: 3,
      image: "./breakfast1.png",
      title: "PAN SEARED SEA BASS",
      category: ["Breakfast"],
    },
    {
      id: 4,
      image: "./dinner3.png",
      title: "STUFFED STRAWBERRY",
      category: ["Starters", "Desserts"],
    },
    {
      id: 5,
      image: "./lunch1.png",
      title: "CHICKEN BURGER MEAL",
      category: ["Main Course", "Snacks"],
    },
    {
      id: 6,
      image: "./dinner4.png",
      title: "MUSSELS SOUP",
      category: ["Main Course"],
    },
    {
      id: 7,
      image: "./dinner5.png",
      title: "ITALIAN SPAGHETTI",
      category: ["Main Course"],
    },
    {
      id: 8,
      image: "./dinner6.png",
      title: "GRILLED FISH",
      category: ["Main Course"],
    },
  ];
  const navigate = useNavigate();
  const handleMenu = () => {
    navigate("/menu");
  };

  return (
    <section className="pt-16">
      <div className="container mx-auto px-4 flex flex-col gap-4 md:gap-8 ">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Popular Dishes
          </h1>
          <Button
            onClick={handleMenu}
            className="flex shadow-none hover:text-gray-700"
          >
            Show More
            <MdKeyboardArrowRight className="relative bottom-px" size={30} />
          </Button>
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
            {popularDishes.map((dish) => (
              <CarouselItem
                key={dish.id}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-14 sm:pl-8 xl:pl-12 pr-16 sm:pr-0"
              >
                <DishItem dish= {dish} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularDishes;
