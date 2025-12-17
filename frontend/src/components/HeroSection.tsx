import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <section
      className="min-h-[80vh] flex flex-col bg-[url('/background.svg')] bg-cover  md:bg-fixed bg-scroll bg-right"
      id="heroSection"
    >
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <div>
            <h1 className="text-[66px] font-bold">Delicious</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-[65%] md:block hidden">
              <img src="/hero1.png" alt="food image" />
            </div>
            <div className="flex flex-col items-center justify-center relative">
              <h1 className="text-[66px] font-bold">Food</h1>
              <h1 className="text-[66px] font-bold">Dishes</h1>
              <img
                className="w-9 absolute right-0 top-0"
                src="/threelines.svg"
                alt="image"
              />
            </div>
            <img className="w-[75%] " src="/logo.svg" alt="logo" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <div className="w-[75%] ">
            <img src="/hero2.png" alt="food image" />
          </div>
          <h1 className="text-[66px] font-bold hidden md:block">Dishes</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
