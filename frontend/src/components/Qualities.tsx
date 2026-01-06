import type { QualitiyType } from "../types";

const Qualities = () => {
  const Qualities: QualitiyType[] = [
    {
      id: 1,
      image: "./quality_food.svg",
      title: "QUALITY FOOD",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellendus officia qui repellat.",
    },
    {
      id: 2,
      image: "./super_taste.svg",
      title: "SUPER TASTE",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing sit amet elit. Sit voluptates quaerat pariatur.",
    },
    {
      id: 3,
      image: "./fast_delivery.svg",
      title: "FAST DELIVERY",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellendus officia qui repellat.",
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
