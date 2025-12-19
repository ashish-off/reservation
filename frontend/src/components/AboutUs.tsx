import Button from "./customUI/Button";
import { FaArrowRight } from "react-icons/fa6";


const AboutUs = () => {
  return (
    <section
      className="w-full max-w-6xl md:mx-auto px-4 md:py-8 md:px-4  lg:px-2 flex flex-col justify-center items-center md:flex-row"
      id="about"
    >
      <div className="w-[360px] block md:hidden pb-12 pt-2 ">
        <img src="/about.png" alt="food image" />
      </div>
      <div className="flex flex-col gap-4 lg:pr-21 md:pr-4 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            About Us
          </h1>
          <h2 className="text-xs md:text-[16px] font-semibold">
            “Life’s too short for bad food, so we don’t serve it.”
          </h2>
        </div>

        <article className="text-sm md:text-xl text-gray-800">
          Serving Pokhara for over 12 years, we’ve grown from a small local spot
          into a favorite place for food lovers who value taste and comfort.
          Whether it’s an intimate dinner, a family gathering, or a special
          occasion, our reservation system makes planning your visit effortless
          while we focus on delivering a refined dining experience.
        </article>

        <div className="w-fit mx-auto sm:mx-0">
          <Button className="text-sm md:text-lg py-2 md:py-3 border border-gray-200 flex items-center gap-2">
            Make A Reservation <FaArrowRight />
          </Button>
        </div>
      </div>

      <div className="w-full lg:min-w-[48%] md:min-w-[50%] lg:max-w-[50%] hidden md:block">
        <img src="/about.png" alt="food image" />
      </div>
    </section>
  );
};

export default AboutUs;
