import type { DishType } from "../types";
import Button from "./ui/Button";
import Category from "./ui/Category";

const PopularDishes = () => {
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
    // {
    //   id: 6,
    //   image: "./dinner4.png",
    //   title: "MUSSELS SOUP",
    //   category: "Dinner",
    // },
    // {
    //   id: 7,
    //   image: "./dinner5.png",
    //   title: "ITALIAN SPAGHETTI",
    //   category: "Dinner",
    // },
    // {
    //   id: 8,
    //   image: "./dinner6.png",
    //   title: "GRILLED FISH",
    //   category: "Dinner",
    // },
  ];

  return (
    <section className="w-full max-w-6xl md:mx-auto px-4 py-8 border border-green-700 flex flex-col gap-4 md:gap-8 ">

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Popular Dishes</h1>

      <div className="flex flex-row items-center justify-around flex-wrap gap-8 border border-yellow-700">
        {dishes.map((element) => (
          <div className="w-xs flex flex-col items-center justify-center gap-1 border border-red-700" key={element.id}>
            <img className="w-2xs" src={element.image} alt={element.title} />
            <h3 className="text-xl font-semibold">{element.title}</h3>
            <div className="flex flex-row gap-2">
            <Category>{element.category}</Category>
            <Category>{element.category}</Category>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;
