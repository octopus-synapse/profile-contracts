/**
 * Admin DTOs
 *
 * Data Transfer Objects for admin operations.
 * Backend-specific schemas for user management.
 */

import { z } from "zod";
import {
 EmailSchema,
 FullNameSchema,
} from "../validations/personal-info.schema";
import { PasswordSchema } from "../validations/password-policy.schema";
import { UserRoleSchema } from "../enums/user-role.enum";

/**
 * Create User Schema (Admin)
 * Used by admins to create new user accounts.
 */
export const AdminCreateUserSchema = z.object({
 email: EmailSchema,
 password: PasswordSchema,
 name: FullNameSchema.optional(),
 role: UserRoleSchema.default("USER"),
});

export type AdminCreateUser = z.infer<typeof AdminCreateUserSchema>;

/**
 * Update User Schema (Admin)
 * Used by admins to update existing user accounts.
 */
export const AdminUpdateUserSchema = z.object({
 email: EmailSchema.optional(),
 name: FullNameSchema.optional(),
 role: UserRoleSchema.optional(),
 isActive: z.boolean().optional(),
 isEmailVerified: z.boolean().optional(),
});

export type AdminUpdateUser = z.infer<typeof AdminUpdateUserSchema>;

/**
 * Reset User Password Schema (Admin)
 * Used by admins to reset user passwords.
 */
export const AdminResetPasswordSchema = z.object({
 newPassword: PasswordSchema,
});

export type AdminResetPassword = z.infer<typeof AdminResetPasswordSchema>;
