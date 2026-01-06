import Button from "./customUI/Button";
import { FaArrowRight } from "react-icons/fa6";
import { MapPin } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-8" id="about">
      <div className="container mx-auto px-4  flex flex-col justify-center items-center md:flex-row">
        <div className="w-[360px] block md:hidden pb-12 pt-2 ">
          <img src="/about.png" alt="food image" />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              About Us
            </h1>
            <h2 className="text-xs md:text-[16px] font-semibold">
              “Life’s too short for bad food, so we don’t serve it.”
            </h2>
          </div>

          <article className="text-sm text-center md:text-left md:text-xl text-gray-800 lg:mr-20 md:mr-2">
            Serving Pokhara for over 12 years, we’ve grown from a small local
            spot into a favorite place for food lovers who value taste and
            comfort. Whether it’s an intimate dinner, a family gathering, or a
            special occasion, our reservation system makes planning your visit
            effortless while we focus on delivering a refined dining experience.
          </article>

          <div className="flex flex-row gap-3 w-fit mx-auto sm:mx-0">
            <a href="https://maps.app.goo.gl/4Tm974QXnsE8SkNp8" target="_blank" rel="noopener noreferrer">
            <Button className="text-xs sm:text-sm py-2 md:py-3 border border-gray-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              Pokhara Lakeside street-3
            </Button>
              </a>
              <a href="/reservation">
            <Button className="text-xs sm:text-sm py-2 md:py-3 border border-gray-200 flex items-center gap-2">
                Make A Reservation <FaArrowRight />
            </Button>
              </a>
          </div>
        </div>

        <div className="w-full lg:min-w-lg md:min-w-sm hidden md:block">
          <img src="/about.png" alt="food image" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
