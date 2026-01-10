/**
 * Validation Module
 *
 * This module encapsulates ALL validation logic.
 * Consumers (like profile-services) import validation functions
 * WITHOUT knowing the underlying implementation (Zod).
 *
 * Single Responsibility: Validation lives HERE, not in consumers.
 * Dependency Inversion: Consumers depend on abstractions (ValidationResult),
 *                       not concrete implementations (Zod).
 */

import { z, ZodSchema, ZodError } from "zod";

// ============================================================================
// VALIDATION RESULT TYPE
// ============================================================================

/**
 * Result of a validation operation.
 * Consumers use this type without knowing about Zod.
 */
export type ValidationResult<T> =
 | { success: true; data: T }
 | { success: false; errors: ValidationError[] };

export interface ValidationError {
 path: string;
 message: string;
 code: string;
}

// ============================================================================
// VALIDATION FUNCTIONS FACTORY
// ============================================================================

/**
 * Creates a validation function from a Zod schema.
 * The returned function hides Zod completely from consumers.
 */
export function createValidator<T>(schema: ZodSchema<T>) {
 return (data: unknown): ValidationResult<T> => {
  const result = schema.safeParse(data);

  if (result.success) {
   return { success: true, data: result.data };
  }

  return {
   success: false,
   errors: result.error.errors.map((err) => ({
    path: err.path.join("."),
    message: err.message,
    code: err.code,
   })),
  };
 };
}

/**
 * Creates a strict validation function that throws on failure.
 * Use when you want validation to throw BadRequest-style errors.
 */
export function createStrictValidator<T>(schema: ZodSchema<T>) {
 return (data: unknown): T => {
  return schema.parse(data);
 };
}

// ============================================================================
// NESTJS PIPE (Encapsulated - consumers don't know it's Zod)
// ============================================================================

/**
 * Generic validation pipe interface for NestJS.
 * This allows profile-services to use validation without importing Zod.
 */
export interface ValidationPipeOptions {
 /** Transform the data after validation */
 transform?: boolean;
}

export interface ValidationPipeError extends Error {
 errors: ValidationError[];
}

/**
 * Creates a NestJS-compatible validation pipe from a schema.
 *
 * Usage in profile-services:
 * ```typescript
 * import { createExperienceValidationPipe } from '@octopus-synapse/profile-contracts';
 *
 * @Post()
 * async create(@Body(createExperienceValidationPipe()) dto: CreateExperience) {}
 * ```
 */
function createPipeFromSchema<T>(schema: ZodSchema<T>) {
 return () => ({
  transform(value: unknown): T {
   const result = schema.safeParse(value);

   if (!result.success) {
    const error = new Error("Validation failed") as ValidationPipeError;
    error.name = "ValidationError";
    error.errors = result.error.errors.map((err) => ({
     path: err.path.join("."),
     message: err.message,
     code: err.code,
    }));
    throw error;
   }

   return result.data;
  },
 });
}

// ============================================================================
// IMPORT SCHEMAS (internal use only)
// ============================================================================

import {
 CreateResumeSchema,
 UpdateResumeSchema,
 CreateExperienceSchema,
 CreateEducationSchema,
 CreateSkillSchema,
 CreateLanguageSchema,
 CreateCertificationSchema,
 CreateProjectSchema,
 CreatePublicationSchema,
 CreateRecommendationSchema,
 CreateHackathonSchema,
 CreateBugBountySchema,
 CreateOpenSourceSchema,
 CreateTalkSchema,
 CreateAwardSchema,
 CreateInterestSchema,
 CreateAchievementSchema,
 ReorderItemsSchema,
 // Auth schemas
 LoginCredentialsSchema,
 RegisterCredentialsSchema,
 RefreshTokenSchema,
 ChangeEmailSchema,
 ChangePasswordSchema,
 DeleteAccountSchema,
 EmailVerificationSchema,
 ResetPasswordRequestSchema,
 NewPasswordSchema,
 RequestVerificationSchema,
} from "../dtos";

import { PaginationQuerySchema } from "../types";
import { OnboardingDataSchema } from "./onboarding-data.schema";

// ============================================================================
// PRE-BUILT VALIDATORS (Ready to use - no Zod knowledge needed)
// ============================================================================

// Resume validators
export const validateCreateResume = createValidator(CreateResumeSchema);
export const validateUpdateResume = createValidator(UpdateResumeSchema);

// Experience validators
export const validateCreateExperience = createValidator(CreateExperienceSchema);
export const validateUpdateExperience = createValidator(
 CreateExperienceSchema.partial()
);

// Education validators
export const validateCreateEducation = createValidator(CreateEducationSchema);
export const validateUpdateEducation = createValidator(
 CreateEducationSchema.partial()
);

// Skill validators
export const validateCreateSkill = createValidator(CreateSkillSchema);
export const validateUpdateSkill = createValidator(CreateSkillSchema.partial());

