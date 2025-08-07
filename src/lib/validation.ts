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

// COMMENT validation for work experience form
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

// COMMENT validation for education form
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});

export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type skillValues = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type summaryValues = z.infer<typeof summarySchema>;

export type educationValues = z.infer<typeof educationSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

// COMMENT apenAi validation
export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;
