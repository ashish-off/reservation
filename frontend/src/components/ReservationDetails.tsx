import { useNavigate } from "react-router-dom";
import Button from "./customUI/CustomButton";
import Reviews from "./Reviews";

const ReservationDetails = () => {
  const navigate = useNavigate();
  const handleReserveClick = () => {
    navigate("/reservation");
  };

  return (
    <section className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* review section */}
        <Reviews />

        {/* Reservation Section */}
        <div className="mt-20 md:mt-24 lg:mt-28" id="reservation">
          <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
            {/* Main Heading */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                Reserve Your Seat Now!
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium">
                Book an unforgettable dining experience
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed">
              Whether it's a cozy dinner for two or a lively gathering with
              friends, secure your spot and arrive to a table that's ready for
              you—no waiting, just warm hospitality.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-2">
              <Button
                onClick={handleReserveClick}
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-8 py-4 md:px-10 md:py-4 rounded-full uppercase tracking-wide text-sm md:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Reserve a Table Now
              </Button>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 text-sm md:text-base">
                <span className="text-gray-600">or</span>
                <a
                  className="font-semibold text-gray-700 hover:text-amber-600 transition-colors duration-200 flex items-center gap-1"
                  href="tel:+15551234567"
                >
                  Call us: +1 (555) 123-4567
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-4 text-xs md:text-sm text-gray-500">
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                Open daily 10 AM – 11 PM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span>Instant confirmation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
              <span>Cancellation up to 1 day before (Non Refundable)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationDetails;
