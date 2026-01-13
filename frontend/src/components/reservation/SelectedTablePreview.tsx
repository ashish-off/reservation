import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import type { TableOption } from "@/types";

interface SelectedTablePreviewProps {
  table: TableOption;
}

const SelectedTablePreview = ({ table }: SelectedTablePreviewProps) => {
  return (
    <Item
      variant="outline"
      asChild
      role="listitem"
      className="bg-pink-100/20 backdrop-blur-lg border-zinc-300/10 shadow-lg ring-2 ring-pink-300/20 p-2 sm:p-4"
    >
      <div>
        <ItemMedia variant="image" className="size-16">
          <img src={table.image} alt={table.name} />
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

export default SelectedTablePreview;
