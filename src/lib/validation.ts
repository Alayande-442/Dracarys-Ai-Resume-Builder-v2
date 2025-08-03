// COMMENT this contains our form schema's | to validate the form
import { z } from "zod";
export const optionalString = z.string().trim().optional().or(z.literal(""));

// validation COMMENT for general info form
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type generalInfoValues = z.infer<typeof generalInfoSchema>;

// COMMENT validation for personal info form

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "file must be less than 4MB",
    ),

  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type personalInfoValues = z.infer<typeof personalInfoSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});
export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo: File | string | null;
};
