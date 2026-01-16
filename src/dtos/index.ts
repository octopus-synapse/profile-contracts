/**
 * Centralized DTOs
 *
 * Single source of truth for all Data Transfer Objects.
 * Both frontend and backend must import from here.
 */

// Auth DTOs (re-exported from schemas for backward compatibility)
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
 // Type aliases for backward compatibility
 type ForgotPassword,
 type ResetPassword,
 type VerifyEmail,
} from "../schemas/auth";

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
 ApplyThemeToResumeSchema,
 type ApplyThemeToResume,
 ForkThemeSchema,
 type ForkTheme,
 type ReviewTheme,
} from "./theme.dto";

// Onboarding Progress DTOs
export {
 OnboardingStepSchema,
 type OnboardingStep,
 OnboardingProgressSchema,
 type OnboardingProgress,
} from "./onboarding-progress.dto";

// Analytics DTOs
export {
 // Enums
 IndustryEnum,
 type Industry,
 ExperienceLevelEnum,
 type ExperienceLevel,
 PeriodEnum,
 type Period,
 SeverityEnum,
 type Severity,
 PriorityEnum,
 type Priority,
 TrendEnum,
 type Trend,
 // Request schemas
 TrackViewSchema,
 type TrackView,
 ViewStatsQuerySchema,
 type ViewStatsQuery,
 KeywordOptionsSchema,
 type KeywordOptions,
 JobMatchSchema,
 type JobMatch,
 BenchmarkOptionsSchema,
 type BenchmarkOptions,
 HistoryQuerySchema,
 type HistoryQuery,
 // Response schemas
 ViewStatsResponseSchema,
 type ViewStatsResponse,
 ATSScoreResponseSchema,
 type ATSScoreResponse,
 KeywordSuggestionsResponseSchema,
 type KeywordSuggestionsResponse,
 JobMatchResponseSchema,
 type JobMatchResponse,
 BenchmarkResponseSchema,
 type BenchmarkResponse,
 DashboardResponseSchema,
 type DashboardResponse,
 SnapshotResponseSchema,
 type SnapshotResponse,
 ScoreProgressionResponseSchema,
 type ScoreProgressionResponse,
} from "./analytics.dto";

// Resume Update DTOs
export {
 UpdateExperienceSchema,
 type UpdateExperience,
 UpdateEducationSchema,
 type UpdateEducation,
 UpdateSkillSchema,
 type UpdateSkill,
 UpdateLanguageSchema,
 type UpdateLanguage,
 UpdateCertificationSchema,
 type UpdateCertification,
 UpdateProjectSchema,
 type UpdateProject,
 BulkCreateSkillsSchema,
 type BulkCreateSkills,
} from "./resume.dto";

// Resume Extended Update DTOs
export {
 UpdatePublicationSchema,
 type UpdatePublication,
 UpdateRecommendationSchema,
 type UpdateRecommendation,
 UpdateHackathonSchema,
 type UpdateHackathon,
 UpdateBugBountySchema,
 type UpdateBugBounty,
 UpdateOpenSourceSchema,
 type UpdateOpenSource,
 UpdateTalkSchema,
 type UpdateTalk,
 UpdateAwardSchema,
 type UpdateAward,
 UpdateInterestSchema,
 type UpdateInterest,
 UpdateAchievementSchema,
 type UpdateAchievement,
} from "./resume-extended.dto";

// Translation DTOs
export {
 TranslateTextSchema,
 type TranslateText,
 TranslateBatchSchema,
 type TranslateBatch,
} from "./translation.dto";

// ATS DTOs
export {
 ValidateCVSchema,
 type ValidateCV,
 ValidationIssueSchema,
 type ValidationIssue,
 ValidationResponseSchema,
 type ValidationResponse,
 type Validation,
} from "./ats.dto";

// MEC DTOs
export {
 InstitutionSchema,
 type Institution,
 CourseBasicSchema,
 type CourseBasic,
 InstitutionWithCoursesSchema,
 type InstitutionWithCourses,
 InstitutionBasicSchema,
 type InstitutionBasic,
 CourseSchema,
 type Course,
 GrauCountSchema,
 type GrauCount,
 UfCountSchema,
 type UfCount,
 MecStatsSchema,
 type MecStats,
 SyncResultSchema,
 type SyncResult,
 SyncMetadataSchema,
 type SyncMetadata,
 SyncLogSchema,
 type SyncLog,
 SyncStatusSchema,
 type SyncStatus,
} from "./mec.dto";

// Authorization DTOs
export * from "./authorization.dto";
