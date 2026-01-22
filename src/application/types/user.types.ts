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

// Note: CheckUsernameResponse, UserStats moved to dtos/user.dto.ts
// to avoid duplication. Import from main index or dtos/
