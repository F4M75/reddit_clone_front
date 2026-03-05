import * as z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email({ pattern: z.regexes.email, error: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["MEN", "WOMEN"], { error: "Please select a gender" }),
  bithdate: z.string().min(1, "Birthdate is required"),
});

export type TSignupSchema = z.infer<typeof signupSchema>;