// Language validators
export const validateCreateLanguage = createValidator(CreateLanguageSchema);
export const validateUpdateLanguage = createValidator(
 CreateLanguageSchema.partial()
);

// Certification validators
export const validateCreateCertification = createValidator(
 CreateCertificationSchema
);
export const validateUpdateCertification = createValidator(
 CreateCertificationSchema.partial()
);

// Project validators
export const validateCreateProject = createValidator(CreateProjectSchema);
export const validateUpdateProject = createValidator(
 CreateProjectSchema.partial()
);

// Publication validators
export const validateCreatePublication = createValidator(
 CreatePublicationSchema
);
export const validateUpdatePublication = createValidator(
 CreatePublicationSchema.partial()
);

// Recommendation validators
export const validateCreateRecommendation = createValidator(
 CreateRecommendationSchema
);
export const validateUpdateRecommendation = createValidator(
 CreateRecommendationSchema.partial()
);

// Hackathon validators
export const validateCreateHackathon = createValidator(CreateHackathonSchema);
export const validateUpdateHackathon = createValidator(
 CreateHackathonSchema.partial()
);

// Bug Bounty validators
export const validateCreateBugBounty = createValidator(CreateBugBountySchema);
export const validateUpdateBugBounty = createValidator(
 CreateBugBountySchema.partial()
);

// Open Source validators
export const validateCreateOpenSource = createValidator(CreateOpenSourceSchema);
export const validateUpdateOpenSource = createValidator(
 CreateOpenSourceSchema.partial()
);

// Talk validators
export const validateCreateTalk = createValidator(CreateTalkSchema);
export const validateUpdateTalk = createValidator(CreateTalkSchema.partial());

// Award validators
export const validateCreateAward = createValidator(CreateAwardSchema);
export const validateUpdateAward = createValidator(CreateAwardSchema.partial());

// Interest validators
export const validateCreateInterest = createValidator(CreateInterestSchema);
export const validateUpdateInterest = createValidator(
 CreateInterestSchema.partial()
);

// Achievement validators
export const validateCreateAchievement = createValidator(
 CreateAchievementSchema
);
export const validateUpdateAchievement = createValidator(
 CreateAchievementSchema.partial()
);

// Common validators
export const validateReorderItems = createValidator(ReorderItemsSchema);
export const validatePaginationQuery = createValidator(PaginationQuerySchema);

// ============================================================================
// PRE-BUILT VALIDATION PIPES (For NestJS - no Zod knowledge needed)
// ============================================================================

// Resume pipes
export const createResumeValidationPipe =
 createPipeFromSchema(CreateResumeSchema);
export const updateResumeValidationPipe =
 createPipeFromSchema(UpdateResumeSchema);

// Experience pipes
export const createExperienceValidationPipe = createPipeFromSchema(
 CreateExperienceSchema
);
export const updateExperienceValidationPipe = createPipeFromSchema(
 CreateExperienceSchema.partial()
);

// Education pipes
export const createEducationValidationPipe = createPipeFromSchema(
 CreateEducationSchema
);
export const updateEducationValidationPipe = createPipeFromSchema(
 CreateEducationSchema.partial()
);

// Skill pipes
export const createSkillValidationPipe =
 createPipeFromSchema(CreateSkillSchema);
export const updateSkillValidationPipe = createPipeFromSchema(
 CreateSkillSchema.partial()
);

// Language pipes
export const createLanguageValidationPipe =
 createPipeFromSchema(CreateLanguageSchema);
export const updateLanguageValidationPipe = createPipeFromSchema(
 CreateLanguageSchema.partial()
);

// Certification pipes
export const createCertificationValidationPipe = createPipeFromSchema(
 CreateCertificationSchema
);
export const updateCertificationValidationPipe = createPipeFromSchema(
 CreateCertificationSchema.partial()
);

// Project pipes
export const createProjectValidationPipe =
 createPipeFromSchema(CreateProjectSchema);
export const updateProjectValidationPipe = createPipeFromSchema(
 CreateProjectSchema.partial()
);

// Publication pipes
export const createPublicationValidationPipe = createPipeFromSchema(
 CreatePublicationSchema
);
export const updatePublicationValidationPipe = createPipeFromSchema(
 CreatePublicationSchema.partial()
);

// Recommendation pipes
export const createRecommendationValidationPipe = createPipeFromSchema(
 CreateRecommendationSchema
);
export const updateRecommendationValidationPipe = createPipeFromSchema(
 CreateRecommendationSchema.partial()
);

// Hackathon pipes
export const createHackathonValidationPipe = createPipeFromSchema(
 CreateHackathonSchema
);
export const updateHackathonValidationPipe = createPipeFromSchema(
 CreateHackathonSchema.partial()
);

// Bug Bounty pipes
export const createBugBountyValidationPipe = createPipeFromSchema(
 CreateBugBountySchema
);
export const updateBugBountyValidationPipe = createPipeFromSchema(
 CreateBugBountySchema.partial()
);

