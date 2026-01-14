/**
 * Centralized Enums
 *
 * Single source of truth for all domain enums.
 * Both frontend and backend must import from here.
 */

export * from "./user-role.enum";
export * from "./skill-level.enum";
export * from "./resume-status.enum";
export * from "./collaborator-role.enum";

// Re-export Prisma-synced enums for convenience
export {
 // Theme
 PrismaThemeStatusSchema,
 type PrismaThemeStatus,
 PrismaThemeCategorySchema,
 type PrismaThemeCategory,
 // Tech
 PrismaTechAreaTypeSchema,
 type PrismaTechAreaType,
 PrismaSkillTypeSchema,
 type PrismaSkillType,
 // Resume
 PrismaResumeTemplateSchema,
 type PrismaResumeTemplate,
 // Mapping functions
 themeStatusToKebab,
 themeStatusFromKebab,
 themeCategoryToKebab,
 themeCategoryFromKebab,
 techAreaTypeToKebab,
 techAreaTypeFromKebab,
 skillTypeToKebab,
 skillTypeFromKebab,
 resumeTemplateToKebab,
 resumeTemplateFromKebab,
} from "../generated/prisma-enums";

// Re-export from validations (already defined there)
export {
 LanguageProficiencyEnum,
 type LanguageProficiency,
 CefrLevelEnum,
 type CefrLevel,
} from "../validations/onboarding-data.schema";
