import { z } from "zod";

/**
 * Skill Level Enum
 * Defines the proficiency levels for technical skills
 */
export const SkillLevelSchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]);

export type SkillLevel = z.infer<typeof SkillLevelSchema>;
