// Constants (centralized)
export * from "./constants";

// Enums (centralized)
export * from "./enums";

// Types (centralized)
export * from "./types";

// Schemas (Clean Architecture - Organized by domain)
export * from "./schemas";

// Validators (Pure validation functions)
export * from "./validators";

// DTOs (DEPRECATED - kept for backward compatibility)
// Selective exports to avoid conflicts with schemas
export * from "./dtos/user-profile.dto";
export * from "./dtos/analytics.dto";
export * from "./dtos/theme.dto";
export * from "./dtos/mec.dto";
export * from "./dtos/ats.dto";
export * from "./dtos/translation.dto";
export * from "./dtos/admin.dto";
export * from "./dtos/common.dto";
export * from "./dtos/onboarding-progress.dto";
export * from "./dtos/resume-extended.dto";
export * from "./dtos/user.dto";
export * from "./dtos/chat.dto";
// Note: resume.dto and auth.dto conflict with schemas - prefer schemas for those

// GraphQL Integration Utilities
export * from "./graphql";

// DSL Schemas
export * from "./dsl/layout.schema";
export * from "./dsl/tokens.schema";
export * from "./dsl/sections.schema";
export * from "./dsl/resume-dsl.schema";
export * from "./ast/resume-ast.schema";
export * from "./ast/section-data.schema";

// Domain Validations (specific schemas not in schemas/)
export * from "./validations/username.schema";
export * from "./validations/professional-profile.schema";
export * from "./validations/onboarding-data.schema";
export * from "./validations/env.schema";

// Generated (Prisma sync)
export * from "./generated/prisma-enums";
