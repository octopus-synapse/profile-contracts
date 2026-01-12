import { z } from "zod";

const DateString = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Invalid date format (YYYY-MM or YYYY-MM-DD)"
  );

/**
 * Create Project Schema
 */
export const CreateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(1000).optional(),
  url: z.string().url().optional(),
  startDate: DateString.optional(),
  endDate: DateString.optional(),
  highlights: z.array(z.string().max(500)).optional(),
  technologies: z.array(z.string().max(50)).optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;

/**
 * Update Project Schema
 */
export const UpdateProjectSchema = CreateProjectSchema.partial();

export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
