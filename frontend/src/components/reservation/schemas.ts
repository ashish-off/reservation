import * as z from "zod";

export const firstFormSchema = z.object({
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

export const thirdFormSchema = z.object({
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

export type FirstFormSchemaType = z.infer<typeof firstFormSchema>;
export type ThirdFormSchemaType = z.infer<typeof thirdFormSchema>;
