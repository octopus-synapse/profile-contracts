/**
 * Social Feed & Networking DTOs
 *
 * Domain types and validation schemas for social networking features:
 * - Following/followers system
 * - Activity feed
 * - Social stats
 */

import { z } from "zod";

// ============================================================================
// Follow System
// ============================================================================

export const FollowResultSchema = z.object({
  id: z.string().cuid(),
});

export type FollowResult = z.infer<typeof FollowResultSchema>;

export const SocialStatsSchema = z.object({
  followersCount: z.number().int().nonnegative(),
  followingCount: z.number().int().nonnegative(),
});

export type SocialStats = z.infer<typeof SocialStatsSchema>;

export const FollowUserSchema = z.object({
  id: z.string().cuid(),
  username: z.string(),
  name: z.string().nullable(),
  avatar: z.string().url().nullable(),
  followedAt: z.string().datetime(),
});

export type FollowUser = z.infer<typeof FollowUserSchema>;

export const PaginatedFollowsSchema = z.object({
  data: z.array(FollowUserSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  hasMore: z.boolean(),
});

export type PaginatedFollows = z.infer<typeof PaginatedFollowsSchema>;

// ============================================================================
// Activity Feed
// ============================================================================

export const SocialActivityTypeEnum = z.enum([
  "RESUME_CREATED",
  "RESUME_UPDATED",
  "RESUME_PUBLISHED",
  "SKILL_ADDED",
  "CERTIFICATION_ADDED",
  "EXPERIENCE_ADDED",
  "EDUCATION_ADDED",
  "FOLLOWED_USER",
  "PROFILE_UPDATED",
]);

export type SocialActivityType = z.infer<typeof SocialActivityTypeEnum>;

export const SocialActivitySchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  type: SocialActivityTypeEnum,
  metadata: z.record(z.unknown()),
  createdAt: z.string().datetime(),
});

export type SocialActivity = z.infer<typeof SocialActivitySchema>;

// Backward compatibility aliases
export type ActivityType = SocialActivityType;
export type Activity = SocialActivity;

export const PaginatedActivitiesSchema = z.object({
  data: z.array(SocialActivitySchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  hasMore: z.boolean(),
});

export type PaginatedActivities = z.infer<typeof PaginatedActivitiesSchema>;
