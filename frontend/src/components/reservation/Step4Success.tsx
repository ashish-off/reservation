import {
  CheckCircle,
  CalendarIcon,
  CalendarPlus,
  MapPin,
  User,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FirstFormSchemaType, ThirdFormSchemaType } from "./schemas";
import type { TableOption } from "@/types";

interface Step4SuccessProps {
  finalData: FirstFormSchemaType & {
    seating: TableOption;
  } & ThirdFormSchemaType;
}

const Step4Success = ({ finalData }: Step4SuccessProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="text-green-600" size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
          Reservation Secured.
        </h2>
        <p className="text-stone-600 text-lg">
          We have sent a confirmation email to{" "}
          <span className="text-stone-900 font-semibold">
            {finalData.email}
          </span>
          .
        </p>
      </div>

      {/* Reservation Details */}
      <div className="bg-pink-100/30 my-8 backdrop-blur-lg border-zinc-300/10 shadow-2xl ring-4 ring-white/15 rounded-lg overflow-hidden">
        {/* Top section */}
        <div className="bg-pink-100/10 backdrop-blur-lg px-6 py-4 border-b border-stone-300/20 flex justify-between items-center">
          <span className="font-bold text-stone-700">Reservation Details</span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
              finalData.paymentMethod === "now" || finalData.seating.cost === 0
                ? "bg-green-100/50 text-green-700"
                : "bg-amber-100/50 text-amber-700"
            }`}
          >
            {finalData.seating.cost === 0
              ? "Confirmed"
              : finalData.paymentMethod === "now"
              ? "Paid"
              : "Pay at Venue"}
          </span>
        </div>

        <div className="p-6 grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100/50 p-3 rounded-lg">
                <CalendarIcon className="text-amber-800" size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-600 font-bold uppercase">
                  Date & Time
                </p>
                <p className="font-bold">
                  {finalData.date?.toLocaleDateString()} at {finalData.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-800 hover:text-amber-700 hover:bg-amber-100/20"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="size-6" />
              </Button>
              <a
                href="https://maps.app.goo.gl/4Tm974QXnsE8SkNp8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-amber-800 hover:text-amber-700 hover:bg-amber-100/20"
                  title="View Location"
                >
                  <MapPin className="size-6" />
                </Button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100/50 p-2.5 rounded-lg">
                <User className="text-amber-800" size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-600 font-bold uppercase">
                  Guests
                </p>
                <p className="font-semibold">{finalData.guests} People</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-amber-100/50 p-2.5 rounded-lg">
                <Utensils className="text-amber-800" size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-600 font-bold uppercase">
                  Table
                </p>
                <p className="font-semibold">{finalData.seating.name}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200/50">
            <div className="grid grid-cols-2 gap-4 text-sm uppercase">
              <div>
                <p className="text-zinc-600 font-bold mb-1">Name</p>
                <p className="font-medium">{finalData.name}</p>
              </div>
              <div>
                <p className="text-zinc-600 font-bold mb-1">Contact</p>
                <p className="font-medium">{finalData.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Info if applicable */}
          {finalData.seating.cost > 0 && (
            <div className="bg-amber-50/30 border-amber-100/30 p-4 rounded-lg border flex justify-between items-center">
              <span className="text-zinc-600 font-bold text-sm">
                Booking Fee
              </span>
              <span className="text-amber-800 font-bold">
                ${finalData.seating.cost}
              </span>
            </div>
          )}

          {/* Special Request */}
          {finalData.specialRequest && (
            <div className="bg-amber-50/30 border-amber-100/30 p-4 rounded-lg border text-sm">
              <p className="font-bold text-zinc-600 mb-1">Special Request:</p>
              <p className="text-zinc-900 italic">
                "{finalData.specialRequest}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size={"lg"}
          onClick={() => window.location.reload()}
          variant="outline"
          className="w-full sm:w-[60%] py-6 font-bold text-stone-900 bg-white/50"
        >
          Make Another Reservation
        </Button>

        <a href="/" className="w-full sm:w-[32%]">
          <Button
            size={"lg"}
            variant={"default"}
            className="w-full py-6 font-bold"
          >
            <Utensils size={18} />
            Browse Menu
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Step4Success;
