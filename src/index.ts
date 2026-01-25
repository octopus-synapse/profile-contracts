/**
 * Profile Contracts - Clean Architecture
 *
 * Layered structure following Uncle Bob's Clean Architecture:
 * - Domain: Core business logic, schemas, validators (INNER)
 * - Application: DTOs, API contracts, types (OUTER)
 *
 * Dependencies flow INWARD: Application → Domain
 *
 * DEFAULT EXPORTS: Application layer (DTOs, API types)
 * For Domain layer (schemas, validators): Import from "@profile/contracts/domain"
 */

// ====================================
// APPLICATION LAYER (Default)
// ====================================
export * from "./application";

// ====================================
// COMMON DOMAIN RE-EXPORTS
// ====================================
// Re-export commonly used domain types for convenience
// Full domain layer available at: @octopus-synapse/profile-contracts/domain

// Domain constants (frequently used across layers)
export {
  APP_CONFIG,
  RATE_LIMIT_CONFIG,
  FILE_UPLOAD_CONFIG,
  CACHE_CONFIG,
  CRYPTO_CONSTANTS,
  API_LIMITS,
  TIME_MS,
  TOKEN_EXPIRY,
  PAGINATION,
  SkillLevelToNumeric,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "./domain/constants";

// Domain validators (frequently used)
export { validate, validateOrThrow } from "./domain/validators";

// Resume section types (from domain schemas)
export type {
  Award,
  Publication,
  Talk,
  OpenSource,
  BugBounty,
  Hackathon,
  Interest,
  Achievement,
  Recommendation,
  // Base resume types
  Experience,
  Education,
  Skill,
  Language,
  Project,
  Certification,
} from "./domain/schemas/resume";

// Consent types (from domain schemas)
export type {
  AcceptConsent,
  AcceptConsentResponse,
  ConsentStatus,
  ConsentHistory,
} from "./domain/schemas/consent";

// Consent schemas (frequently used)
export { AcceptConsentSchema } from "./domain/schemas/consent";

// Theme types (from domain schemas)
export type {
  Theme,
  ThemeListItem,
} from "./domain/schemas/theme";

// ====================================
// LEGACY EXPORTS (Backward Compatibility)
// ====================================
// These exports maintain compatibility with existing consumers.
// Prefer importing from domain/ or application/ layers directly.

// GraphQL Integration Utilities
export * from "./graphql";

// DSL Schemas  
export * from "./dsl/layout.schema";
export * from "./dsl/tokens.schema";
export * from "./dsl/sections.schema";
export * from "./dsl/resume-dsl.schema";
export * from "./ast/resume-ast.schema";
export * from "./ast/section-data.schema";

// Domain Validations (legacy location)
export * from "./validations/username.schema";
export * from "./validations/env.schema";
// Selective export from onboarding-data to avoid conflicts
export {
 PersonalInfoSchema,
 TemplateSelectionSchema,
 OnboardingDataSchema,
 LanguageProficiencyEnum,
 CefrLevelEnum,
 type LanguageProficiency,
 type CefrLevel,
 type TemplateSelection,
 type OnboardingData,
 ExperienceSchema as OnboardingExperienceSchema,
 EducationSchema as OnboardingEducationSchema,
 SkillSchema as OnboardingSkillSchema,
 LanguageSchema as OnboardingLanguageSchema,
 type Experience as OnboardingExperience,
 type Education as OnboardingEducation,
 type Skill as OnboardingSkill,
 type Language as OnboardingLanguage,
} from "./validations/onboarding-data.schema";
