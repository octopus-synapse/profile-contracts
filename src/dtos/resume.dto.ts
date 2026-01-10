import { z } from "zod";
import { PrismaResumeTemplateSchema } from "../generated/prisma-enums";
import { SkillLevelSchema } from "../enums/skill-level.enum";
import {
 LanguageProficiencyEnum,
 CefrLevelEnum,
} from "../validations/onboarding-data.schema";

/**
 * Resume DTOs
 *
 * Data Transfer Objects for resume operations.
 */

// ============================================================================
// Create DTOs (no id, resumeId)
// ============================================================================

/**
 * Create Experience DTO
 */
export const CreateExperienceSchema = z.object({
 company: z.string().min(1, "Company is required").max(100),
 position: z.string().min(1, "Position is required").max(100),
 location: z.string().max(100).optional(),
 startDate: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format"),
 endDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 current: z.boolean().default(false),
 description: z.string().max(2000).optional(),
 achievements: z.array(z.string().max(500)).optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateExperience = z.infer<typeof CreateExperienceSchema>;

/**
 * Create Education DTO
 */
export const CreateEducationSchema = z.object({
 institution: z.string().min(1, "Institution is required").max(200),
 degree: z.string().min(1, "Degree is required").max(100),
 field: z.string().max(100).optional(),
 location: z.string().max(100).optional(),
 startDate: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format"),
 endDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 current: z.boolean().default(false),
 description: z.string().max(1000).optional(),
 gpa: z.string().max(10).optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateEducation = z.infer<typeof CreateEducationSchema>;

/**
 * Create Skill DTO
 */
export const CreateSkillSchema = z.object({
 name: z.string().min(1, "Skill name is required").max(50),
 level: SkillLevelSchema,
 category: z.string().max(50).optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateSkill = z.infer<typeof CreateSkillSchema>;

/**
 * Create Language DTO
 */
export const CreateLanguageSchema = z.object({
 name: z.string().min(1, "Language is required").max(50),
 level: LanguageProficiencyEnum,
 cefrLevel: CefrLevelEnum.optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateLanguage = z.infer<typeof CreateLanguageSchema>;

/**
 * Create Certification DTO
 */
export const CreateCertificationSchema = z.object({
 name: z.string().min(1, "Certification name is required").max(200),
 issuer: z.string().min(1, "Issuer is required").max(100),
 issueDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 expiryDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 credentialId: z.string().max(100).optional(),
 credentialUrl: z.string().url().optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateCertification = z.infer<typeof CreateCertificationSchema>;

/**
 * Create Project DTO
 */
export const CreateProjectSchema = z.object({
 name: z.string().min(1, "Project name is required").max(100),
 description: z.string().max(1000).optional(),
 url: z.string().url().optional(),
 startDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 endDate: z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Invalid date format")
  .optional(),
 highlights: z.array(z.string().max(500)).optional(),
 technologies: z.array(z.string().max(50)).optional(),
 order: z.number().int().min(0).optional(),
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;

/**
 * Create Resume DTO
 */
export const CreateResumeSchema = z.object({
 title: z.string().min(1, "Title is required").max(100),
 summary: z.string().max(2000).optional(),
 template: PrismaResumeTemplateSchema.default("PROFESSIONAL"),
 isPublic: z.boolean().default(false),

 // Personal info
 fullName: z.string().max(100).optional(),
 jobTitle: z.string().max(100).optional(),
 phone: z.string().max(20).optional(),
 emailContact: z.string().email().optional(),
 location: z.string().max(100).optional(),
 linkedin: z.string().url().optional(),
 github: z.string().url().optional(),
 website: z.string().url().optional(),

 // Relations
 experiences: z.array(CreateExperienceSchema).optional(),
 educations: z.array(CreateEducationSchema).optional(),
 skills: z.array(CreateSkillSchema).optional(),
 languages: z.array(CreateLanguageSchema).optional(),
 certifications: z.array(CreateCertificationSchema).optional(),
 projects: z.array(CreateProjectSchema).optional(),
});

export type CreateResume = z.infer<typeof CreateResumeSchema>;

/**
 * Update Resume DTO
 */
export const UpdateResumeSchema = CreateResumeSchema.partial();

export type UpdateResume = z.infer<typeof UpdateResumeSchema>;
