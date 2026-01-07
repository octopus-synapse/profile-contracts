import { z } from "zod";

/**
 * Password Policy Configuration
 *
 * Single source of truth for password requirements.
 * Both frontend and backend must reference these constants
 * to ensure validation rules and user-facing messages stay in sync.
 */
export const PASSWORD_POLICY = {
 minLength: 8,
 maxLength: 128,
 requireUppercase: true,
 requireLowercase: true,
 requireNumber: true,
 requireSpecialChar: true, // Enforced by profile-services
 specialChars: "@$!%*?&",
} as const;

/**
 * Password Validation Messages
 *
 * Derived from PASSWORD_POLICY to prevent drift.
 * Frontend can display these messages without hardcoding values.
 */
export const PASSWORD_MESSAGES = {
 minLength: `Password must be at least ${PASSWORD_POLICY.minLength} characters`,
 maxLength: `Password must not exceed ${PASSWORD_POLICY.maxLength} characters`,
 requireUppercase: "Password must contain at least one uppercase letter",
 requireLowercase: "Password must contain at least one lowercase letter",
 requireNumber: "Password must contain at least one number",
 requireSpecialChar: "Password must contain at least one special character",
} as const;

/**
 * Password Schema
 *
 * Zod schema for password validation.
 * Uses PASSWORD_POLICY constants and PASSWORD_MESSAGES for consistency.
 */
export const PasswordSchema = z
 .string()
 .min(PASSWORD_POLICY.minLength, PASSWORD_MESSAGES.minLength)
 .max(PASSWORD_POLICY.maxLength, PASSWORD_MESSAGES.maxLength)
 .regex(/[A-Z]/, PASSWORD_MESSAGES.requireUppercase)
 .regex(/[a-z]/, PASSWORD_MESSAGES.requireLowercase)
 .regex(/[0-9]/, PASSWORD_MESSAGES.requireNumber)
 .regex(/[@$!%*?&]/, PASSWORD_MESSAGES.requireSpecialChar);

export type Password = z.infer<typeof PasswordSchema>;
