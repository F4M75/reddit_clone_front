import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email, error: "Invalid email" }),
  password: z.string().min(6),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
