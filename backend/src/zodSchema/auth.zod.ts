import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email too short" })
    .max(50, { message: "Email too long" }),

  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be at most 20 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(8, { message: "Email too short" })
    .max(100, { message: "Email too long" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});