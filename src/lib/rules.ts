import {  z } from "zod";

export const contactFormSchema = z.object({
  postername: z
    .string()
    .min(3, {
      message: "Postername must be at least 5 characters.",
    })
    .max(30, {
      message: "Postername must not be longer than 30 characters.",
    }),
 
 email: z
    .string()
    .max(30, {
      message: "Email must not be longer than 30 characters.",
    }),
  phone: z
    .string()
    .min(9, {
      message: "Phone must be at least 9 characters.",
    })
    .max(12, {
      message: "Phone must not be longer than 12 characters.",
    })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Phone number must be a valid international phone number.",
    }),

  message: z
    .string()
    .max(80, {
      message: " Description must not be longer than 200 characters.",
    })
 
 
});




