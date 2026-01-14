import { ArrowLeftIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import type { TableOption } from "@/types";
import TableOptionCard from "./TableOptionCard";
import { Button } from "../ui/button";

interface Step2SelectSeatingProps {
  onSelect: (table: TableOption) => void;
  onBack: () => void;
}

const Step2SelectSeating = ({ onSelect, onBack }: Step2SelectSeatingProps) => {
  const tableOptions: TableOption[] = [
    {
      id: "premium-stage",
      name: "Premium Stage",
      description: "Center of the action with live piano view.",
      features: ["High Visibility", "Near Stage"],
      image:
        "https://imgs.search.brave.com/OtlustJ2khsHnBDP0EEfmQcdiHRfDlcBDDAXw8xUAAM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9oaWdoLWJsdXJy/ZWQtaW50ZXJpb3It/bHV4dXJ5Xzg3NzIw/LTE1NTM5Ny5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA",
      cost: 25,
    },
    {
      id: "window-garden",
      name: "Window Garden",
      description: "Quiet corner with a view of the patio.",
      features: ["Natural Light", "Quiet Area"],
      image:
        "https://imgs.search.brave.com/PDGJTLk94xwe2dw1Ksq1m4Mg4MhomDMTKgxLk1HpBJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/NDM4NTY1NTcxNDMt/MDkxODllNTIzZmQ2/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE5IeDhiM1Yw/Wkc5dmNpVXlNSEps/YzNSaGRYSmhiblI4/Wlc1OE1IeDhNSHg4/ZkRBPQ",
      cost: 0,
    },
    {
      id: "private-booth",
      name: "Private Booth",
      description: "Cozy semi-private seating for intimate dining.",
      features: ["Plush Seating", "Semi-Private"],
      image:
        "https://imgs.search.brave.com/TUZA4G9pwnzllTMObP2tKMG0Lj0H6NPmaStW9eb0VjM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg0L2Jk/L2VhLzg0YmRlYWMy/YzEwZjdlOTI3MWM3/NWZjNzFlY2FlOTYy/LmpwZw",
      cost: 15,
    },
    {
      id: "premium-stage-2",
      name: "Premium Stage",
      description: "Center of the action with live piano view.",
      features: ["High Visibility", "Near Stage"],
      image:
        "https://imgs.search.brave.com/OtlustJ2khsHnBDP0EEfmQcdiHRfDlcBDDAXw8xUAAM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9oaWdoLWJsdXJy/ZWQtaW50ZXJpb3It/bHV4dXJ5Xzg3NzIw/LTE1NTM5Ny5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA",
      cost: 25,
    },
    {
      id: "window-garden-2",
      name: "Window Garden",
      description: "Quiet corner with a view of the patio.",
      features: ["Natural Light", "Quiet Area"],
      image:
        "https://imgs.search.brave.com/PDGJTLk94xwe2dw1Ksq1m4Mg4MhomDMTKgxLk1HpBJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/NDM4NTY1NTcxNDMt/MDkxODllNTIzZmQ2/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE5IeDhiM1Yw/Wkc5dmNpVXlNSEps/YzNSaGRYSmhiblI4/Wlc1OE1IeDhNSHg4/ZkRBPQ",
      cost: 0,
    },
    {
      id: "private-booth-2",
      name: "Private Booth",
      description: "Cozy semi-private seating for intimate dining.",
      features: ["Plush Seating", "Semi-Private"],
      image:
        "https://imgs.search.brave.com/TUZA4G9pwnzllTMObP2tKMG0Lj0H6NPmaStW9eb0VjM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg0L2Jk/L2VhLzg0YmRlYWMy/YzEwZjdlOTI3MWM3/NWZjNzFlY2FlOTYy/LmpwZw",
      cost: 15,
    },
  ];

  return (
    <Card className="bg-pink-100/30 backdrop-blur-lg border-zinc-300/10 shadow-2xl ring-4 ring-white/35">
      <CardHeader>
        <CardAction>
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            aria-label="Go Back"
            className="rounded-full bg-white/30 border border-stone-400/30 shadow-md cursor-pointer"
          >
            <ArrowLeftIcon />
          </Button>
        </CardAction>
        <CardTitle className="text-stone-800">3 Tables Found</CardTitle>
        <CardDescription className="text-stone-500">
          Select a seating area for your reservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-4 max-h-[450px] overflow-y-scroll custom-scrollbar">
          <ItemGroup className="gap-4">
            {tableOptions.map((table) => (
              <TableOptionCard
                key={table.id}
                table={table}
                onSelect={() => onSelect(table)}
              />
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default Step2SelectSeating;
