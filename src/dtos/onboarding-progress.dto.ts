/**
 * Onboarding Progress DTOs
 *
 * Data Transfer Objects for onboarding progress tracking.
 * Allows partial saves during the onboarding flow.
 */

import { z } from "zod";
import { UsernameSchema } from "../validations/username.schema";
import { ProfessionalProfileSchema } from "../validations/professional-profile.schema";
import {
 PersonalInfoSchema,
 ExperienceSchema,
 EducationSchema,
 SkillSchema,
 LanguageSchema,
 TemplateSelectionSchema,
} from "../validations/onboarding-data.schema";

/**
 * Onboarding Step Enum
 */
export const OnboardingStepSchema = z.enum([
 "welcome",
 "personal-info",
 "username",
 "professional-profile",
 "experience",
 "education",
 "skills",
 "languages",
 "template",
 "review",
 "complete",
]);

export type OnboardingStep = z.infer<typeof OnboardingStepSchema>;

/**
 * Partial schemas for progress saving
 * These are more lenient than the final schemas to allow incomplete data
 */
const PartialPersonalInfoSchema = PersonalInfoSchema.partial();
const PartialProfessionalProfileSchema = ProfessionalProfileSchema.partial();
const PartialExperienceSchema = ExperienceSchema.partial();
const PartialEducationSchema = EducationSchema.partial();
const PartialSkillSchema = SkillSchema.partial();
const PartialLanguageSchema = LanguageSchema.partial();
const PartialTemplateSelectionSchema = TemplateSelectionSchema.partial();

/**
 * Onboarding Progress Schema
 * Used for saving partial progress during onboarding.
 */
export const OnboardingProgressSchema = z.object({
 currentStep: OnboardingStepSchema,
 completedSteps: z.array(OnboardingStepSchema),
 username: UsernameSchema.optional(),
 personalInfo: PartialPersonalInfoSchema.optional(),
 professionalProfile: PartialProfessionalProfileSchema.optional(),
 experiences: z.array(PartialExperienceSchema).optional(),
 noExperience: z.boolean().optional(),
 education: z.array(PartialEducationSchema).optional(),
 noEducation: z.boolean().optional(),
 skills: z.array(PartialSkillSchema).optional(),
 noSkills: z.boolean().optional(),
 languages: z.array(PartialLanguageSchema).optional(),
 templateSelection: PartialTemplateSelectionSchema.optional(),
});

export type OnboardingProgress = z.infer<typeof OnboardingProgressSchema>;
