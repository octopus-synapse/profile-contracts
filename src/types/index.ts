/**
 * Centralized Types
 *
 * Single source of truth for all domain types.
 * Both frontend and backend must import from here.
 */

// User types
export {
 UserSchema,
 type User,
 UserProfileSchema,
 type UserProfile,
 CheckUsernameResponseSchema,
 type CheckUsernameResponse,
 UserStatsSchema,
 type UserStats,
} from "./user.types";

// Auth types
export {
 AuthTokensSchema,
 type AuthTokens,
 AuthResponseSchema,
 type AuthResponse,
 RefreshTokenResponseSchema,
 type RefreshTokenResponse,
} from "./auth.types";

// Resume types
export {
 ResumeSchema,
 type Resume,
 ResumeListItemSchema,
 type ResumeListItem,
 ResumeExperienceSchema,
 type ResumeExperience,
 ResumeEducationSchema,
 type ResumeEducation,
 ResumeSkillSchema,
 type ResumeSkill,
 ResumeLanguageSchema,
 type ResumeLanguage,
 ResumeCertificationSchema,
 type ResumeCertification,
  ResumeProjectSchema,
  type ResumeProject,
  ResumeRecommendationSchema,
  type ResumeRecommendation,
  type ExperienceResponse,
  type EducationResponse,
  type SkillResponse,
  type LanguageResponse,
  type CertificationResponse,
  type ProjectResponse,
  type RecommendationResponse,
} from "./resume.types";

// API types
export {
 ApiResponseSchema,
 type ApiResponse,
 ApiErrorResponseSchema,
 type ApiErrorResponse,
 PaginatedResponseSchema,
 type PaginatedResponse,
 PaginationQuerySchema,
 type PaginationQuery,
 PaginatedResultSchema,
 type PaginatedResult,
} from "./api.types";
