/**
 * Theme DTOs
 *
 * Data Transfer Objects for theme operations.
 * Single source of truth for theme management.
 */

import { z } from "zod";
import {
 PrismaThemeStatusSchema,
 PrismaThemeCategorySchema,
} from "../generated/prisma-enums";

/**
 * Theme Sort Fields
 */
export const ThemeSortFieldSchema = z.enum([
 "createdAt",
 "updatedAt",
 "usageCount",
 "rating",
 "name",
]);

export type ThemeSortField = z.infer<typeof ThemeSortFieldSchema>;

/**
 * Sort Direction
 */
export const SortDirectionSchema = z.enum(["asc", "desc"]);

export type SortDirection = z.infer<typeof SortDirectionSchema>;

/**
 * Create Theme Schema
 */
export const CreateThemeSchema = z.object({
 name: z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name too long"),
 description: z.string().max(500, "Description too long").optional(),
 category: PrismaThemeCategorySchema,
 tags: z.array(z.string()).optional(),
 styleConfig: z.record(z.unknown()),
 parentThemeId: z.string().optional(),
});

export type CreateTheme = z.infer<typeof CreateThemeSchema>;

/**
 * Update Theme Schema
 */
export const UpdateThemeSchema = z.object({
 name: z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name too long")
  .optional(),
 description: z.string().max(500, "Description too long").optional(),
 category: PrismaThemeCategorySchema.optional(),
 tags: z.array(z.string()).optional(),
 styleConfig: z.record(z.unknown()).optional(),
});

export type UpdateTheme = z.infer<typeof UpdateThemeSchema>;

/**
 * Query Themes Schema
 */
export const QueryThemesSchema = z.object({
 status: PrismaThemeStatusSchema.optional(),
 category: PrismaThemeCategorySchema.optional(),
 search: z.string().optional(),
 authorId: z.string().optional(),
 systemOnly: z.coerce.boolean().optional(),
 sortBy: ThemeSortFieldSchema.default("createdAt"),
 sortDir: SortDirectionSchema.default("desc"),
 page: z.coerce.number().int().min(1).default(1),
 limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type QueryThemes = z.infer<typeof QueryThemesSchema>;

/**
 * Theme Application Schema
 */
export const ThemeApplicationSchema = z.object({
 themeId: z.string().min(1, "Theme ID is required"),
});

export type ThemeApplication = z.infer<typeof ThemeApplicationSchema>;

/**
 * Theme Approval Schema
 */
export const ThemeApprovalSchema = z.object({
 approved: z.boolean(),
 feedback: z.string().max(1000, "Feedback too long").optional(),
});

export type ThemeApproval = z.infer<typeof ThemeApprovalSchema>;
