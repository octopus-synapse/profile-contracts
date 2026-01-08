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
} from "./resume-extended.dto";
