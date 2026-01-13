import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  ChevronDownIcon,
} from "lucide-react";
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
import { firstFormSchema, type FirstFormSchemaType } from "./schemas";

interface Step1DateAndTimeProps {
  onSubmit: (data: FirstFormSchemaType) => void;
}

const Step1DateAndTime = ({ onSubmit }: Step1DateAndTimeProps) => {
  const [open, setOpen] = useState(false);

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

  const form = useForm<FirstFormSchemaType>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      date: null,
      time: "",
      guests: 2,
    },
  });

  return (
    <Card className="bg-pink-100/30 backdrop-blur-lg border-zinc-300/10 shadow-2xl ring-4 ring-white/35">
      <CardHeader>
        <CardTitle className="text-stone-800">Find a Table</CardTitle>
        <CardDescription className="text-stone-500">
          Select your preferred date and time to begin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="first-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100/50 p-1.5 rounded-md">
                        <CalendarIcon className="text-amber-800" size={16} />
                      </div>
                      <FieldLabel htmlFor="date" className="font-semibold">
                        Date
                      </FieldLabel>
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger className="bg-transparent" asChild>
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
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="w-full max-w-md">
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-amber-100/50 p-1.5 rounded-md">
                        <Clock className="text-amber-800" size={16} />
                      </div>
                      <FieldLabel htmlFor="time" className="font-semibold">
                        Time
                      </FieldLabel>
                    </div>
                    <Select value={field.value} onValueChange={field.onChange}>
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
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="w-full max-w-md">
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-amber-100/50 p-1.5 rounded-md">
                        <Users className="text-amber-800" size={16} />
                      </div>
                      <FieldLabel htmlFor="guests" className="font-semibold">
                        Guests
                      </FieldLabel>
                    </div>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
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
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                          (guest) => (
                            <SelectItem key={guest} value={String(guest)}>
                              {guest}
                            </SelectItem>
                          )
                        )}
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
  );
};

export default Step1DateAndTime;
