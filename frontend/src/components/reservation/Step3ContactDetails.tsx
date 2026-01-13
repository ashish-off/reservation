import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { thirdFormSchema, type ThirdFormSchemaType } from "./schemas";
import type { TableOption } from "@/types";
import SelectedTablePreview from "./SelectedTablePreview";

interface Step3ContactDetailsProps {
  selectedTable: TableOption;
  onSubmit: (data: ThirdFormSchemaType) => void;
  onBack: () => void;
}

const Step3ContactDetails = ({
  selectedTable,
  onSubmit,
  onBack,
}: Step3ContactDetailsProps) => {
  const form = useForm<ThirdFormSchemaType>({
    resolver: zodResolver(thirdFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequest: "",
      paymentMethod: "later",
    },
  });

  const { setValue, watch } = form;
  const selectedPayment = watch("paymentMethod");

  return (
    <div className="flex flex-col gap-4">
      <SelectedTablePreview table={selectedTable} />

      <Card className="bg-pink-100/30 backdrop-blur-lg border-zinc-300/10 shadow-2xl ring-4 ring-white/15">
        <CardHeader>
          <CardTitle className="text-stone-800">Contact Details</CardTitle>
          <CardDescription className="text-stone-500">
            Please provide your contact information to confirm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="third-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-amber-100/50 p-1.5 rounded-md">
                        <User className="text-amber-800" size={16} />
                      </div>
                      <FieldLabel htmlFor="name" className="font-semibold">
                        Full Name
                      </FieldLabel>
                    </div>
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
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-amber-100/50 p-1.5 rounded-md">
                          <Mail className="text-amber-800" size={16} />
                        </div>
                        <FieldLabel htmlFor="email" className="font-semibold">
                          Email Address
                        </FieldLabel>
                      </div>
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
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-amber-100/50 p-1.5 rounded-md">
                          <Phone className="text-amber-800" size={16} />
                        </div>
                        <FieldLabel htmlFor="phone" className="font-semibold">
                          Phone Number
                        </FieldLabel>
                      </div>
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
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-amber-100/50 p-1.5 rounded-md">
                        <MessageSquare className="text-amber-800" size={16} />
                      </div>
                      <FieldLabel
                        htmlFor="specialRequest"
                        className="font-semibold"
                      >
                        Special Request
                      </FieldLabel>
                    </div>
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
          {selectedTable.cost > 0 && (
            <div className="flex justify-between gap-2 w-full">
              <Button
                size="lg"
                variant={selectedPayment === "later" ? "default" : "outline"}
                className={`rounded-lg w-[49%] py-6 ${
                  selectedPayment === "later" ? "" : "bg-white/50"
                }`}
                onClick={() => setValue("paymentMethod", "later")}
              >
                <Wallet size={18} /> Pay At Table
              </Button>
              <Button
                size="lg"
                variant={selectedPayment === "now" ? "default" : "outline"}
                className={`rounded-lg w-[49%] py-6 ${
                  selectedPayment === "now" ? "" : "bg-white/50"
                }`}
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
              className="rounded-lg w-[18%] py-6 bg-white/50"
              onClick={onBack}
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
  );
};

export default Step3ContactDetails;
