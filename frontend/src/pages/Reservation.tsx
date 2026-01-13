import { useState } from "react";
import type { TableOption } from "@/types";
import {
  type FirstFormSchemaType,
  type ThirdFormSchemaType,
} from "@/components/reservation/schemas";
import ReservationLeftPanel from "@/components/reservation/ReservationLeftPanel";
import ProgressBar from "@/components/reservation/ProgressBar";
import Step1DateAndTime from "@/components/reservation/Step1DateAndTime";
import Step2SelectSeating from "@/components/reservation/Step2SelectSeating";
import Step3ContactDetails from "@/components/reservation/Step3ContactDetails";
import Step4Success from "@/components/reservation/Step4Success";

const Reservation = () => {
  const [firstFormData, setFirstFormData] =
    useState<FirstFormSchemaType | null>(null);
  const [secondFormData, setSecondFormData] = useState<
    (FirstFormSchemaType & { seating: TableOption }) | null
  >(null);
  const [finalFormData, setFinalFormData] = useState<
    | (FirstFormSchemaType & { seating: TableOption } & ThirdFormSchemaType)
    | null
  >(null);

  // Steps: 1=Date & Time, 2=Select seating, 3=Contact, 4=Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const handleStep1Submit = (data: FirstFormSchemaType) => {
    setFirstFormData(data);
    setStep(2);
  };

  const handleStep2Select = (table: TableOption) => {
    if (firstFormData) {
      const data = { ...firstFormData, seating: table };
      setSecondFormData(data);
      setStep(3);
    }
  };

  const handleStep3Submit = (data: ThirdFormSchemaType) => {
    if (secondFormData) {
      const finalData = { ...secondFormData, ...data };
      setFinalFormData(finalData);
      setStep(4);
      console.log("Final Reservation Data: ", finalData);
    }
  };

  return (
    <div className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans text-stone-800 lg:overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute bg-[url('/background.svg')] bg-cover bg-local bg-top-right inset-0 isolate -z-1"></div>
      <div className="absolute bg-[url('/center.svg')] bg-cover bg-local bg-center inset-0 z-0"></div>
      <div className="absolute bg-[url('/bottom.svg')] bg-cover bg-local bg-bottom-left inset-0 z-0"></div>

      {/* LEFT PANEL */}
      <ReservationLeftPanel step={step} />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col lg:h-full lg:overflow-y-auto relative z-10">
        <div className="mx-auto px-6 py-4 lg:py-8 lg:px-8 w-full max-w-2xl flex flex-col box-border lg:my-auto">
          {/* Progress Bar */}
          {step < 4 && <ProgressBar step={step} />}

          {/* Step Content */}
          {step === 1 && <Step1DateAndTime onSubmit={handleStep1Submit} />}

          {step === 2 && (
            <Step2SelectSeating
              onSelect={handleStep2Select}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && secondFormData && (
            <Step3ContactDetails
              selectedTable={secondFormData.seating}
              onSubmit={handleStep3Submit}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && finalFormData && (
            <Step4Success finalData={finalFormData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
