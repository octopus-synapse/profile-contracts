import { z } from "zod";
import {
 EmailSchema,
 FullNameSchema,
} from "../validations/personal-info.schema";
import { PasswordSchema } from "../validations/password-policy.schema";

/**
 * Auth DTOs
 *
 * Data Transfer Objects for authentication requests.
 * Both frontend and backend use these for request validation.
 */

/**
 * Login Credentials Schema
 * Password is NOT validated for format on login (allows legacy passwords)
 */
export const LoginCredentialsSchema = z.object({
 email: EmailSchema,
 password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;

/**
 * Register Credentials Schema
 * Uses strict password validation from PasswordSchema
 */
export const RegisterCredentialsSchema = z.object({
 email: EmailSchema,
 password: PasswordSchema,
 name: FullNameSchema.optional(),
});

export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;

/**
 * Reset Password Request Schema
 */
export const ResetPasswordRequestSchema = z.object({
 email: EmailSchema,
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

/**
 * New Password Schema (for password reset)
 */
export const NewPasswordSchema = z.object({
 token: z.string().min(1, "Token is required"),
 password: PasswordSchema,
});

export type NewPassword = z.infer<typeof NewPasswordSchema>;

/**
 * Change Password Schema
 */
export const ChangePasswordSchema = z.object({
 currentPassword: z.string().min(1, "Current password is required"),
 newPassword: PasswordSchema,
});

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;

/**
 * Change Email Schema
 */
export const ChangeEmailSchema = z.object({
 newEmail: EmailSchema,
 currentPassword: z.string().min(1, "Password is required"),
});

export type ChangeEmail = z.infer<typeof ChangeEmailSchema>;

/**
 * Refresh Token Schema
 */
export const RefreshTokenSchema = z.object({
 refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;

/**
 * Delete Account Schema
 */
export const DeleteAccountSchema = z.object({
 password: z.string().min(1, "Password is required"),
});

export type DeleteAccount = z.infer<typeof DeleteAccountSchema>;

/**
 * Email Verification Schema
 */
export const EmailVerificationSchema = z.object({
 token: z.string().min(1, "Verification token is required"),
});

export type EmailVerification = z.infer<typeof EmailVerificationSchema>;

/**
 * Request Verification Schema
 */
export const RequestVerificationSchema = z.object({
 email: EmailSchema,
});

export type RequestVerification = z.infer<typeof RequestVerificationSchema>;
