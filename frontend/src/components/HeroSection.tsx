import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <section
      className="min-h-screen flex flex-col bg-[url('/background.svg')] bg-cover  md:bg-fixed bg-scroll bg-right "
      id="heroSection"
    >
      <Navbar />

      <div className="px-2 md:px-4 lg:px-2  flex flex-col md:flex-row items-center justify-center w-full max-w-6xl md:mx-auto ">

        <div className=" flex flex-col items-center md:items-start justify-center w-full  lg:min-w-[45%] lg:max-w-[55%] ">
          <div>
            <h1 className="text-[66px] font-bold">Delicious</h1>
          </div>

          <div className=" flex flex-col md:flex-row items-center justify-center md:gap-4 ">
            <div className="w-[65%] md:w-68  md:block hidden ">
              <img src="/hero1.png" alt="food image" />
            </div>

            <div className="flex flex-col items-center justify-center relative md:pl-2 lg:pl-6">
              <h1 className="text-[66px] font-bold">Food</h1>
              <h1 className="text-[66px] font-bold block md:hidden">Dishes</h1>
              <img
                className="w-9 absolute right-0 top-0 md:-top-4 md:-right-8"
                src="/threelines.svg"
                alt="image"
              />

              <img className="w-[75%] " src="/logo.svg" alt="logo" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-min-[30%] md:max-w-1/3 lg:w-1/3  md:mt-36">
          <div className="w-[75%] lg:w-68 md:w-64 mr-2  ">
            <img src="/hero2.png" alt="food image" />
          </div>
          <h1 className="text-[66px] font-bold hidden md:block self-start">Dishes</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
