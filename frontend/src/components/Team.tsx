import type { TeamType } from "../types/index";

const Team = () => {
  const teams: TeamType[] = [
    {
      id: 1,
      image: "./team_member_1.png",
      name: "JOHNATHAN TYLER",
      designation: "Founder & Head Chef",
    },
    {
      id: 2,
      image: "./team_member_2.png",
      name: "WADE WARREN",
      designation: "Sous Chef",
    },
    {
      id: 3,
      image: "./team_member_3.png",
      name: "JHON DOE",
      designation: "Fast Food Chef",
    },
    {
      id: 4,
      image: "./team_member_4.png",
      name: "ALEX COAL",
      designation: "Senior Chef",
    },
  ];
  return (
    <section className="w-full max-w-6xl md:mx-auto px-4 py-8 ">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Our Team
          </h1>
          <p className="text-xs md:text-base text-center">
            With years of expertise and a dedication to culinary excellence, we
            strive to bring you the very best in every dish we serve.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-12 border border-green-700  ">
          {teams.map((team) => (
            <div className="w-3xs flex flex-col items-center justify-center gap-4 border-2 border-red-500">
              <div className="box-border overflow-hidden rounded-[50%] h-45 w-45 flex items-center justify-center">
                <img src={team.image} alt={team.name} />
              </div>

              <div className="flex items-center justify-center flex-col">
                <h3 className="text-sm font-semibold">{team.name}</h3>
                <h3 className="text-xs font-ligh">{team.designation}</h3>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Team;
