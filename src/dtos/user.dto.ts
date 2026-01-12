import { z } from "zod";
import { UsernameSchema } from "../validations/username.schema";
import {
 SocialUrlSchema,
 LinkedInUrlSchema,
 GitHubUrlSchema,
} from "../validations/professional-profile.schema";

// Local schemas (TODO: move to schemas/primitives if needed)
const FullNameSchema = z.string().trim().min(2, "Name must be at least 2 characters").max(100);
const PhoneSchema = z.string().max(20).optional();
const UserLocationSchema = z.string().max(100).optional();

/**
 * User DTOs
 *
 * Data Transfer Objects for user operations.
 */

/**
 * Update User Profile Schema
 */
export const UpdateUserSchema = z.object({
 name: FullNameSchema.optional(),
 username: UsernameSchema.optional(),
 bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
 location: UserLocationSchema.optional(),
 website: SocialUrlSchema.optional(),
 company: z
  .string()
  .max(100, "Company must be 100 characters or less")
  .optional(),
 title: z.string().max(100, "Title must be 100 characters or less").optional(),
 phone: PhoneSchema.optional(),
 linkedin: LinkedInUrlSchema.optional(),
 github: GitHubUrlSchema.optional(),
 twitter: SocialUrlSchema.optional(),
 image: z.string().url().optional(),
});

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

/**
 * Admin User Filters Schema
 */
export const AdminUserFiltersSchema = z.object({
 search: z.string().optional(),
 role: z.enum(["USER", "ADMIN", "APPROVER"]).optional(),
 page: z.coerce.number().int().min(1).default(1),
 limit: z.coerce.number().int().min(1).max(100).default(20),
 sortBy: z.enum(["createdAt", "name", "email"]).default("createdAt"),
 sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type AdminUserFilters = z.infer<typeof AdminUserFiltersSchema>;
