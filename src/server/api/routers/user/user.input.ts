import { z } from "zod";
import { cuid } from "@/lib/validation";

export const getUserInput = z.object({
  id: cuid,
});

export const signUpUserInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
