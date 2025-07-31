// COMMENT this contains our form schema's | to validate the form
import { z } from "zod";
export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type generalValues = z.infer<typeof generalInfoSchema>;
