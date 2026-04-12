import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { DishType } from "@/types";

interface MenuState {
  selectedCategory: string;
  allDishes: DishType[];
}

interface MenuActions {
  setSelectedCategory: (category: string) => void;
  setAllDishes: (dishes: DishType[]) => void;
}

type MenuStore = MenuState & MenuActions;

// Extended dish list moved from Menu.tsx
const initialDishes: DishType[] = [
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

export const useMenuStore = create<MenuStore>()(
  devtools(
    immer((set) => ({
      selectedCategory: "All",
      allDishes: initialDishes,
      setSelectedCategory: (category) =>
        set((state) => {
          state.selectedCategory = category;
        }),
      setAllDishes: (dishes) =>
        set((state) => {
          state.allDishes = dishes;
        }),
    }))
  )
);
