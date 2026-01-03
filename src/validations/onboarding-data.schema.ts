/**
 * Onboarding Data Validation Schema
 *
 * Complete payload validation for onboarding submission.
 * Ensures data integrity before API submission.
 */

import { z } from "zod";
import { PersonalInfoSchema } from "./personal-info.schema";
import { UsernameSchema } from "./username.schema";
import { ProfessionalProfileSchema } from "./professional-profile.schema";

/**
 * Experience Entry Schema
 */
export const ExperienceSchema = z.object({
 company: z.string().min(1, "Company name is required").max(100),
 position: z.string().min(1, "Position is required").max(100),
 startDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)"),
 endDate: z
  .string()
  .regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)")
  .optional(),
 current: z.boolean().optional(),
 description: z.string().max(500).optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;

/**
 * Education Entry Schema
 */
export const EducationSchema = z.object({
 institution: z.string().min(1, "Institution is required").max(100),
 degree: z.string().min(1, "Degree is required").max(100),
 field: z.string().max(100).optional(),
 startDate: z.string().regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)"),
 endDate: z
  .string()
  .regex(/^\d{4}-\d{2}$/, "Invalid date format (YYYY-MM)")
  .optional(),
 current: z.boolean().optional(),
 gpa: z.string().max(10).optional(),
});

export type Education = z.infer<typeof EducationSchema>;

/**
 * Skill Entry Schema
 */
export const SkillSchema = z.object({
 name: z.string().min(1, "Skill name is required").max(50),
 category: z.string().max(50).optional(),
});

export type Skill = z.infer<typeof SkillSchema>;

/**
 * Language Entry Schema
 */
export const LanguageSchema = z.object({
 language: z.string().min(1, "Language is required").max(50),
 proficiency: z.enum(["BASIC", "CONVERSATIONAL", "PROFESSIONAL", "NATIVE"]),
});

export type Language = z.infer<typeof LanguageSchema>;

/**
 * Template Selection Schema
 */
export const TemplateSelectionSchema = z.object({
 template: z.string().min(1, "Template is required"),
 palette: z.string().min(1, "Color palette is required"),
});

export type TemplateSelection = z.infer<typeof TemplateSelectionSchema>;

/**
 * Complete Onboarding Payload Schema
 *
 * Validates entire submission before sending to backend.
 */
export const OnboardingDataSchema = z.object({
 username: UsernameSchema,
 personalInfo: PersonalInfoSchema,
 professionalProfile: ProfessionalProfileSchema,
 skills: z.array(SkillSchema),
 noSkills: z.boolean(),
 experiences: z.array(ExperienceSchema),
 noExperience: z.boolean(),
 education: z.array(EducationSchema),
 noEducation: z.boolean(),
 languages: z.array(LanguageSchema),
 templateSelection: TemplateSelectionSchema,
});

export type OnboardingData = z.infer<typeof OnboardingDataSchema>;
