/**
 * Tech Skills Catalog DTOs
 *
 * Domain types and validation schemas for the tech skills catalog system.
 * This includes tech areas, niches, skills, and programming languages.
 */

import { z } from "zod";

// ============================================================================
// Enums
// ============================================================================

export const TechAreaTypeEnum = z.enum([
  "DEVELOPMENT",
  "DEVOPS",
  "DATA",
  "SECURITY",
  "DESIGN",
  "PRODUCT",
  "QA",
  "INFRASTRUCTURE",
  "OTHER",
]);

export type TechAreaType = z.infer<typeof TechAreaTypeEnum>;

export const SkillTypeEnum = z.enum([
  "LANGUAGE",
  "FRAMEWORK",
  "LIBRARY",
  "DATABASE",
  "TOOL",
  "PLATFORM",
  "METHODOLOGY",
  "SOFT_SKILL",
  "CERTIFICATION",
  "OTHER",
]);

export type SkillType = z.infer<typeof SkillTypeEnum>;

// ============================================================================
// Tech Area (Categories like Development, DevOps, Data, etc.)
// ============================================================================

export const TechAreaSchema = z.object({
  id: z.string().cuid(),
  type: TechAreaTypeEnum,
  nameEn: z.string().min(1),
  namePtBr: z.string().min(1),
  descriptionEn: z.string().nullable(),
  descriptionPtBr: z.string().nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  order: z.number().int().nonnegative(),
});

export type TechArea = z.infer<typeof TechAreaSchema>;

// ============================================================================
// Tech Niche (Sub-categories like Frontend, Backend, Mobile, etc.)
// ============================================================================

export const TechNicheSchema = z.object({
  id: z.string().cuid(),
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  namePtBr: z.string().min(1),
  descriptionEn: z.string().nullable(),
  descriptionPtBr: z.string().nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  order: z.number().int().nonnegative(),
  areaType: TechAreaTypeEnum,
});

export type TechNiche = z.infer<typeof TechNicheSchema>;

// ============================================================================
// Tech Skill (Individual skills like React, Docker, PostgreSQL, etc.)
// ============================================================================

export const TechSkillNicheSchema = z.object({
  slug: z.string(),
  nameEn: z.string(),
  namePtBr: z.string(),
});

export const TechSkillSchema = z.object({
  id: z.string().cuid(),
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  namePtBr: z.string().min(1),
  type: SkillTypeEnum,
  icon: z.string().nullable(),
  color: z.string().nullable(),
  website: z.string().url().nullable(),
  aliases: z.array(z.string()),
  popularity: z.number().int().nonnegative(),
  niche: TechSkillNicheSchema.nullable(),
});

export type TechSkill = z.infer<typeof TechSkillSchema>;

// ============================================================================
// Programming Language (Special type for programming languages)
// ============================================================================

export const ProgrammingLanguageSchema = z.object({
  id: z.string().cuid(),
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  namePtBr: z.string().min(1),
  color: z.string().nullable(),
  website: z.string().url().nullable(),
  aliases: z.array(z.string()),
  fileExtensions: z.array(z.string()),
  paradigms: z.array(z.string()),
  typing: z.string().nullable(),
  popularity: z.number().int().nonnegative(),
});

export type ProgrammingLanguage = z.infer<typeof ProgrammingLanguageSchema>;

// ============================================================================
// Search Results
// ============================================================================

export const TechSkillsSearchResultSchema = z.object({
  languages: z.array(ProgrammingLanguageSchema),
  skills: z.array(TechSkillSchema),
});

export type TechSkillsSearchResult = z.infer<typeof TechSkillsSearchResultSchema>;
