import React, { useState } from "react";
import { Quote, Utensils, ChevronDownIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const firstFormSchema = z.object({
  date: z
    .date()
    .nullable()
    .refine(Boolean, { message: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  guests: z
    .number()
    .min(1, "At least 1 guest is required")
    .max(15, "Maximum 15 guests allowed"),
});

type FirstFormSchemaType = z.infer<typeof firstFormSchema>;

const Reservation = () => {
  const [open, setOpen] = React.useState(false);

  // Steps: 1=Search, 2=Select Table, 3=Details, 4=Success
  const [step] = useState<1 | 2 | 3 | 4>(1);

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
    "09:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
  ];

  const firstForm = useForm<FirstFormSchemaType>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      date: null,
      time: "",
      guests: 2,
    },
  });

  const onSubmit = (data: FirstFormSchemaType) => {
    console.log("form Submitted");
    console.log(data);
  };

  return (
    <div className=" min-h-screen bg-stone-500 flex flex-col lg:flex-row font-sans text-stone-800 ">
      {/* LEFT PANEL */}
      <div className="lg:w-5/12 bg-stone-900 relative p-8 lg:p-16 flex flex-col justify-between lg:items-center text-white overflow-hidden min-h-fit lg:min-h-screen shrink-0">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-stone-800 to-stone-950 opacity-90 z-0"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-600 rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>

        {/* Brand Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-amber-500 mb-8">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 shadow-lg">
              <Utensils size={24} />
            </div>
            <span className="text-sm font-bold tracking-[0.25em] uppercase">
              Everest Dining
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
            {step === 4 ? "Table Secured." : "Experience the Extraordinary."}
          </h1>
          <p className="text-stone-400 text-sm lg:text-lg leading-relaxed max-w-md">
            From intimate booths to the vibrant stage, reserve your perfect
            moment with us today.
          </p>
        </div>

        {/* Hidden on mobile  */}
        <div className="relative z-10 hidden lg:block my-0 lg:max-w-2xl">
          <Quote className="text-amber-600 mb-6 opacity-60 " size={40} />
          <p className="text-xl font-serif italic text-stone-200 mb-6 leading-relaxed">
            Enjoy an unforgettable meal. Whether you seek a cozy private nook or
            a vibrant window-side garden setting, Everest Dining promises the
            perfect atmosphere for every occasion.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-white relative flex flex-col justify-center">
        <div className="flex-1 mx-auto px-6 py-12 lg:px-8 w-full max-w-2xl h-full flex flex-col justify-center ">
          {/* progress Bar */}
          {step < 4 && (
            <div className="mb-12 ">
              <div className="flex items-center justify-between relative mb-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                      step >= s
                        ? "bg-stone-900 border-stone-900 text-white shadow-lg scale-105"
                        : "bg-white border-stone-200 text-stone-300"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest px-1">
                <span>Date & Time</span>
                <span>Select Table</span>
                <span>Details</span>
              </div>
            </div>
          )}

          {/* Form CONtent*/}

          {/* Step 1: Find a Table */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Find a Table</CardTitle>
                <CardDescription>
                  Select your preferred date and time to begin.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  id="first-form"
                  onSubmit={firstForm.handleSubmit(onSubmit)}
                >
                  <FieldGroup>
                    <Controller
                      name="date"
                      control={firstForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex flex-col gap-3">
                            <FieldLabel htmlFor="date" className="px-1">
                              DATE
                            </FieldLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id="date"
                                  aria-invalid={fieldState.invalid}
                                  className="w-48 justify-between font-normal"
                                >
                                  {field.value
                                    ? field.value.toLocaleDateString()
                                    : "Select Date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value ?? undefined}
                                  captionLayout="dropdown"
                                  onSelect={(selectedDate) => {
                                    field.onChange(selectedDate);
                                    setOpen(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="time"
                      control={firstForm.control}
                      render={({ field, fieldState }) => (
                        <div className="w-full max-w-md">
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="time">TIME</FieldLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="time"
                                aria-invalid={fieldState.invalid}
                              >
                                <SelectValue>Select Time</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        </div>
                      )}
                    />

                    <Controller
                      name="guests"
                      control={firstForm.control}
                      render={({ field, fieldState }) => (
                        <div className="w-full max-w-md">
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="guests">GUESTS</FieldLabel>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                            >
                              <SelectTrigger
                                id="guests"
                                aria-invalid={fieldState.invalid}
                              >
                                <SelectValue>2 Guests (Default)</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15].map((guest) => (
                                  <SelectItem key={guest} value={String(guest)}>{guest} Guests </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        </div>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="first-form">
                  Submit
                </Button>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
