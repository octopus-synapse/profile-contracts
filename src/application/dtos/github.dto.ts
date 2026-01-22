/**
 * GitHub Integration DTOs
 *
 * Domain types and validation schemas for GitHub profile sync and import.
 */

import { z } from "zod";

// ============================================================================
// GitHub Repository
// ============================================================================

export const GitHubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  url: z.string().url(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

// ============================================================================
// GitHub Profile Summary
// ============================================================================

export const GitHubSummarySchema = z.object({
  username: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  publicRepos: z.number().int().nonnegative(),
  followers: z.number().int().nonnegative(),
  following: z.number().int().nonnegative(),
  topLanguages: z.array(z.string()),
  pinnedRepos: z.array(GitHubRepoSchema),
});

export type GitHubSummary = z.infer<typeof GitHubSummarySchema>;

// ============================================================================
// Sync GitHub to Resume
// ============================================================================

export const SyncGitHubSchema = z.object({
  githubUsername: z.string().min(1).max(39), // GitHub username constraints
  resumeId: z.string().cuid(),
});

export type SyncGitHub = z.infer<typeof SyncGitHubSchema>;

export const GitHubSyncResultSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  synced: z.object({
    projects: z.number().int().nonnegative().optional(),
    skills: z.number().int().nonnegative().optional(),
    bio: z.boolean().optional(),
  }),
});

export type GitHubSyncResult = z.infer<typeof GitHubSyncResultSchema>;

// Backward compatibility alias
export type SyncResult = GitHubSyncResult;
export const SyncResultSchema = GitHubSyncResultSchema;
