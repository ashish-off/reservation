import React, { useState } from "react";
import {
  Quote,
  Utensils,
  ChevronDownIcon,
  ArrowLeftIcon,
  Eye,
  CreditCard,
  Wallet,
  CheckCircle,
  User,
  Calendar as CalendarIcon,
  CalendarPlus,
} from "lucide-react";

import {
  Card,
  CardAction,
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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { TableOption } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const thirdFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      "Please enter at least first and last name"
    ),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  specialRequest: z.string().optional(),
  paymentMethod: z.enum(["now", "later"]),
});

type FirstFormSchemaType = z.infer<typeof firstFormSchema>;
type ThirdFormSchemaType = z.infer<typeof thirdFormSchema>;

const Reservation = () => {
  const [open, setOpen] = React.useState(false);
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

  const tableOptions: TableOption[] = [
    {
      id: "premium-stage",
      name: "Premium Stage",
      description: "Center of the action with live piano view.",
      features: ["High Visibility", "Near Stage"],
      image:
        "https://imgs.search.brave.com/OtlustJ2khsHnBDP0EEfmQcdiHRfDlcBDDAXw8xUAAM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9oaWdoLWJsdXJy/ZWQtaW50ZXJpb3It/bHV4dXJ5Xzg3NzIw/LTE1NTM5Ny5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA",
      cost: 25,
    },
    {
      id: "window-garden",
      name: "Window Garden",
      description: "Quiet corner with a view of the patio.",
      features: ["Natural Light", "Quiet Area"],
      image:
        "https://imgs.search.brave.com/PDGJTLk94xwe2dw1Ksq1m4Mg4MhomDMTKgxLk1HpBJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/NDM4NTY1NTcxNDMt/MDkxODllNTIzZmQ2/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE5IeDhiM1Yw/Wkc5dmNpVXlNSEps/YzNSaGRYSmhiblI4/Wlc1OE1IeDhNSHg4/ZkRBPQ",
      cost: 0,
    },
    {
      id: "private-booth",
      name: "Private Booth",
      description: "Cozy semi-private seating for intimate dining.",
      features: ["Plush Seating", "Semi-Private"],
      image:
        "https://imgs.search.brave.com/TUZA4G9pwnzllTMObP2tKMG0Lj0H6NPmaStW9eb0VjM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzg0L2Jk/L2VhLzg0YmRlYWMy/YzEwZjdlOTI3MWM3/NWZjNzFlY2FlOTYy/LmpwZw",
      cost: 15,
    },
  ];

  const firstForm = useForm<FirstFormSchemaType>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      date: null,
      time: "",
      guests: 2,
    },
  });

  const thirdForm = useForm<ThirdFormSchemaType>({
    resolver: zodResolver(thirdFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequest: "",
      paymentMethod: "later",
    },
  });

  // for payment method button and selection
  const { setValue, watch } = thirdForm;
  const selectedPayment = watch("paymentMethod");

  const onSubmitFirst = (data: FirstFormSchemaType) => {
    setFirstFormData(data);
    setStep(2);
  };

  const onSelectSecond = (table: TableOption) => {
    if (firstFormData) {
      const data = { ...firstFormData, seating: table };
      setSecondFormData(data);
      setStep(3);
      // console.log("second form data: ", data);
    }
  };

  const onSubmitThird = (data: ThirdFormSchemaType) => {
    if (secondFormData) {
      const finalData = { ...secondFormData, ...data };
      setFinalFormData(finalData);
      setStep(4);
      console.log("Final Reservation Data: ", finalData);
    }
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
        <div className="flex-1 mx-auto px-6 py-12 lg:px-8 w-full max-w-2xl h-full flex flex-col  max-h-[92vh] box-border border-2 border-red-600">
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
                <span>Seating Area</span>
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
                  onSubmit={firstForm.handleSubmit(onSubmitFirst)}
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
                                <SelectValue placeholder="Select Time" />
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
                                <SelectValue>
                                  {field.value} Guests{" "}
                                  {field.value == 2 ? " (Default)" : ""}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                  15,
                                ].map((guest) => (
                                  <SelectItem key={guest} value={String(guest)}>
                                    {guest}
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
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" form="first-form">
                  Check Availability
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Step 2: Select Table */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardAction>
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    size="icon"
                    aria-label="Go Back"
                    className="rounded-full"
                  >
                    <ArrowLeftIcon />
                  </Button>
                </CardAction>
                <CardTitle>3 Tables Found</CardTitle>
                <CardDescription>
                  Select a seating area for your reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-col gap-4 max-h-[400px] overflow-y-scroll custom-scrollbar">
                  <ItemGroup className="gap-4">
                    {tableOptions.map((table) => (
                      <Item
                        key={table.id}
                        variant="outline"
                        asChild
                        role="listitem"
                      >
                        <div onClick={() => onSelectSecond(table)}>
                          <ItemMedia
                            variant="image"
                            className="hover:scale-105 duration-500 size-16 relative"
                          >
                            <Eye className="absolute bottom-1 right-1 size-4 text-white bg-black/50 rounded-full p-1 pointer-events-none" />
                            <Popover>
                              <PopoverTrigger asChild>
                                <img
                                  src={table.image}
                                  alt={table.name}
                                  className="object-cover cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </PopoverTrigger>
                              <PopoverContent className="w-80 md:w-120 max-h-80 overflow-hidden">
                                <img
                                  src={table.image}
                                  alt={table.name}
                                  className="w-full h-full object-cover"
                                />
                              </PopoverContent>
                            </Popover>
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle className="line-clamp-1">
                              {table.name}
                            </ItemTitle>
                            <ItemDescription>
                              {table.description}
                            </ItemDescription>
                            <ItemDescription>
                              {table.features.map((feature, i) => (
                                <Badge key={i} variant="secondary">
                                  {feature}
                                </Badge>
                              ))}
                            </ItemDescription>
                          </ItemContent>
                          <ItemContent className="flex-none text-center">
                            <ItemDescription
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                table.cost > 0
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {table.cost > 0 ? `$${table.cost}` : "Free"}
                            </ItemDescription>
                          </ItemContent>
                        </div>
                      </Item>
                    ))}
                  </ItemGroup>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && secondFormData && (
            <div className="flex flex-col gap-4">
              <Item
                key={secondFormData.seating.id}
                variant="outline"
                asChild
                role="listitem"
              >
                <div>
                  <ItemMedia variant="image" className=" size-16 ">
                    <img
                      src={secondFormData.seating.image}
                      alt={secondFormData.seating.name}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {secondFormData.seating.name}
                    </ItemTitle>
                    <ItemDescription>
                      {secondFormData.seating.description}
                    </ItemDescription>
                    <ItemDescription>
                      {secondFormData.seating.features.map((feature, i) => (
                        <Badge key={i} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        secondFormData.seating.cost > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {secondFormData.seating.cost > 0
                        ? `$${secondFormData.seating.cost}`
                        : "Free"}
                    </ItemDescription>
                  </ItemContent>
                </div>
              </Item>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>
                    Please provide your contact information to confirm.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="third-form"
                    onSubmit={thirdForm.handleSubmit(onSubmitThird)}
                  >
                    <FieldGroup>
                      <Controller
                        name="name"
                        control={thirdForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                              {...field}
                              id="name"
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. John Doe"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Controller
                          name="email"
                          control={thirdForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="email">
                                Email Address
                              </FieldLabel>
                              <Input
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g. john@example.com"
                                autoComplete="off"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />

                        <Controller
                          name="phone"
                          control={thirdForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="phone">
                                Phone Number
                              </FieldLabel>
                              <Input
                                {...field}
                                id="phone"
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g. (123) 456-7890"
                                autoComplete="off"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>

                      <Controller
                        name="specialRequest"
                        control={thirdForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="specialRequest">
                              Special Request
                            </FieldLabel>
                            <Textarea
                              {...field}
                              id="specialRequest"
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. Vegan meal, Allergies, Birthday, Anniversaries..."
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  {secondFormData.seating.cost > 0 && (
                    <div className="flex justify-between gap-2 w-full">
                      <Button
                        size="lg"
                        variant={
                          selectedPayment === "later" ? "default" : "outline"
                        }
                        className="rounded-lg w-[49%] py-6"
                        onClick={() => setValue("paymentMethod", "later")}
                      >
                        <Wallet size={18} /> Pay At Table
                      </Button>
                      <Button
                        size="lg"
                        variant={
                          selectedPayment === "now" ? "default" : "outline"
                        }
                        className="rounded-lg w-[49%] py-6"
                        onClick={() => setValue("paymentMethod", "now")}
                      >
                        <CreditCard size={18} /> Pay Now
                      </Button>
                    </div>
                  )}
                  <div className="flex justify-between gap-2 w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-lg w-[18%] py-6"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      size="lg"
                      variant="default"
                      className="rounded-lg w-[80%] py-6"
                      type="submit"
                      form="third-form"
                    >
                      Confirm Reservation
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* Step 4: Success Message */}
          {step === 4 && finalFormData && (
            // Success Message
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <CheckCircle
                    className="text-green-600"
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">
                  Reservation Secured.
                </h2>
                <p className="text-stone-500 text-lg mb-10">
                  We have sent a confirmation email to{" "}
                  <span className="text-stone-900 font-semibold">
                    {finalFormData.email}
                  </span>
                  .
                </p>
              </div>
              {/* for additional details */}

              <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                {/* top section */}
                <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex justify-between items-center">
                  <span className="font-bold text-stone-700">
                    Reservation Details
                  </span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                      finalFormData.paymentMethod === "now" ||
                      finalFormData.seating.cost === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {finalFormData.seating.cost === 0
                      ? "Confirmed"
                      : finalFormData.paymentMethod === "now"
                      ? "Paid"
                      : "Pay at Venue"}
                  </span>
                </div>

                <div className="p-6 grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-stone-100 p-3 rounded-lg">
                        <CalendarIcon className="text-stone-600" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 font-medium">
                          Date & Time
                        </p>
                        <p className="text-lg font-bold text-stone-800">
                          {finalFormData.date?.toLocaleDateString()} at{" "}
                          {finalFormData.time}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-stone-400 hover:text-zinc-600 hover:bg-amber-50"
                      title="Add to Google Calendar"
                    >
                      <CalendarPlus className="size-6" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-stone-100 p-2.5 rounded-lg">
                        <User className="text-stone-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 font-bold uppercase">
                          Guests
                        </p>
                        <p className="font-semibold text-stone-800">
                          {finalFormData.guests} People
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-stone-100 p-2.5 rounded-lg">
                        <Utensils className="text-stone-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 font-bold uppercase">
                          Table
                        </p>
                        <p className="font-semibold text-stone-800">
                          {finalFormData.seating.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-stone-500 mb-1">Name</p>
                        <p className="font-medium text-stone-900">
                          {finalFormData.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500 mb-1">Contact</p>
                        <p className="font-medium text-stone-900">
                          {finalFormData.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info if applicable */}
                  {finalFormData.seating.cost > 0 && (
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex justify-between items-center">
                      <span className="text-amber-800 font-medium text-sm">
                        Booking Fee
                      </span>
                      <span className="text-amber-900 font-bold">
                        ${finalFormData.seating.cost}
                      </span>
                    </div>
                  )}

                  {/* Special Request */}
                  {finalFormData.specialRequest && (
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm">
                      <p className="font-bold text-stone-700 mb-1">
                        Special Request:
                      </p>
                      <p className="text-stone-600 italic">
                        "{finalFormData.specialRequest}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                size={"lg"}
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full sm:w-[60%] py-6"
                >
                  Make Another Reservation
                </Button>

                <a href="/" className="w-full sm:w-[32%]">
                  <Button size={"lg"} variant={"default"} className="w-full py-6">
                    <Utensils size={18} />
                    Browse Menu
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
