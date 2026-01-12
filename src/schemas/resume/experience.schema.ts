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
 * Create Experience Schema
 */
export const CreateExperienceSchema = z.object({
  company: z.string().min(1, "Company is required").max(100),
  position: z.string().min(1, "Position is required").max(100),
  location: z.string().max(100).optional(),
  startDate: DateString,
  endDate: DateString.optional(),
  current: z.boolean().default(false),
  description: z.string().max(2000).optional(),
  achievements: z.array(z.string().max(500)).optional(),
  skills: z.array(z.string().max(50)).optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateExperience = z.infer<typeof CreateExperienceSchema>;

/**
 * Update Experience Schema
 */
export const UpdateExperienceSchema = CreateExperienceSchema.partial();

export type UpdateExperience = z.infer<typeof UpdateExperienceSchema>;
