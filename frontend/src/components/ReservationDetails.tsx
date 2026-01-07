
import Button from "./customUI/Button";
import Reviews from "./Reviews";

const ReservationDetails = () => {

  const handleReserveClick = () => {
    window.location.href = "/reservation";
  };

  return (
    <section className="py-12 md:py-8" id="reservation">
      <div className="container md:mx-auto px-4">
        {/* review section */}
        <Reviews/>

        <div className="flex flex-col gap-6 pt-16">
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ">
            Reserve your seat
          </p>
          <h2 className="text-xs md:text-sm lg:text-base font-medium tracking-wide">
            Book an unforgettable dining experience
          </h2>
          <p className="text-gray-700 text-sm md:text-base max-w-2xl">
            Whether it is a cozy dinner for two or a lively gathering with
            friends, secure your spot and arrive to a table that is ready for
            you—no waiting, just warm hospitality.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              onClick={handleReserveClick}
              className="bg-amber-400 hover:bg-amber-300 px-6 py-3 md:px-7 md:py-3.5 rounded-full uppercase tracking-wide"
            >
              Reserve a Table
            </Button>
            <div className="text-sm md:text-base text-gray-700">
              Prefer to call?{" "}
              <a
                className="font-semibold hover:text-amber-600"
                href="tel:+15551234567"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="text-xs text-gray-500">
              Open daily 10 AM – 11 AM · Instant confirmation · Free
              cancellation up to 1 day before
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationDetails;
