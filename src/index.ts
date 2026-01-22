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
