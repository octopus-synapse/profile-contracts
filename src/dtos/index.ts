/**
 * Centralized DTOs
 *
 * Single source of truth for all Data Transfer Objects.
 * Both frontend and backend must import from here.
 */

// Auth DTOs
export {
 LoginCredentialsSchema,
 type LoginCredentials,
 RegisterCredentialsSchema,
 type RegisterCredentials,
 ResetPasswordRequestSchema,
 type ResetPasswordRequest,
 NewPasswordSchema,
 type NewPassword,
 ChangePasswordSchema,
 type ChangePassword,
 ChangeEmailSchema,
 type ChangeEmail,
 RefreshTokenSchema,
 type RefreshToken,
 DeleteAccountSchema,
 type DeleteAccount,
 EmailVerificationSchema,
 type EmailVerification,
 RequestVerificationSchema,
 type RequestVerification,
} from "./auth.dto";

// User DTOs
export {
 UpdateUserSchema,
 type UpdateUser,
 AdminUserFiltersSchema,
 type AdminUserFilters,
} from "./user.dto";

// Resume DTOs
export {
 CreateExperienceSchema,
 type CreateExperience,
 CreateEducationSchema,
 type CreateEducation,
 CreateSkillSchema,
 type CreateSkill,
 CreateLanguageSchema,
 type CreateLanguage,
 CreateCertificationSchema,
 type CreateCertification,
 CreateProjectSchema,
 type CreateProject,
 CreateResumeSchema,
 type CreateResume,
 UpdateResumeSchema,
 type UpdateResume,
} from "./resume.dto";

// Resume Extended DTOs (Advanced Features)
export {
 PublicationTypeEnum,
 type PublicationType,
 CreatePublicationSchema,
 type CreatePublication,
 CreateRecommendationSchema,
 type CreateRecommendation,
 CreateHackathonSchema,
 type CreateHackathon,
 BugBountyPlatformEnum,
 BugBountySeverityEnum,
 type BugBountyPlatform,
 type BugBountySeverity,
 CreateBugBountySchema,
 type CreateBugBounty,
 OpenSourceRoleEnum,
 type OpenSourceRole,
 CreateOpenSourceSchema,
 type CreateOpenSource,
 TalkTypeEnum,
 type TalkType,
 CreateTalkSchema,
 type CreateTalk,
 CreateAwardSchema,
 type CreateAward,
 CreateInterestSchema,
 type CreateInterest,
 AchievementTypeEnum,
 type AchievementType,
 CreateAchievementSchema,
 type CreateAchievement,
} from "./resume-extended.dto";

// Common DTOs (Utilities)
export {
 PaginationQuerySchema,
 type PaginationQuery,
 ReorderItemsSchema,
 type ReorderItems,
 DateStringSchema,
 type DateString,
 IdParamSchema,
 type IdParam,
 SearchQuerySchema,
 type SearchQuery,
} from "./common.dto";

// Admin DTOs (Backend-specific)
export {
 AdminCreateUserSchema,
 type AdminCreateUser,
 AdminUpdateUserSchema,
 type AdminUpdateUser,
 AdminResetPasswordSchema,
 type AdminResetPassword,
} from "./admin.dto";

// User Profile DTOs
export {
 UpdateProfileSchema,
 type UpdateProfile,
 UpdatePreferencesSchema,
 type UpdatePreferences,
 UpdateFullPreferencesSchema,
 type UpdateFullPreferences,
 UpdateUsernameSchema,
 type UpdateUsername,
} from "./user-profile.dto";

// Theme DTOs
export {
 ThemeSortFieldSchema,
 type ThemeSortField,
 SortDirectionSchema,
 type SortDirection,
 CreateThemeSchema,
 type CreateTheme,
 UpdateThemeSchema,
 type UpdateTheme,
 QueryThemesSchema,
 type QueryThemes,
 ThemeApplicationSchema,
 type ThemeApplication,
 ThemeApprovalSchema,
 type ThemeApproval,
} from "./theme.dto";

// Onboarding Progress DTOs
export {
 OnboardingStepSchema,
 type OnboardingStep,
 OnboardingProgressSchema,
 type OnboardingProgress,
} from "./onboarding-progress.dto";
