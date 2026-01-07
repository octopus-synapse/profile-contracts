import { z } from "zod";

/**
 * Skill Level Enum
 *
 * Single source of truth for skill proficiency levels.
 * API contract uses strings; internal mapping to numbers is implementation detail.
 *
 * @example
 * // Frontend/Backend both use string values
 * const skill = { name: 'TypeScript', level: 'ADVANCED' };
 */
export const SkillLevelSchema = z.enum([
 "BEGINNER",
 "INTERMEDIATE",
 "ADVANCED",
 "EXPERT",
]);
export type SkillLevel = z.infer<typeof SkillLevelSchema>;

/**
 * Type guard for SkillLevel
 */
export const isSkillLevel = (value: unknown): value is SkillLevel => {
 return SkillLevelSchema.safeParse(value).success;
};

/**
 * Skill levels as const object for iteration
 */
export const SkillLevels = {
 BEGINNER: "BEGINNER",
 INTERMEDIATE: "INTERMEDIATE",
 ADVANCED: "ADVANCED",
 EXPERT: "EXPERT",
} as const satisfies Record<SkillLevel, SkillLevel>;

/**
 * Numeric mapping for internal storage (if needed)
 * This is an IMPLEMENTATION DETAIL - API always uses strings
 */
export const SkillLevelToNumeric: Record<SkillLevel, number> = {
 BEGINNER: 1,
 INTERMEDIATE: 2,
 ADVANCED: 3,
 EXPERT: 4,
};

export const NumericToSkillLevel: Record<number, SkillLevel> = {
 1: "BEGINNER",
 2: "INTERMEDIATE",
 3: "ADVANCED",
 4: "EXPERT",
};
