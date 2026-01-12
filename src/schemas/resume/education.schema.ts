import { z } from "zod";

/**
 * Date Format
 * Backend accepts both YYYY-MM-DD (from date inputs) and YYYY-MM (display)
 */
const DateString = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Invalid date format (YYYY-MM or YYYY-MM-DD)"
  );

/**
 * Create Education Schema
 */
export const CreateEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required").max(200),
  degree: z.string().min(1, "Degree is required").max(100),
  field: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  startDate: DateString,
  endDate: DateString.optional(),
  current: z.boolean().default(false),
  description: z.string().max(1000).optional(),
  gpa: z.string().max(10).optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateEducation = z.infer<typeof CreateEducationSchema>;

/**
 * Update Education Schema
 */
export const UpdateEducationSchema = CreateEducationSchema.partial();

export type UpdateEducation = z.infer<typeof UpdateEducationSchema>;
