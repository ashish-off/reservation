import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <section
      className="min-h-[90vh] flex flex-col bg-[url('/background.svg')] bg-no-repeat bg-local bg-top-right relative pt-20"
      id="heroSection"
    >
      <Navbar />
      <div className="flex flex-col md:flex-row items-start justify-center container mx-auto px-4 my-auto">
        <div className=" flex flex-col items-center md:items-start justify-center w-full  lg:min-w-[45%] lg:max-w-[55%] mt-2">
          <div>
            <h1 className="text-[66px] font-bold">Delicious</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="w-70 lg:min-w-80 md:block hidden">
              <img src="/hero1.png" alt="food image" />
            </div>

            <div className="flex flex-col items-center justify-center lg:pl-4 md:pr-14 lg:pr-36">
              <h1 className="text-[66px] font-bold relative">Food<img
                className="w-9 absolute top-0 left-36 lg:left-38"
                src="/threelines.svg"
                alt="image"
              /></h1>
              
              <h1 className="text-[66px] font-bold block md:hidden">Dishes</h1>

              <img className="w-[75%] " src="/logo.svg" alt="logo" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-min-[30%] md:max-w-1/3 lg:w-1/3 mt-2  md:mt-28">
          <div className="w-[75%] md:w-72 lg:w-88  mr-2 ">
            <img src="/hero2.png" alt="food image" />
          </div>
          <h1 className="text-[66px] font-bold hidden md:block self-start">
            & Dishes
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
