import type { DishType } from "@/types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "./ui/item";
import { Badge } from "./ui/badge";

const DishItem = ({ dish }: {dish : DishType}) => {
  return (
    <>
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
          <ItemTitle className="text-xs md:text-sm">{dish.title}</ItemTitle>
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
    </>
  );
};

export default DishItem;
