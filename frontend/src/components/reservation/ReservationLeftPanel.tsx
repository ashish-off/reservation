import { Utensils, Quote, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ReservationLeftPanelProps {
  step: 1 | 2 | 3 | 4;
}

const ReservationLeftPanel = ({ step }: ReservationLeftPanelProps) => {
  const navigate = useNavigate();

  return (
    <div className="lg:w-5/12 relative lg:h-full p-4 sm:p-8 lg:p-16 flex flex-col justify-between lg:items-center overflow-hidden min-h-fit shrink-0">
      {/* Brand Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-8">
          <div className="flex items-center gap-3 text-amber-600">
            <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl border border-white/5 shadow-lg">
              <Utensils size={20} className="sm:w-6 sm:h-6" />
            </div>
            <span className="text-sm font-bold tracking-[0.25em] uppercase">
              Everest Dining
            </span>
          </div>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            aria-label="Go Back"
            className="rounded-full bg-white/30 border border-stone-400/30 shadow-md hover:bg-white/50 active:bg-white/80 duration-75 cursor-pointer"
          >
            <House /> Home
          </Button>
        </div>
        <h1 className="text-[25px] md:text-4xl lg:text-5xl font-semibold mb-1 sm:mb-6">
          {step === 4 ? "Table Secured." : "Experience the Extraordinary."}
        </h1>
        <p className="text-stone-600 font-semibold text-sm lg:text-lg leading-relaxed max-w-md">
          From intimate booths to the vibrant stage, reserve your perfect moment
          with us today.
        </p>
      </div>

      {/* Hidden on mobile */}
      <div className="relative z-10 hidden lg:block my-0 lg:max-w-2xl">
        <Quote className="text-amber-500 mb-6" size={40} />
        <p className="text-xl text-zinc-700 italic font-semibold mb-6 leading-relaxed">
          Enjoy an unforgettable meal. Whether you seek a cozy private nook or a
          vibrant window-side garden setting, Everest Dining promises the perfect
          atmosphere for every occasion.
        </p>
      </div>
    </div>
  );
};

export default ReservationLeftPanel;
