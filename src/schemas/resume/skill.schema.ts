import { z } from "zod";
import { SkillLevelSchema } from "../../enums/skill-level.enum";

/**
 * Create Skill Schema
 */
export const CreateSkillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(50),
  level: SkillLevelSchema,
  category: z.string().max(50).optional(),
  order: z.number().int().min(0).optional(),
});

export type CreateSkill = z.infer<typeof CreateSkillSchema>;

/**
 * Update Skill Schema
 */
export const UpdateSkillSchema = CreateSkillSchema.partial();

export type UpdateSkill = z.infer<typeof UpdateSkillSchema>;

/**
 * Bulk Create Skills Schema
 */
export const BulkCreateSkillsSchema = z.object({
  skills: z.array(CreateSkillSchema).min(1, "At least one skill is required"),
});

export type BulkCreateSkills = z.infer<typeof BulkCreateSkillsSchema>;
