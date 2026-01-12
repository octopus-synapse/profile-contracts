import { z } from "zod";

const DateString = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "Invalid date format (YYYY-MM or YYYY-MM-DD)"
  );

/**
 * Create Certification Schema
 */
export const CreateCertificationSchema = z.object({
  name: z.string().min(1, "Certification name is required").max(200),
  issuer: z.string().min(1, "Issuer is required").max(100),
  issueDate: DateString.optional(),
  expiryDate: DateString.optional(),
  credentialId: z.string().max(100).optional(),
  credentialUrl: z.string().url().optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateCertification = z.infer<typeof CreateCertificationSchema>;

/**
 * Update Certification Schema
 */
export const UpdateCertificationSchema = CreateCertificationSchema.partial();

export type UpdateCertification = z.infer<typeof UpdateCertificationSchema>;
