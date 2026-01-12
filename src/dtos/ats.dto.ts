/**
 * ATS (Applicant Tracking System) DTOs
 */

import { z } from "zod";

export const ValidateCVSchema = z.object({
 checkFormat: z.boolean().optional(),
 checkSections: z.boolean().optional(),
 checkGrammar: z.boolean().optional(),
 checkOrder: z.boolean().optional(),
 checkLayout: z.boolean().optional(),
});

export type ValidateCV = z.infer<typeof ValidateCVSchema>;

export const ValidationIssueSchema = z.object({
 type: z.enum(["error", "warning", "suggestion"]),
 category: z.string(),
 message: z.string(),
 location: z.string().optional(),
});

export type ValidationIssue = z.infer<typeof ValidationIssueSchema>;

export const ValidationResponseSchema = z.object({
 isValid: z.boolean(),
 score: z.number(),
 issues: z.array(ValidationIssueSchema),
 suggestions: z.array(z.string()),
 metadata: z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  analyzedAt: z.string(),
 }),
});

export type ValidationResponse = z.infer<typeof ValidationResponseSchema>;

/**
 * Validation (alias for ValidationResponse)
 * For backward compatibility
 */
export type Validation = ValidationResponse;
