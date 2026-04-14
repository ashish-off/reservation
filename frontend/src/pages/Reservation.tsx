import { useReservationStore } from "@/store";
import ReservationLeftPanel from "@/components/reservation/ReservationLeftPanel";
import ProgressBar from "@/components/reservation/ProgressBar";
import Step1DateAndTime from "@/components/reservation/Step1DateAndTime";
import Step2SelectSeating from "@/components/reservation/Step2SelectSeating";
import Step3ContactDetails from "@/components/reservation/Step3ContactDetails";
import Step4Success from "@/components/reservation/Step4Success";

const Reservation = () => {
  const step = useReservationStore((s) => s.step);

  return (
    <div className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans text-stone-800 lg:overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute bg-[url('/background.svg')] bg-cover bg-local bg-top-right inset-0 isolate -z-1" />
      <div className="absolute bg-[url('/center.svg')] bg-cover bg-local bg-center inset-0 z-0" />

      {/* LEFT PANEL */}
      <ReservationLeftPanel />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col lg:h-full lg:overflow-y-auto relative z-10">
        <div className="mx-auto px-6 py-4 lg:py-8 lg:px-8 w-full max-w-2xl flex flex-col box-border lg:my-auto">

          {step < 4 && <ProgressBar />}

          {step === 1 && <Step1DateAndTime />}
          {step === 2 && <Step2SelectSeating />}
          {step === 3 && <Step3ContactDetails />}
          {step === 4 && <Step4Success />}

        </div>
      </div>
    </div>
  );
};

export default Reservation;
