import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-8 px-4 relative">
      {/* Decorative Background  */}
      <div className="absolute bg-[url('/background.svg')] bg-cover bg-local bg-top-right inset-0 isolate -z-1"></div>
      <div className="absolute bg-[url('/center.svg')] bg-cover bg-local  bg-center inset-0 z-0"></div>

      <main className="container mx-auto px-4 flex flex-col items-center justify-center gap-6 max-w-2xl text-center relative z-10">
        <div className="w-full max-w-md">
          <img src="/notFound.svg" alt="notFound" className="w-full h-auto" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            LOOKS LIKE YOU'RE LOST
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            We can't seem to find the page you're looking for
          </p>
        </div>

        <div className="mt-2">
          <Button
            onClick={handleHomeClick}
            size="lg"
            variant="default"
            className="flex items-center gap-2"
          >
            Back to Home
            <Home className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </main>
    </section>
  );
};

export default NotFound;