// Open Source pipes
export const createOpenSourceValidationPipe = createPipeFromSchema(
 CreateOpenSourceSchema
);
export const updateOpenSourceValidationPipe = createPipeFromSchema(
 CreateOpenSourceSchema.partial()
);

// Talk pipes
export const createTalkValidationPipe = createPipeFromSchema(CreateTalkSchema);
export const updateTalkValidationPipe = createPipeFromSchema(
 CreateTalkSchema.partial()
);

// Award pipes
export const createAwardValidationPipe =
 createPipeFromSchema(CreateAwardSchema);
export const updateAwardValidationPipe = createPipeFromSchema(
 CreateAwardSchema.partial()
);

// Interest pipes
export const createInterestValidationPipe =
 createPipeFromSchema(CreateInterestSchema);
export const updateInterestValidationPipe = createPipeFromSchema(
 CreateInterestSchema.partial()
);

// Achievement pipes
export const createAchievementValidationPipe = createPipeFromSchema(
 CreateAchievementSchema
);
export const updateAchievementValidationPipe = createPipeFromSchema(
 CreateAchievementSchema.partial()
);

// Common pipes
export const reorderItemsValidationPipe =
 createPipeFromSchema(ReorderItemsSchema);
export const paginationQueryValidationPipe = createPipeFromSchema(
 PaginationQuerySchema
);

// ============================================================================
// AUTH VALIDATORS & PIPES
// ============================================================================

// Auth validators
export const validateLogin = createValidator(LoginCredentialsSchema);
export const validateRegister = createValidator(RegisterCredentialsSchema);
export const validateRefreshToken = createValidator(RefreshTokenSchema);
export const validateChangeEmail = createValidator(ChangeEmailSchema);
export const validateChangePassword = createValidator(ChangePasswordSchema);
export const validateDeleteAccount = createValidator(DeleteAccountSchema);
export const validateEmailVerification = createValidator(
 EmailVerificationSchema
);
export const validateResetPasswordRequest = createValidator(
 ResetPasswordRequestSchema
);
export const validateNewPassword = createValidator(NewPasswordSchema);
export const validateRequestVerification = createValidator(
 RequestVerificationSchema
);

// Auth pipes
export const loginValidationPipe = createPipeFromSchema(LoginCredentialsSchema);
export const signupValidationPipe = createPipeFromSchema(
 RegisterCredentialsSchema
);
export const refreshTokenValidationPipe =
 createPipeFromSchema(RefreshTokenSchema);
export const changeEmailValidationPipe =
 createPipeFromSchema(ChangeEmailSchema);
export const changePasswordValidationPipe =
 createPipeFromSchema(ChangePasswordSchema);
export const deleteAccountValidationPipe =
 createPipeFromSchema(DeleteAccountSchema);
export const emailVerificationValidationPipe = createPipeFromSchema(
 EmailVerificationSchema
);
export const resetPasswordRequestValidationPipe = createPipeFromSchema(
 ResetPasswordRequestSchema
);
export const newPasswordValidationPipe =
 createPipeFromSchema(NewPasswordSchema);
export const requestVerificationValidationPipe = createPipeFromSchema(
 RequestVerificationSchema
);

// ============================================================================
// ONBOARDING VALIDATORS & PIPES
// ============================================================================

export const validateOnboardingData = createValidator(OnboardingDataSchema);
export const onboardingDataValidationPipe =
 createPipeFromSchema(OnboardingDataSchema);

// ============================================================================
// ANALYTICS VALIDATORS & PIPES
// ============================================================================

import {
 TrackViewSchema,
 ViewStatsQuerySchema,
 KeywordOptionsSchema,
 JobMatchSchema,
 BenchmarkOptionsSchema,
 HistoryQuerySchema,
} from "../dtos/analytics.dto";

// Analytics validators
export const validateTrackView = createValidator(TrackViewSchema);
export const validateViewStatsQuery = createValidator(ViewStatsQuerySchema);
export const validateKeywordOptions = createValidator(KeywordOptionsSchema);
export const validateJobMatch = createValidator(JobMatchSchema);
export const validateBenchmarkOptions = createValidator(BenchmarkOptionsSchema);
export const validateHistoryQuery = createValidator(HistoryQuerySchema);

// Analytics pipes
export const trackViewValidationPipe = createPipeFromSchema(TrackViewSchema);
export const viewStatsQueryValidationPipe =
 createPipeFromSchema(ViewStatsQuerySchema);
export const keywordOptionsValidationPipe =
 createPipeFromSchema(KeywordOptionsSchema);
export const jobMatchValidationPipe = createPipeFromSchema(JobMatchSchema);
export const benchmarkOptionsValidationPipe =
 createPipeFromSchema(BenchmarkOptionsSchema);
export const historyQueryValidationPipe =
 createPipeFromSchema(HistoryQuerySchema);
