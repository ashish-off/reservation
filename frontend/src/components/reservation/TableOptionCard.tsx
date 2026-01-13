import { Eye } from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { TableOption } from "@/types";

interface TableOptionCardProps {
  table: TableOption;
  onSelect: () => void;
}

const TableOptionCard = ({ table, onSelect }: TableOptionCardProps) => {
  return (
    <Item
      variant="outline"
      asChild
      role="listitem"
      className="border-stone-400/20 shadow-md p-2 sm:p-4"
    >
      <div onClick={onSelect}>
        <ItemMedia
          variant="image"
          className="hover:scale-105 duration-500 size-16 relative"
        >
          <Eye className="absolute bottom-1 right-1 size-4 text-white bg-black/50 rounded-full p-1 pointer-events-none" />
          <Popover>
            <PopoverTrigger asChild>
              <img
                src={table.image}
                alt={table.name}
                className="object-cover cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              />
            </PopoverTrigger>
            <PopoverContent className="w-80 md:w-120 max-h-80 overflow-hidden">
              <img
                src={table.image}
                alt={table.name}
                className="w-full h-full object-cover"
              />
            </PopoverContent>
          </Popover>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 font-bold text-stone-800">
            {table.name}
          </ItemTitle>
          <ItemDescription className="text-zinc-600 font-medium text-xs sm:text-sm text-pretty md:text-balance">
            {table.description}
          </ItemDescription>
          <ItemDescription className="text-wrap">
            {table.features.map((feature, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-white/30 border border-stone-400/30 shadow-sm mr-1 text-[10px] font-semibold sm:text-xs mb-1"
              >
                {feature}
              </Badge>
            ))}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex-none text-center">
          <ItemDescription
            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide ${
              table.cost > 0
                ? "bg-amber-100 text-amber-700"
                : "bg-stone-100 text-green-600"
            }`}
          >
            {table.cost > 0 ? `$${table.cost}` : "Free"}
          </ItemDescription>
        </ItemContent>
      </div>
    </Item>
  );
};

export default TableOptionCard;
