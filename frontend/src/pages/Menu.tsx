import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DishType } from "../types";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { CalendarCheck, House, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extended dish list - you can expand this or fetch from API
  const allDishes: DishType[] = [
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
    // Additional dishes to show more variety
    {
      id: 9,
      image: "./dinner1.jpeg",
      title: "CLASSIC EGGS BENEDICT",
      category: ["Breakfast"],
    },
    {
      id: 10,
      image: "./dinner2.png",
      title: "AVOCADO TOAST DELUXE",
      category: ["Breakfast"],
    },
    {
      id: 11,
      image: "./lunch1.png",
      title: "CAESAR SALAD",
      category: ["Main Course", "Starters"],
    },
    {
      id: 12,
      image: "./dinner3.png",
      title: "GRILLED CHICKEN WRAP",
      category: ["Main Course", "Starters"],
    },
  ];

  const categories = [
    "All",
    "Breakfast",
    "Starters",
    "Main Course",
    "Snacks",
    "Desserts",
    "Drinks",
  ];

  const filteredDishes =
    selectedCategory === "All"
      ? allDishes
      : allDishes.filter((dish) =>
          dish.category
            .map((cat) => cat.trim().toLowerCase())
            .includes(selectedCategory.trim().toLowerCase())
        );

  return (
    <main className="bg-[url('/background.svg')]  bg-local bg-no-repeat bg-top-right min-h-screen w-screen flex flex-col justify-between">
      <section className="container mx-auto px-4 pb-8">
        {/* nav bar */}
        <div className="fixed top-0 left-0 right-0 px-0 sm:px-8 z-50">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md shadow-sm"></div>
          <div className="container mx-auto flex items-center justify-between text-zinc-800 relative z-10 py-3 px-4 sm:px-6">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl border border-white/5 shadow-lg">
                <Utensils size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-widest sm:tracking-[0.5em] uppercase">
                Everest Dining
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                aria-label="Go Back"
                className="w-12 sm:w-auto rounded-xl sm:rounded-full bg-white/30 border border-stone-400/30 shadow-md hover:bg-white/50 active:bg-white/80 duration-75 cursor-pointer"
              >
                <House /> <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                onClick={() => navigate("/reservation")}
                variant="outline"
                aria-label="Go Back"
                className="w-12 sm:w-auto rounded-xl sm:rounded-full bg-white/30 border border-stone-400/30 shadow-md hover:bg-white/50 active:bg-white/80 duration-75 cursor-pointer"
              >
                <CalendarCheck />
                <span className="hidden sm:inline">Reservation</span>
              </Button>
            </nav>
          </div>
        </div>
        <div className=" ">
          {/* Header */}
          <div className="text-center mb-8 pt-20 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 uppercase">
              Our Menu
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              This is a showcase of our menu. To place an order, please visit us
              at the restaurant and order at your table.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 md:px-4 rounded-xl text-sm md:text-base font-medium transition-all duration-200 shadow-sm ${
                  selectedCategory === category
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white/15 border border-gray-300/20 text-gray-700 hover:border-gray-400 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* menu items  */}
          <div>
            <ItemGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 md:gap-8">
              {filteredDishes.map((dish) => (
                <Item key={dish.id} variant="default">
                  <ItemHeader>
                    <img
                      src={dish.image}
                      alt={dish.title}
                      width={128}
                      height={128}
                      className="aspect-3/4 w-sm rounded-sm object-cover"
                    />
                  </ItemHeader>
                  <ItemContent>
                    <ItemTitle className="text-xs md:text-sm">
                      {dish.title}
                    </ItemTitle>
                    <ItemDescription>
                      <div className="flex flex-row gap-2">
                        {dish.category.map((c, i) => (
                          <Badge
                            key={i}
                            variant={"secondary"}
                            className="bg-stone-300/20 border-gray-400/20 capitalize text-[10px] md:text-xs shadow-sm mb-1"
                          >
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </div>

          {/* Empty State */}
          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No dishes found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Menu;
