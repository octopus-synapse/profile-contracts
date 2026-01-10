import { z } from "zod";
import { SkillLevelSchema } from "../enums/skill-level.enum";
import {
 LanguageProficiencyEnum,
 CefrLevelEnum,
} from "../validations/onboarding-data.schema";
import { PrismaResumeTemplateSchema } from "../generated/prisma-enums";

/**
 * Resume Types
 *
 * Core resume entity types shared between frontend and backend.
 * These represent API contracts, not database schema.
 */

/**
 * Resume Experience Schema
 */
export const ResumeExperienceSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 company: z.string(),
 position: z.string(),
 location: z.string().nullable(),
 startDate: z.string(), // ISO date string
 endDate: z.string().nullable(),
 current: z.boolean(),
 description: z.string().nullable(),
 achievements: z.array(z.string()),
 order: z.number().int().min(0),
});

export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;

/**
 * Resume Education Schema
 */
export const ResumeEducationSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 institution: z.string(),
 degree: z.string(),
 field: z.string().nullable(),
 location: z.string().nullable(),
 startDate: z.string(),
 endDate: z.string().nullable(),
 current: z.boolean(),
 description: z.string().nullable(),
 gpa: z.string().nullable(),
 order: z.number().int().min(0),
});

export type ResumeEducation = z.infer<typeof ResumeEducationSchema>;

/**
 * Resume Skill Schema
 */
export const ResumeSkillSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 name: z.string(),
 level: SkillLevelSchema,
 category: z.string().nullable(),
 order: z.number().int().min(0),
});

export type ResumeSkill = z.infer<typeof ResumeSkillSchema>;

/**
 * Resume Language Schema
 */
export const ResumeLanguageSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 name: z.string(),
 level: LanguageProficiencyEnum,
 cefrLevel: CefrLevelEnum.nullable(),
 order: z.number().int().min(0),
});

export type ResumeLanguage = z.infer<typeof ResumeLanguageSchema>;

/**
 * Resume Certification Schema
 */
export const ResumeCertificationSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 name: z.string(),
 issuer: z.string(),
 issueDate: z.string().nullable(),
 expiryDate: z.string().nullable(),
 credentialId: z.string().nullable(),
 credentialUrl: z.string().url().nullable(),
 order: z.number().int().min(0),
});

export type ResumeCertification = z.infer<typeof ResumeCertificationSchema>;

/**
 * Resume Project Schema
 */
export const ResumeProjectSchema = z.object({
 id: z.string().uuid(),
 resumeId: z.string().uuid(),
 name: z.string(),
 description: z.string().nullable(),
 url: z.string().url().nullable(),
 startDate: z.string().nullable(),
 endDate: z.string().nullable(),
 highlights: z.array(z.string()),
 technologies: z.array(z.string()),
 order: z.number().int().min(0),
});

export type ResumeProject = z.infer<typeof ResumeProjectSchema>;

/**
 * Complete Resume Schema
 */
export const ResumeSchema = z.object({
 id: z.string().uuid(),
 userId: z.string().uuid(),
 title: z.string(),
 summary: z.string().nullable(),
 template: PrismaResumeTemplateSchema,
 isPublic: z.boolean(),
 slug: z.string().nullable(),
 createdAt: z.string().datetime(),
 updatedAt: z.string().datetime(),

 // Personal info
 fullName: z.string().nullable(),
 jobTitle: z.string().nullable(),
 phone: z.string().nullable(),
 emailContact: z.string().email().nullable(),
 location: z.string().nullable(),
 linkedin: z.string().url().nullable(),
 github: z.string().url().nullable(),
 website: z.string().url().nullable(),

 // Theme
 activeThemeId: z.string().uuid().nullable(),

 // Relations
 experiences: z.array(ResumeExperienceSchema),
 educations: z.array(ResumeEducationSchema),
 skills: z.array(ResumeSkillSchema),
 languages: z.array(ResumeLanguageSchema),
 certifications: z.array(ResumeCertificationSchema),
 projects: z.array(ResumeProjectSchema),
});

export type Resume = z.infer<typeof ResumeSchema>;

/**
 * Resume List Item (without relations)
 */
export const ResumeListItemSchema = ResumeSchema.omit({
 experiences: true,
 educations: true,
 skills: true,
 languages: true,
 certifications: true,
 projects: true,
});

export type ResumeListItem = z.infer<typeof ResumeListItemSchema>;

/**
 * Resume Recommendation Schema (for API responses)
 */
export const ResumeRecommendationSchema = z.object({
  id: z.string().uuid(),
  resumeId: z.string().uuid(),
  author: z.string(),
  position: z.string().nullable(),
  company: z.string().nullable(),
  content: z.string(),
  date: z.string().nullable(),
  order: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ResumeRecommendation = z.infer<typeof ResumeRecommendationSchema>;

/**
 * Response DTOs (aliases for API responses)
 * These are aliases for the Resume* types to maintain consistent naming
 */
export type ExperienceResponse = ResumeExperience;
export type EducationResponse = ResumeEducation;
export type SkillResponse = ResumeSkill;
export type LanguageResponse = ResumeLanguage;
export type CertificationResponse = ResumeCertification;
export type ProjectResponse = ResumeProject;
export type RecommendationResponse = ResumeRecommendation;
