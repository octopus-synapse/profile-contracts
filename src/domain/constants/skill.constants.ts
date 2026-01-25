/**
 * Skill Constants
 * 
 * Constants related to skill management and levels.
 */

/**
 * Skill Level Enum
 */
export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

/**
 * Skill Level to Numeric Mapping
 * Maps skill levels to numeric values for database storage and sorting
 */
export const SkillLevelToNumeric: Record<string, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
} as const;

/**
 * Numeric to Skill Level Mapping
 * Reverse mapping for retrieving skill levels from database
 */
export const NumericToSkillLevel: Record<number, string> = {
  1: 'BEGINNER',
  2: 'INTERMEDIATE',
  3: 'ADVANCED',
  4: 'EXPERT',
} as const;
