import type { QualitiyType } from "../types";

const Qualities = () => {
  const Qualities: QualitiyType[] = [
    {
      id: 1,
      image: "./online_booking.png",
      title: "Easy online booking",
      description: "Reserve your table in under a minute—no calls needed.",
    },
    {
      id: 2,
      image: "./same_day.png",
      title: "Same-day availability",
      description: "Live table updates for brunch, dinner, and late nights.",
    },
    {
      id: 3,
      image: "./private_event.png",
      title: "Private events",
      description: "Tailored menus for celebrations and team gatherings.",
    },
  ];

  return (
    <section className="py-8" id="qualities">
      <div
        className="container mx-auto px-4 flex flex-col gap-4 sm:gap-8 items-center justify-center sm:flex-row"
      >
        {Qualities.map((quality) => (
          <div
            key={quality.id}
            className="w-[90%] sm:w-xs flex flex-col justify-center items-center"
          >
            <img
              className="w-[130px] mb-6"
              src={`/${quality.image}`}
              alt="picture"
            />
            <h1 className="font-bold text-lg md:text-xl text-center mb-4">
              {quality.title}
            </h1>
            <p className="text-gray-700 text-center text-sm md:text-lg">
              {quality.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Qualities;
