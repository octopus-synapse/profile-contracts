import { z } from "zod";
import { UserRoleSchema } from "../enums/user-role.enum";

/**
 * User Types
 *
 * Core user entity types shared between frontend and backend.
 * Backend uses Prisma for persistence; these types represent API contracts.
 */

/**
 * Base User Schema
 * Represents the user entity as returned by API
 */
export const UserSchema = z.object({
 id: z.string().uuid(),
 email: z.string().email(),
 name: z.string().nullable(),
 username: z.string().nullable(),
 usernameUpdatedAt: z.string().datetime().nullable(),
 role: UserRoleSchema,
 image: z.string().url().nullable(),
 hasCompletedOnboarding: z.boolean(),
 createdAt: z.string().datetime(),
 updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * User Profile Schema
 * Extended user info for profile pages
 */
export const UserProfileSchema = UserSchema.extend({
 bio: z.string().nullable(),
 location: z.string().nullable(),
 website: z.string().url().nullable(),
 company: z.string().nullable(),
 title: z.string().nullable(),
 phone: z.string().nullable(),
 linkedin: z.string().url().nullable(),
 github: z.string().url().nullable(),
 twitter: z.string().url().nullable(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

/**
 * Check Username Response
 */
export const CheckUsernameResponseSchema = z.object({
 available: z.boolean(),
 nextChangeDate: z.string().datetime().nullable(),
});

export type CheckUsernameResponse = z.infer<typeof CheckUsernameResponseSchema>;

/**
 * User Stats
 */
export const UserStatsSchema = z.object({
 totalResumes: z.number().int().min(0),
 publicProfiles: z.number().int().min(0),
 lastActive: z.string().datetime().nullable(),
});

export type UserStats = z.infer<typeof UserStatsSchema>;
