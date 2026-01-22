/**
 * Resume Import DTOs
 *
 * Domain types and validation schemas for importing resumes from external formats
 * (PDF, DOCX, LinkedIn, etc.).
 */

import { z } from "zod";

// ============================================================================
// Import Request
// ============================================================================

// Note: File upload itself is handled separately (multipart/form-data)
// This schema covers the metadata and options

export const ImportResumeRequestSchema = z.object({
  targetResumeId: z.string().cuid().optional(),
  autoMerge: z.boolean().default(false),
});

export type ImportResumeRequest = z.infer<typeof ImportResumeRequestSchema>;

// Alias for backward compatibility
export type ImportResumeDto = ImportResumeRequest;

// ============================================================================
// Parsed Data Structure
// ============================================================================

export const ImportedPersonalInfoSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
});

export type ImportedPersonalInfo = z.infer<typeof ImportedPersonalInfoSchema>;

export const ImportedExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export type ImportedExperience = z.infer<typeof ImportedExperienceSchema>;

export const ImportedEducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ImportedEducation = z.infer<typeof ImportedEducationSchema>;

export const ImportedLanguageSchema = z.object({
  language: z.string(),
  proficiency: z.string().optional(),
});

export type ImportedLanguage = z.infer<typeof ImportedLanguageSchema>;

export const ImportedCertificationSchema = z.object({
  name: z.string(),
  issuer: z.string().optional(),
  date: z.string().optional(),
});

export type ImportedCertification = z.infer<typeof ImportedCertificationSchema>;

export const ImportedResumeDataSchema = z.object({
  personalInfo: ImportedPersonalInfoSchema.optional(),
  experiences: z.array(ImportedExperienceSchema).optional(),
  education: z.array(ImportedEducationSchema).optional(),
  skills: z.array(z.string()).optional(),
  languages: z.array(ImportedLanguageSchema).optional(),
  certifications: z.array(ImportedCertificationSchema).optional(),
});

export type ImportedResumeData = z.infer<typeof ImportedResumeDataSchema>;

// ============================================================================
// Import Result
// ============================================================================

export const ImportResultSchema = z.object({
  success: z.boolean(),
  resumeId: z.string().cuid(),
  data: ImportedResumeDataSchema,
  warnings: z.array(z.string()).optional(),
});

export type ImportResult = z.infer<typeof ImportResultSchema>;
